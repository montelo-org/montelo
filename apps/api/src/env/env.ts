import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
