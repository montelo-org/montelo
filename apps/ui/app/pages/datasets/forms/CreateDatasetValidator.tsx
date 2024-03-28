import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SchemaValueTypes = z.enum(["string", "number", "boolean", "object", "array"]);
export type SchemaValTypes = z.infer<typeof SchemaValueTypes>;

const SchemaKeyValuePair = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  value: SchemaValueTypes,
});

const CreateDatasetSchema = z.object({
  name: z.string().min(1, { message: "Dataset name is required" }),
  description: z.string(),
  inputSchema: z.array(SchemaKeyValuePair),
  outputSchema: z.array(SchemaKeyValuePair),
});

export type CreateDatasetSchemaType = z.infer<typeof CreateDatasetSchema>;

export const CreateDatasetResolver = zodResolver(CreateDatasetSchema);
