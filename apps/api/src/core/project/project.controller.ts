import { DeleteSuccessDto } from "@montelo/api-common";
import { Controller, Delete, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetProject, GetProjectT } from "../../common/decorators/GetProject.decorator";
import { UseAuthGuards } from "../../common/guards/guard";
import { FullProjectDto } from "./dto/full-project.dto";
import { ProjectService } from "./project.service";

@ApiTags("Project")
@ApiBearerAuth()
@UseAuthGuards()
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProject(@GetProject() project: GetProjectT): Promise<FullProjectDto> {
    const fullProject = await this.projectService.findById(project.id);
    return FullProjectDto.fromFullProject(fullProject);
  }

  @Delete()
  async deleteProject(@GetProject() project: GetProjectT): Promise<DeleteSuccessDto> {
    await this.projectService.delete(project.id);
    return { success: true };
  }
}
