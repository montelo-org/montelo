import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDatapointRunInput {
  @ApiProperty()
  @IsString()
  experimentId: string;

  @ApiProperty()
  @IsString()
  datapointId: string;
}
