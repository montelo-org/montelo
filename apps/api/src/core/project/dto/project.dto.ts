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

  @ApiProperty({
    required: false,
  })
  @IsString()
  orgId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  userId?: string;

  static fromProject(project: Project): ProjectDto {
    const dto = pick(project, ["id", "name", "orgId", "userId"]) as ProjectDto;
    dto.orgId = dto.orgId ?? undefined;
    dto.userId = dto.userId ?? undefined;
    return dto;
  }
}
