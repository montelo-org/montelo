import { DatasetWithDatapoints } from "@montelo/api-common/dist/dataset/dataset.types";
import { ApiProperty } from "@nestjs/swagger";
import { DatapointDto } from "../../datapoint/dto/datapoint.dto";
import { DatasetDto } from "./dataset.dto";

export class FullDatasetDto extends DatasetDto {
  @ApiProperty()
  datapoints: DatapointDto[];

  static fromFullDataset(dataset: DatasetWithDatapoints): FullDatasetDto {
    const base = DatasetDto.fromDataset(dataset);
    return { ...base, datapoints: dataset.datapoints };
  }
}
