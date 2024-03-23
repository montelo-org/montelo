import { ApiProperty } from "@nestjs/swagger";
import { DatapointDto } from "../../datapoint";
import { DatapointRunWithDatapoint } from "../experiment.types";
import { DatapointRunDto } from "./datapoint-run-dto";

export class FullDatapointRunDto extends DatapointRunDto {
  @ApiProperty()
  datapoint: DatapointDto;

  static fromFullDatapointRun(run: DatapointRunWithDatapoint): FullDatapointRunDto {
    const base = DatapointRunDto.fromDatapointRun(run);
    return {
      ...base,
      datapoint: DatapointDto.fromDatapoint(run.datapoint),
    };
  }
}
