import { ApiProperty } from "@nestjs/swagger";
import { EnvironmentDto } from "../../environment/dto/environment.dto";
import { ApiKeyWithEnvironment } from "../apiKey.types";
import { ApiKeyDto } from "./apiKey.dto";

export class ApiKeyWithEnvDto extends ApiKeyDto {
  @ApiProperty()
  environment: EnvironmentDto;

  static fromApiKeyWithEnv(apiKeyWithEnv: ApiKeyWithEnvironment): ApiKeyWithEnvDto {
    const baseDto = ApiKeyDto.fromApiKey(apiKeyWithEnv);
    const envDto = EnvironmentDto.fromEnvironment(apiKeyWithEnv.environment);
    return { ...baseDto, environment: envDto };
  }
}
