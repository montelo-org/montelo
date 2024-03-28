import { EnvironmentDto } from "@montelo/browser-client";

export type CreateEnvActionData =
  | {
      environment: EnvironmentDto;
      error: null;
    }
  | {
      environment: null;
      error: string;
    };
