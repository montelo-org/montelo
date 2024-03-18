import { ApiProperty } from "@nestjs/swagger";

export class CreateExperimentInput {
  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  description: string | null;
}
