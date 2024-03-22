import { ApiProperty } from "@nestjs/swagger";

export class AddToDatasetInput {
  @ApiProperty()
  input: any;

  @ApiProperty()
  expectedOutput: any;
}
