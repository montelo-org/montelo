import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { CreateEnvInput } from "./dto/create-env.input";
import { EnvironmentDto } from "./dto/environment.dto";
import { EnvironmentService } from "./environment.service";


@ApiTags("Environment")
@ApiBearerAuth()
@Controller("env")
export class EnvironmentController {
  constructor(private environmentService: EnvironmentService) {}

  @UseGuards(ClerkAuthGuard)
  @Get(":envId")
  async get(@Param("envId") envId: string): Promise<EnvironmentDto> {
    const environment = await this.environmentService.getEnvById(envId);
    return EnvironmentDto.fromEnvironment(environment);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  async create(@Body() createEnvInput: CreateEnvInput): Promise<EnvironmentDto> {
    const environment = await this.environmentService.create(createEnvInput);
    return EnvironmentDto.fromEnvironment(environment);
  }
}
