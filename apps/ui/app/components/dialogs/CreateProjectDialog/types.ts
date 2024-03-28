import { FullProjectDto } from "@montelo/browser-client";

export type CreateProjectActionData =
  | {
      project: FullProjectDto;
      error: null;
    }
  | {
      project: null;
      error: string;
    };
