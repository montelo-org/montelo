import { withZod } from "@remix-validated-form/with-zod";
import z from "zod";

export const SchemaValueTypes = z.enum(["string", "number", "boolean", "object", "array"]);

const SchemaKeyValuePair = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  value: SchemaValueTypes,
});

export const createDatasetValidator = withZod(
  z.object({
    name: z.string().min(1, { message: "Dataset name is required" }),
    description: z.string(),
    inputSchema: z.array(SchemaKeyValuePair),
    outputSchema: z.array(SchemaKeyValuePair),
  }),
);
