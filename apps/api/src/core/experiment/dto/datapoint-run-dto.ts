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

  @ApiProperty()
  createdAt: string;

  static fromDatapointRun(datapointRun: DatapointRun): DatapointRunDto {
    const base = pick(datapointRun, ["id", "datapointId", "experimentId", "output"]);
    return {
      ...base,
      createdAt: datapointRun.createdAt.toISOString(),
    };
  }
}
