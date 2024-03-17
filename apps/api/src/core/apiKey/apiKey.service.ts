import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { DatabaseService, HashingService } from "@montelo/api-common";
import { EnvApiKeyPrefixMap } from "../environment/environment.enums";
import { ApiKeyWithEnvironment } from "./apiKey.types";

@Injectable()
export class ApiKeyService {
  constructor(
    private db: DatabaseService,
    private hashingService: HashingService,
  ) {}

  public async findAllForProject(projectId: string): Promise<ApiKeyWithEnvironment[]> {
    const dbApiKeys = await this.db.apiKey.findMany({
      where: {
        environment: {
          projectId,
        },
      },
      include: {
        environment: true,
      },
    });

    return dbApiKeys.map((key) => this.obfuscatePublicAndPrivateKey(key));
  }

  async reveal(apiKeyId: string): Promise<ApiKeyWithEnvironment> {
    const originalApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        id: apiKeyId,
      },
      include: {
        environment: true,
      },
    });

    if (originalApiKey.viewed) {
      throw new Error("Already viewed key.");
    }

    const dbUpdatedApiKey = await this.markKeyAsViewed(apiKeyId, originalApiKey.public, originalApiKey.private);

    return {
      ...dbUpdatedApiKey,
      // overwrite with the original (unhashed) keys
      public: originalApiKey.public,
      private: originalApiKey.private,
      combined: originalApiKey.combined,
    };
  }

  async rotate(apiKeyId: string): Promise<ApiKeyWithEnvironment> {
    const existingApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        id: apiKeyId,
      },
      include: {
        environment: true,
      },
    });

    const envName = existingApiKey.environment.name;
    const prefix = EnvApiKeyPrefixMap[envName] ?? envName.substring(6);
    const { publicPart, secretPart, combined } = await this.generateApiKey(prefix);

    const updatedKey = await this.db.apiKey.update({
      where: {
        id: apiKeyId,
      },
      data: {
        public: publicPart,
        // save the secret part (not the hash) until it is revealed
        private: secretPart,
        combined,
        viewed: false,
      },
      include: {
        environment: true,
      },
    });

    return this.obfuscatePublicAndPrivateKey(updatedKey);
  }

  public async generateApiKey(prefix: string): Promise<{ publicPart: string; secretPart: string; combined: string }> {
    const loweredPrefix = prefix.toLowerCase();
    const publicPart = this.generateRandomCharacters(16);
    const secretPart = this.generateRandomCharacters(16);
    const fullPrefix = `sk-${loweredPrefix}-`;
    const idPartWithPrefix = `${fullPrefix}${publicPart}`;
    const combined = this.combinePublicAndPrivate(publicPart, secretPart);
    const combinedWithPrefix = `${fullPrefix}${combined}`;
    return { publicPart: idPartWithPrefix, secretPart, combined: combinedWithPrefix };
  }

  private async markKeyAsViewed(
    apiKeyId: string,
    publicPart: string,
    secretPart: string,
  ): Promise<ApiKeyWithEnvironment> {
    const secretHash = await this.hashingService.hash(secretPart);
    const combined = this.combinePublicAndPrivate(publicPart, secretHash);

    return this.db.apiKey.update({
      where: {
        id: apiKeyId,
      },
      data: {
        private: secretHash,
        combined,
        viewed: true,
      },
      include: {
        environment: true,
      },
    });
  }

  private generateRandomCharacters(length: number): string {
    return randomBytes(length).toString("hex").slice(0, length).replace("-", "").replace("_", "");
  }

  private obfuscatePublicAndPrivateKey(apiKey: ApiKeyWithEnvironment): ApiKeyWithEnvironment {
    const obfuscatedPart = Array(8).fill("*").join("");
    const splitPublicKey = apiKey.public.split("-");
    const prefix = splitPublicKey[1];
    const obfuscatedPublicKey = `sk-${prefix}-${obfuscatedPart}`;
    const obfuscatedCombined = `${obfuscatedPublicKey}${obfuscatedPart}`;
    return {
      ...apiKey,
      public: obfuscatedPublicKey,
      private: obfuscatedPart,
      combined: obfuscatedCombined,
    };
  }

  private combinePublicAndPrivate(publicPart: string, privatePart: string): string {
    return `${publicPart}_${privatePart}`;
  }
}
