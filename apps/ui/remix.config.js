import { flatRoutes } from "remix-flat-routes";


/** @type {import("@remix-run/dev").AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
