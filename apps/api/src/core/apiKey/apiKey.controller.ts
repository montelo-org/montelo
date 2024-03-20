import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetProject, GetProjectT } from "../../common/decorators/GetProject.decorator";
import { UseAuthGuards } from "../../common/guards/guard";
import { ApiKeyService } from "./apiKey.service";
import { ApiKeyWithEnvDto } from "./dto/apiKeyWithEnv.dto";


@ApiTags("Api Key")
@ApiBearerAuth()
@UseAuthGuards()
@Controller("api-keys")
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Get()
  async getApiKeysForProject(@GetProject() project: GetProjectT): Promise<ApiKeyWithEnvDto[]> {
    const apiKeys = await this.apiKeyService.findAllForProject(project.id);
    return apiKeys.map(ApiKeyWithEnvDto.fromApiKeyWithEnv);
  }

  @Get(":apiKeyId")
  async revealOne(@Param("apiKeyId") apiKeyId: string): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.reveal(apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }

  @Post(":apiKeyId")
  async rotateOne(@Param("apiKeyId") apiKeyId: string): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.rotate(apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }
}
