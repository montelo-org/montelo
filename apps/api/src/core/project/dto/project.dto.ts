import { Project } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class ProjectDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  orgId: string;

  static fromProject(project: Project): ProjectDto {
    return pick(project, ["id", "name", "orgId"]);
  }
}
