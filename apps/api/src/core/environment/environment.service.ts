import { DatabaseService } from "@montelo/api-common";
import { Environment } from "@montelo/db";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ApiKeyService } from "../apiKey/apiKey.service";
import { Environments } from "./environment.enums";
import { CreateEnvironmentParams } from "./environment.types";


@Injectable()
export class EnvironmentService {
  constructor(
    private db: DatabaseService,
    private apiKeyService: ApiKeyService,
  ) {}

  async getEnvById(envId: string): Promise<Environment> {
    return this.db.environment.findUniqueOrThrow({
      where: {
        id: envId,
      },
    });
  }

  async create({ name, projectId }: CreateEnvironmentParams): Promise<Environment> {
    if (name === Environments.PRODUCTION || name === Environments.DEVELOPMENT) {
      throw new HttpException("Restricted environment name.", HttpStatus.CONFLICT);
    }

    // if changing this also change apiKey service
    const prefix = name.substring(0, 5);
    const { publicPart, secretPart, combined } = await this.apiKeyService.generateApiKey(prefix);

    return this.db.environment.create({
      data: {
        name,
        projectId,
        apiKey: {
          create: {
            public: publicPart,
            private: secretPart,
            combined,
            viewed: false,
          },
        },
      },
    });
  }
}
