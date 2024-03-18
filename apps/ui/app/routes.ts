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
      experiments: (params: EnvParams) => buildEnvPath(params)("experiments"),
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
    delete: path(ROOT_ACTION, "/project/delete"),
    create: path(ROOT_ACTION, "/project/create"),
    getAllApiKeys: (projectId: string) => path(ROOT_ACTION, `/project/${projectId}/api-keys`),
  },
  apiKeys: {
    reveal: (apiKeyId: string) => path(ROOT_ACTION, `/api-keys/${apiKeyId}/reveal`),
    rotate: (apiKeyId: string) => path(ROOT_ACTION, `/api-keys/${apiKeyId}/rotate`),
  },
  trace: {
    delete: path(ROOT_ACTION, "/trace/delete"),
  },
  env: {
    create: path(ROOT_ACTION, "/env/create"),
  },
  dataset: {
    create: path(ROOT_ACTION, "/dataset/create"),
    delete: path(ROOT_ACTION, "/dataset/delete"),
  }
};

// external pages
const PATH_EXTERNAL = {
  documentation: "https://docs.montelo.ai",
  slack: "https://join.slack.com/t/montelo/shared_invite/zt-2e2n0d68m-1Ib_qDeGavkrBIxFaIpjgg",
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
