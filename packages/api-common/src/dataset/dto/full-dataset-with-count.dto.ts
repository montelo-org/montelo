import { ApiProperty } from "@nestjs/swagger";
import { DatasetWithDatapoints } from "../dataset.types";
import { FullDatasetDto } from "./full-dataset.dto";

export class FullDatasetWithCountDto {
  @ApiProperty()
  dataset: FullDatasetDto;

  @ApiProperty()
  totalCount: number;

  static fromFullDatasetWithCount(fullDatasetWithCount: {
    dataset: DatasetWithDatapoints;
    totalCount: number;
  }): FullDatasetWithCountDto {
    return {
      dataset: FullDatasetDto.fromFullDataset(fullDatasetWithCount.dataset),
      totalCount: fullDatasetWithCount.totalCount,
    };
  }
}
