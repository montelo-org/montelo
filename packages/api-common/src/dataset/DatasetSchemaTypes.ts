import z from "zod";

export const SchemaValueTypes = z.enum(["string", "number", "boolean", "object", "array"]);

export const SchemaObject = z.record(z.string(), SchemaValueTypes);
