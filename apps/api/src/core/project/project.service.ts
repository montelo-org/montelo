import { Project } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { capitalize } from "lodash";
import { DatabaseService } from "../../database";
import { ApiKeyService } from "../apiKey/apiKey.service";
import { Environments } from "../environment/environment.enums";
import { CreateProjectInput, FullProject } from "./project.types";


@Injectable()
export class ProjectService {
  constructor(
    private db: DatabaseService,
    private apiKey: ApiKeyService,
  ) {}

  async findAllForOrg(orgId: string): Promise<FullProject[]> {
    return this.db.project.findMany({
      where: {
        orgId,
      },
      include: {
        environments: true,
      },
    });
  }

  async findById(id: string): Promise<FullProject> {
    return this.db.project.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        environments: true,
      },
    });
  }

  async create(params: CreateProjectInput): Promise<Project> {
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
        name: capitalize(params.name),
        orgId: params.orgId,
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
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.project.delete({
      where: {
        id,
      },
    });
  }
}
