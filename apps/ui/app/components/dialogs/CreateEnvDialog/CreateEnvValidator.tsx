import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CreateEnvSchema = z.object({
  name: z.string().min(1, { message: "A name is required." }),
});

export type CreateEnvSchemaType = z.infer<typeof CreateEnvSchema>;

export const CreateEnvResolver = zodResolver(CreateEnvSchema);
