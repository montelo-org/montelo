import { DatabaseService } from "@montelo/api-common";
import { Injectable } from "@nestjs/common";
import { upperFirst } from "lodash";
import { ApiKeyService } from "../apiKey/apiKey.service";
import { Environments } from "../environment/environment.enums";
import { FullProject } from "../project/project.types";
import { CreateProjectParams } from "./organization.types";


@Injectable()
export class OrganizationService {
  constructor(
    private db: DatabaseService,
    private apiKey: ApiKeyService,
  ) {}

  async findAllForOrg(orgId?: string, userId?: string): Promise<FullProject[]> {
    if (!orgId && !userId) throw new Error("OrgId or userId is required!");

    return this.db.project.findMany({
      where: orgId ? { orgId } : { userId },
      include: {
        environments: true,
      },
    });
  }

  async createProject({ orgId, userId, params }: CreateProjectParams): Promise<FullProject> {
    if (!orgId && !userId) throw new Error("OrgId or userId is required!");

    const EnvironmentNames: string[] = Object.values(Environments);
    const isRestrictedEnvironmentUsed = params.envNames.some((el) => EnvironmentNames.includes(el));
    if (isRestrictedEnvironmentUsed) {
      throw new Error("Restricted environment name.");
    }

    const allEnvs = [...EnvironmentNames, ...params.envNames];
    const allApiKeysPromises = allEnvs.map((name) => {
      if (name === Environments.DEVELOPMENT) {
        return this.apiKey.generateApiKey("dev");
      } else if (name === Environments.PRODUCTION) {
        return this.apiKey.generateApiKey("prod");
      }
      return this.apiKey.generateApiKey(name.substring(0, 5));
    });
    const allApiKeys = await Promise.all(allApiKeysPromises);

    const createdProject = await this.db.project.create({
      data: {
        name: upperFirst(params.name),
        ...(orgId ? { orgId } : { userId }),
      },
    });

    const createEnvironment = (envName: string, index: number) => {
      const apiKey = allApiKeys[index];

      return this.db.environment.create({
        data: {
          name: envName,
          projectId: createdProject.id,
          apiKey: {
            create: {
              public: apiKey.publicPart,
              // initially we store the secret part in the db. Then, once the user views it, we replace it with the hash.
              private: apiKey.secretPart,
              combined: apiKey.combined,
              viewed: false,
            },
          },
        },
      });
    };

    const envCreatePromises = allEnvs.map(createEnvironment);
    const dbEnvs = await Promise.all(envCreatePromises);

    return this.db.project.update({
      where: {
        id: createdProject.id,
      },
      data: {
        environments: {
          connect: dbEnvs.map((dbEnv) => ({
            id: dbEnv.id,
          })),
        },
      },
      include: {
        environments: true,
      },
    });
  }
}
