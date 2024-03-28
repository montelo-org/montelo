import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { z } from "zod";

const CreateProjectSchema = z.object({
  name: z.string().min(1, { message: "A project name is required." }),
  envNames: z
    .array(z.string())
    .default([])
    .transform((envNames) => envNames.map((env) => _.capitalize(env.toString())).filter((env) => env.length)),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;

export const CreateProjectResolver = zodResolver(CreateProjectSchema);
