import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

type OpenAIFunction = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

type OpenAITool = {
  type: "function";
  function: OpenAIFunction;
};

type InferSchemaType<TSchema extends z.ZodType<any, any>> = TSchema extends z.ZodType<infer T, any> ? T : never;

type FunctionParams<TSchema extends z.ZodObject<any, any>, TResult> = {
  name: string;
  description: string;
  function: (params: InferSchemaType<TSchema>) => TResult;
  schema: TSchema;
};

export class AIFunction<TSchema extends z.ZodObject<any, any>, TResult> {
  public readonly name: string;
  public readonly description: string;
  public readonly function: (params: InferSchemaType<TSchema>) => TResult;
  public readonly schema: TSchema;

  constructor(params: FunctionParams<TSchema, TResult>) {
    this.name = params.name;
    this.description = params.description;
    this.function = params.function;
    this.schema = params.schema;
  }

  toJSON = (): OpenAITool => {
    // @ts-ignore
    const { properties, required } = zodToJsonSchema(this.schema);
    const func = {
      name: this.name,
      description: this.description,
      parameters: { type: "object", properties, required },
    };
    return {
      type: "function",
      function: func,
    };
  };
}
