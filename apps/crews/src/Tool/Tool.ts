import { zodToJsonSchema } from "zod-to-json-schema";
import { generateId } from "../utils";
import { FunctionParams, InferSchemaType, ParamsSchema, ToolJSON } from "./Tool.interface";

export class Tool {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly function: (params: InferSchemaType<ParamsSchema>) => any;
  public readonly schema: ParamsSchema;

  constructor(params: FunctionParams) {
    this.id = generateId("tool");
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
