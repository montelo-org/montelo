import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateDatapointRunInput {
  @ApiProperty()
  @IsString()
  datapointRunId: string;

  @ApiProperty()
  output: any;
}
