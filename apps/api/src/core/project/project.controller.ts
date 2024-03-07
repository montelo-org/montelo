import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

import { DeleteSuccessDto } from "../../common/dto/delete-success.dto";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
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
  @Get("org/:orgId")
  async getAllForOrg(@Param("orgId") orgId: string): Promise<FullProjectDto[]> {
    const fullProjects = await this.projectService.findAllForOrg(orgId);
    return fullProjects.map(FullProjectDto.fromFullProject);
  }

  @UseGuards(ClerkAuthGuard)
  @Get(":projectId")
  async get(@Param("projectId") projectId: string): Promise<FullProjectDto> {
    const fullProject = await this.projectService.findById(projectId);
    return FullProjectDto.fromFullProject(fullProject);
  }

  @ApiBody({
    type: CreateProjectInput,
  })
  @UseGuards(ClerkAuthGuard)
  @Post()
  async create(@Body() createProjectInput: CreateProjectInput): Promise<ProjectDto> {
    const project = await this.projectService.create(createProjectInput);
    return ProjectDto.fromProject(project);
  }

  @UseGuards(ClerkAuthGuard)
  @Delete(":projectId")
  async delete(@Param("projectId") projectId: string): Promise<DeleteSuccessDto> {
    await this.projectService.delete(projectId);
    return { success: true };
  }
}
