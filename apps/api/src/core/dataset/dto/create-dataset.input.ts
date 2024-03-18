import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDatasetInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  envId: string;

  @ApiProperty()
  inputSchema: any;

  @ApiProperty()
  outputSchema: any;
}