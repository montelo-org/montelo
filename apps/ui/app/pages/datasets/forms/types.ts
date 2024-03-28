import { DatasetDto } from "@montelo/browser-client";

export type CreateDatasetActionData =
  | {
      dataset: DatasetDto;
      error: null;
    }
  | {
      dataset: null;
      error: string;
    };
