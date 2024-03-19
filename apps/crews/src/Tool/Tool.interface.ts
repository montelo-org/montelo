import { z } from "zod";

export type ToolFunctionJSON = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export type ToolJSON = {
  type: "function";
  function: ToolFunctionJSON;
};

export type ParamsSchema = z.ZodType<any, any>;

export type InferSchemaType<TSchema extends z.ZodType<any, any>> = TSchema extends z.ZodType<infer T, any> ? T : never;

export type FunctionParams = {
  name: string;
  description: string;
  function: (params: InferSchemaType<ParamsSchema>) => any;
  schema: ParamsSchema;
};
