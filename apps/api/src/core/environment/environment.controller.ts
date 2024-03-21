import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetProject, GetProjectT } from "../../common/decorators/GetProject.decorator";
import { UseAuthGuards } from "../../common/guards/guard";
import { CreateEnvInput } from "./dto/create-env.input";
import { EnvironmentDto } from "./dto/environment.dto";
import { EnvironmentService } from "./environment.service";

@ApiTags("Environment")
@ApiBearerAuth()
@UseAuthGuards()
@Controller("env")
export class EnvironmentController {
  constructor(private environmentService: EnvironmentService) {}

  @Get(":envId")
  async getEnv(@Param("envId") envId: string): Promise<EnvironmentDto> {
    const environment = await this.environmentService.getEnvById(envId);
    return EnvironmentDto.fromEnvironment(environment);
  }

  @Post()
  async createEnv(@GetProject() project: GetProjectT, @Body() createEnvInput: CreateEnvInput): Promise<EnvironmentDto> {
    const environment = await this.environmentService.create({
      ...createEnvInput,
      projectId: project.id,
    });
    return EnvironmentDto.fromEnvironment(environment);
  }
}
