import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "src/common/guards/auth.guard";
import { GetAuth, GetAuthT } from "../../common/decorators/GetAuth.decorator";
import { FullProjectDto } from "../project/dto/full-project.dto";
import { ProjectDto } from "../project/dto/project.dto";
import { CreateProjectInput } from "./dto/create-project.input";
import { OrganizationService } from "./organization.service";

@ApiTags("Organization")
@ApiBearerAuth()
@UseGuards(ClerkAuthGuard)
@Controller("organization")
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  async getProjectsForOrg(@GetAuth() auth: GetAuthT): Promise<FullProjectDto[]> {
    const fullProjects = await this.organizationService.findAllForOrg(auth.orgId || "");
    return fullProjects.map(FullProjectDto.fromFullProject);
  }

  @Post()
  async createProject(@GetAuth() auth: GetAuthT, @Body() createProjectInput: CreateProjectInput): Promise<ProjectDto> {
    const project = await this.organizationService.create(auth.orgId, createProjectInput);
    return ProjectDto.fromProject(project);
  }
}
