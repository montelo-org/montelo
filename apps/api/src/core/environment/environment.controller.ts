import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
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
}
