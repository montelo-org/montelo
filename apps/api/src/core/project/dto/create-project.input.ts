import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectInput {
  @ApiProperty()
  name: string;

  @ApiProperty()
  orgId: string;

  @ApiProperty({
    type: [String],
  })
  envNames: string[];
}
