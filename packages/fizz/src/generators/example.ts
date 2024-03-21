/*
 * FUNCTIONS
 */
export const FUNCTION_EXAMPLE_FILE_NAME = "getCurrentWeather.ts";

export const FUNCTION_EXAMPLE = `import { AIFunction } from "montelo";
import { z } from "zod";

const FunctionInput = z.object({
  location: z.string().describe("The city, e.g San Francisco."),
  unit: z.enum(["Celsius", "Fahrenheit"]).describe("The unit of temperature."),
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const getCurrentWeather = async (params: TFunctionInput): Promise<string> => {
  return \`The weather in \${params.location} is currently 22 degrees \${params.unit}.\`;
};

const func = new AIFunction({
  name: "getCurrentWeather",
  function: getCurrentWeather,
  description: "Get the current weather in a given location.",
  schema: FunctionInput,
});

`;
