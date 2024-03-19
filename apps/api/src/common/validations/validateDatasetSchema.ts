import { SchemaObject } from "@montelo/api-common";
import { HttpException, HttpStatus } from "@nestjs/common";

export const validateDatasetSchema = (inputSchema: object, outputSchema: object) => {
  const validatedInput = SchemaObject.safeParse(inputSchema);
  const validatedOutput = SchemaObject.safeParse(outputSchema);
  if (!validatedInput.success) {
    throw new HttpException("Input schema is invalid", HttpStatus.BAD_REQUEST);
  }
  if (!validatedOutput.success) {
    throw new HttpException("Output schema is invalid", HttpStatus.BAD_REQUEST);
  }
};
