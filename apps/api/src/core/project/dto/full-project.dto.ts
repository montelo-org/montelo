import { ApiProperty } from "@nestjs/swagger";

import { EnvironmentDto } from "../../environment/dto/environment.dto";
import { FullProject } from "../project.types";
import { ProjectDto } from "./project.dto";

export class FullProjectDto extends ProjectDto {
  @ApiProperty({ type: [EnvironmentDto] })
  environments: EnvironmentDto[];

  static fromFullProject(fullProject: FullProject): FullProjectDto {
    const projectDto = ProjectDto.fromProject(fullProject);
    const environmentDtos = fullProject.environments.map(EnvironmentDto.fromEnvironment);
    return {
      ...projectDto,
      environments: environmentDtos,
    };
  }
}
