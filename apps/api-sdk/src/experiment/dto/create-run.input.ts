import { ApiProperty } from "@nestjs/swagger";

export class CreateRunInput {
  @ApiProperty()
  experimentId: string;

  @ApiProperty()
  input: object;

  @ApiProperty()
  output: object;
}
