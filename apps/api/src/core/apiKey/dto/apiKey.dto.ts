import { ApiKey } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { pick } from "lodash";

export class ApiKeyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  envId: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  viewed: boolean;

  @ApiProperty()
  updatedAt: string;

  static fromApiKey(apiKey: ApiKey): ApiKeyDto {
    const baseDto = pick(apiKey, ["id", "envId", "viewed"]);
    const stringifiedUpdatedAt = apiKey.updatedAt.toISOString();
    const key = apiKey.combined;
    return { ...baseDto, key, updatedAt: stringifiedUpdatedAt };
  }
}
