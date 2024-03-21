import { DatabaseService, HashingService } from "@montelo/api-common";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private hashingService: HashingService,
  ) {}

  /**
   * @param apiKey incoming api key from the user.
   * @returns the envId for the given apiKey.
   */
  async validateApiKey(apiKey: string): Promise<string> {
    const [publicWithPrefix, privatePart] = apiKey.split("_");

    const dbApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        public: publicWithPrefix,
      },
    });

    const isValid = await this.hashingService.verify(privatePart, dbApiKey.private);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return dbApiKey.envId;
  }
}
