import { ApiProperty } from "@nestjs/swagger";
import { DatapointDto } from "../../datapoint";
import { DatasetWithDatapoints } from "../dataset.types";
import { DatasetDto } from "./dataset.dto";

export class FullDatasetDto extends DatasetDto {
  @ApiProperty({
    type: [DatapointDto],
  })
  datapoints: DatapointDto[];

  static fromFullDataset(dataset: DatasetWithDatapoints): FullDatasetDto {
    const base = DatasetDto.fromDataset(dataset);
    const datapoints = dataset.datapoints.map(DatapointDto.fromDatapoint);
    return { ...base, datapoints };
  }
}
