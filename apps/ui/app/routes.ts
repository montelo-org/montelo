const path = (root: string, sublink: string) => `${root}${sublink}`;

const ROOT_APP = "/app";
const ROOT_AUTH = "/auth";
const ROOT_ACTION = "/action";

const buildEnvPath = (params: EnvParams) => (sublink: string) =>
  path(ROOT_APP, `/project/${params.projectId}/env/${params.envId}/${sublink}`);

// app pages
const PATH_APP = {
  root: ROOT_APP,
  org: path(ROOT_APP, "/org"),
  account: path(ROOT_APP, "/account"),
  project: {
    all: path(ROOT_APP, "/project"),
    env: {
      dashboard: (params: EnvParams) => buildEnvPath(params)("dashboard"),
      traces: (params: EnvParams) => buildEnvPath(params)("traces"),
      traceId: (params: EnvParams & { traceId: string; logId?: string }) =>
        buildEnvPath(params)(`traces/${params.traceId}${params.logId ? `?logId=${params.logId}` : ""}`),
      datasets: (params: EnvParams) => buildEnvPath(params)("datasets"),
      datasetsId: (params: EnvParams & { datasetId: string }) => buildEnvPath(params)(`datasets/${params.datasetId}`),
      experiments: (params: EnvParams) => buildEnvPath(params)("experiments"),
      experimentsId: (params: EnvParams & { experimentId: string }) =>
        buildEnvPath(params)(`experiments/${params.experimentId}`),
      datapointRunId: (
        params: EnvParams & {
          experimentId: string;
          datapointRunId: string;
        },
      ) => buildEnvPath(params)(`experiments/${params.experimentId}/datapoint-run/${params.datapointRunId}`),
    },
  },
};

// auth pages
const PATH_AUTH = {
  login: path(ROOT_AUTH, "/login"),
  register: path(ROOT_AUTH, "/register"),
};

// remix loaders/actions
const PATH_ACTIONS = {
  setTheme: path(ROOT_ACTION, "/set-theme"),
  project: {
    create: path(ROOT_ACTION, "/project"),
    delete: (projectId: string) => path(ROOT_ACTION, `/project/${projectId}`),
    getAllApiKeys: (projectId: string) => path(ROOT_ACTION, `/project/${projectId}/api-keys`),
  },
  apiKeys: {
    reveal: (params: { projectId: string; apiKeyId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/api-keys/${params.apiKeyId}/reveal`),
    rotate: (params: { projectId: string; apiKeyId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/api-keys/${params.apiKeyId}/rotate`),
  },
  trace: {
    delete: (params: { projectId: string; traceId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/trace/${params.traceId}`),
  },
  env: {
    create: (projectId: string) => path(ROOT_ACTION, `/project/${projectId}/env`),
  },
  dataset: {
    create: (params: { projectId: string; envId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/env/${params.envId}/dataset`),
    delete: (params: { projectId: string; datasetId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/dataset/${params.datasetId}`),
  },
  datapoints: {
    delete: (params: { projectId: string; datapointId: string }) =>
      path(ROOT_ACTION, `/project/${params.projectId}/datapoint/${params.datapointId}`),
  },
};

// external pages
const PATH_EXTERNAL = {
  documentation: "https://docs.montelo.ai",
  discord: "https://discord.gg/ZBjGgJkF",
};

// routes object to use in files
export const Routes = {
  actions: PATH_ACTIONS,
  app: PATH_APP,
  auth: PATH_AUTH,
  external: PATH_EXTERNAL,
};

/* Types */
export type EnvParams = {
  projectId: string;
  envId: string;
};
