import { User, UserPermissionRole } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";
import { omit } from "lodash";

import { DatabaseService } from "../../database";
import { ApiKeyService } from "../apiKey/apiKey.service";
import { Environments } from "../environment/environment.enums";
import { CreateUserInput } from "./user.types";

@Injectable()
export class UserService {
  constructor(
    private db: DatabaseService,
    private apiKey: ApiKeyService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(params: CreateUserInput): Promise<User> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashPassword = await hash(params.password, salt);

    // default names
    const defaultTeamName = "New Team";
    const defaultProjectName = "New Project";

    // create the user
    const user = await this.db.user.create({
      data: {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        password: hashPassword,
        memberships: {
          create: {
            role: UserPermissionRole.ADMIN,
            team: {
              create: {
                name: defaultTeamName,
                projects: {
                  create: {
                    name: defaultProjectName,
                    environments: {
                      createMany: {
                        data: [
                          {
                            name: Environments.DEVELOPMENT,
                          },
                          {
                            name: Environments.PRODUCTION,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        memberships: {
          include: {
            team: {
              include: {
                projects: {
                  include: {
                    environments: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // get the created env Ids
    const envs = user.memberships[0].team.projects[0].environments;
    const devEnvId = envs.find((env) => env.name === Environments.DEVELOPMENT)!.id;
    const prodEnvId = envs.find((env) => env.name === Environments.PRODUCTION)!.id;

    // create a key for each env
    const devApiKey = this.apiKey.generateApiKey("dev");
    const prodApiKey = this.apiKey.generateApiKey("prod");

    // create the API keys for both environments
    await this.db.apiKey.createMany({
      data: [
        {
          key: devApiKey,
          envId: devEnvId,
        },
        {
          key: prodApiKey,
          envId: prodEnvId,
        },
      ],
    });

    const baseUser = omit(user, ["memberships"]);
    return baseUser;
  }
}
