import { LogSources } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";

export class TokenInfo {
  @ApiProperty({
    type: Number,
    example: 5,
  })
  inputTokens: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  outputTokens: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  totalTokens: number;
}

export class LogInput {
  @ApiProperty({
    type: String,
    required: false,
    example: "Agent X",
  })
  name?: string;

  @ApiProperty({ enum: LogSources })
  source: LogSources;

  @ApiProperty({
    type: String,
    required: false,
    example: "gpt-4",
  })
  model?: string;

  @ApiProperty({
    example: "What is your name?",
    required: false,
  })
  input: any;

  @ApiProperty({
    example: "I am an AI. I do not have a name.",
    required: false,
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
    type: TokenInfo,
    required: false,
  })
  tokens?: TokenInfo;

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
