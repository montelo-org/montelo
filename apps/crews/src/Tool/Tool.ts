import { zodToJsonSchema } from "zod-to-json-schema";
import { FunctionParams, InferSchemaType, ParamsSchema, ToolJSON } from "./Tool.interface";

export class Tool {
  public readonly name: string;
  public readonly description: string;
  public readonly function: (params: InferSchemaType<ParamsSchema>) => any;
  public readonly schema: ParamsSchema;

  constructor(params: FunctionParams) {
    this.name = params.name;
    this.description = params.description;
    this.function = params.function;
    this.schema = params.schema;
  }

  toJSON = (): ToolJSON => {
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
