import { ApiKeyWithEnvDto, EnvironmentDto } from "@montelo/browser-client";
import _ from "lodash";

const priority = ["Development", "Production"];

export const sortApiKeys = (apiKeys: ApiKeyWithEnvDto[]) => {
  return _.sortBy(apiKeys, [
    (apiKey) => {
      const index = priority.indexOf(apiKey.environment.name);
      return index === -1 ? priority.length : index;
    },
    "name",
  ]);
};

export const sortEnvironmentsByName = (environments: EnvironmentDto[]) => {
  return _.sortBy(environments, [
    (environment) => {
      const index = priority.indexOf(environment.name);
      return index === -1 ? priority.length : index;
    },
    "name",
  ]);
};
