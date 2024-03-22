import { DatapointRun } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { pick } from "lodash";

export class DatapointRunDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  output: any;

  @ApiProperty()
  experimentId: string;

  @ApiProperty()
  datapointId: string;

  static fromDatapointRun(datapointRun: DatapointRun): DatapointRunDto {
    return pick(datapointRun, ["id", "datapointId", "experimentId", "output"]);
  }
}
