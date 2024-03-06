import * as z from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.string(),
  SERVER_BASE_URL: z.string().url(),
  SECRET: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

const getEnvironment = () => serverEnvSchema.parse(process.env);

export const env = getEnvironment();
