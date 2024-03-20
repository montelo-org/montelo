import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDatasetInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    type: String
  })
  description: string | null;

  @ApiProperty()
  inputSchema: any;

  @ApiProperty()
  outputSchema: any;
}
