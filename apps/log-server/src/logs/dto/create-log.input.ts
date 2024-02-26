import { ApiProperty } from "@nestjs/swagger";
import { LogTypes } from "@montelo/db";

export class LogInput {
  @ApiProperty({
    example: "Agent X",
  })
  name: string;

  @ApiProperty({ enum: LogTypes })
  type: LogTypes;

  @ApiProperty({
    type: String,
    required: false,
    example: "gpt-4",
  })
  model?: string;

  @ApiProperty({
    example: "What is your name?",
  })
  input: any;

  @ApiProperty({
    example: "I am an AI. I do not have a name.",
  })
  output: any;

  @ApiProperty({
    type: String,
    example: "2024-02-12T03:55:29.161Z",
    required: false,
  })
  startTime?: string;

  @ApiProperty({
    type: String,
    example: "2024-02-12T03:56:29.161Z",
    required: false,
  })
  endTime?: string;

  @ApiProperty({
    type: Number,
    example: 1.32,
    required: false,
  })
  duration?: number;

  @ApiProperty({
    type: Number,
    example: 5,
    required: false,
  })
  inputTokens?: number;

  @ApiProperty({
    type: Number,
    example: 5,
    required: false,
  })
  outputTokens?: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: false,
  })
  totalTokens?: number;

  @ApiProperty({
    type: "object",
    required: false,
  })
  extra?: Record<string, any>;
}

export class TraceInput {
  @ApiProperty({
    example: "clsj9nupk000108jp9pxdcx5c",
  })
  id: string;

  @ApiProperty({
    example: "Top-level Trace",
  })
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: null,
  })
  userId?: string;

  @ApiProperty({
    example: null,
    required: false,
  })
  extra?: Record<string, any>;
}

export class CreateLogInput {
  @ApiProperty()
  log: LogInput;

  @ApiProperty({
    type: TraceInput,
    required: false,
    example: {
      id: "clsj9nupk000108jp9pxdcx5c",
      name: "Top-level Trace",
      userId: null,
      extra: null,
    },
  })
  trace?: TraceInput;
}
