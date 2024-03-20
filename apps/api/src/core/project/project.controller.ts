import { DeleteSuccessDto } from "@montelo/api-common";
import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "src/common/guards/auth.guard";
import { GetAuth, GetAuthT } from "../../common/decorators/GetAuth.decorator";
import { GetProject, GetProjectT } from "../../common/decorators/GetProject.decorator";
import { UseAuthGuards } from "../../common/guards/guard";
import { CreateProjectInput } from "./dto/create-project.input";
import { FullProjectDto } from "./dto/full-project.dto";
import { ProjectDto } from "./dto/project.dto";
import { ProjectService } from "./project.service";


@ApiTags("Project")
@ApiBearerAuth()
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(ClerkAuthGuard)
  @Get("org")
  async getProjectsForOrg(@GetAuth() auth: GetAuthT): Promise<FullProjectDto[]> {
    const fullProjects = await this.projectService.findAllForOrg(auth.orgId || "");
    return fullProjects.map(FullProjectDto.fromFullProject);
  }

  @UseAuthGuards()
  @Get()
  async getProject(@GetProject() project: GetProjectT): Promise<FullProjectDto> {
    const fullProject = await this.projectService.findById(project.id);
    return FullProjectDto.fromFullProject(fullProject);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createProject(@GetAuth() auth: GetAuthT, @Body() createProjectInput: CreateProjectInput): Promise<ProjectDto> {
    const project = await this.projectService.create(auth.orgId, createProjectInput);
    return ProjectDto.fromProject(project);
  }

  @UseAuthGuards()
  @Delete()
  async deleteProject(@GetProject() project: GetProjectT): Promise<DeleteSuccessDto> {
    await this.projectService.delete(project.id);
    return { success: true };
  }
}
