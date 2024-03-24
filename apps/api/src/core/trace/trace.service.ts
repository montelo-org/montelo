import { DatabaseService } from "@montelo/api-common";
import { Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
import { TraceWithLogs } from "./trace.types";


@Injectable()
export class TraceService {
  constructor(private db: DatabaseService) {}

  async getById(traceId: string): Promise<TraceWithLogs> {
    return this.db.trace.findUniqueOrThrow({
      where: {
        id: traceId,
      },
      include: {
        logs: {
          orderBy: [
            {
              startTime: "asc",
            },
          ],
        },
      },
    });
  }

  async delete(traceId: string): Promise<void> {
    await this.db.trace.delete({
      where: {
        id: traceId,
      },
    });
  }

  async createDefaultTrace(envId: string) {
    const firstLogId = createId();

    const firstLog: Prisma.LogCreateManyTraceInput = {
      id: firstLogId,
      envId,
      name: "Sample Trace",
      source: "MANUAL",
      startTime: "2024-03-24 20:31:31.062",
      endTime: "2024-03-24 20:31:31.062",
    };

    const secondLog: Prisma.LogCreateManyTraceInput = {
      parentLogId: firstLogId,
      envId,
      name: "Action 1",
      source: "ANTHROPIC",
      input: {
        model: "claude-3-sonnet-20240229",
        messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
        max_tokens: 100,
      },
      output: {
        id: "msg_014Nh4XGo5qAHECggp83Xvcr",
        role: "assistant",
        type: "message",
        model: "claude-3-sonnet-20240229",
        usage: { input_tokens: 17, output_tokens: 53 },
        content: [
          {
            text: "I'm afraid I don't actually know anything specific about the individual reading this, so I can't craft a personalized joke. However, here's a silly general joke instead:\n\nWhy don't scientists trust atoms? Because they make up everything!",
            type: "text",
          },
        ],
        stop_reason: "end_turn",
        stop_sequence: null,
      },
      model: "claude-3-sonnet-20240229",
      startTime: "2024-03-24 20:31:31.133",
      endTime: "2024-03-24 20:31:32.894",
      duration: 1.76,
      inputTokens: 17,
      outputTokens: 53,
      totalTokens: 70,
      inputCost: 0.00005,
      outputCost: 0.0008,
      totalCost: 0.0008,
    };

    const thirdLog: Prisma.LogCreateManyTraceInput = {
      parentLogId: firstLogId,
      envId,
      name: "Action 2",
      source: "MISTRAL",
      input: {
        model: "mistral-tiny",
        messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
      },
      output: {
        id: "fcd3521fa8054142969a98a44585d690",
        model: "mistral-tiny",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                "Why are you looking so confused while reading this? Because you're not used to being the punchline! But seriously, I hope you're having a great day! Here's a joke for real: Why don't scientists trust atoms? Because they make up everything!",
              tool_calls: null,
            },
            logprobs: null,
            finish_reason: "stop",
          },
        ],
        created: 1711312293,
      },
      model: "mistral-tiny",
      startTime: "2024-03-24 20:31:32.894",
      endTime: "2024-03-24 20:31:34.211",
      duration: 1.32,
      inputTokens: 18,
      outputTokens: 57,
      totalTokens: 75,
      inputCost: 0.000005,
      outputCost: 0.00001,
      totalCost: 0.00002,
    };

    const fourthLog: Prisma.LogCreateManyTraceInput = {
      parentLogId: firstLogId,
      envId,
      name: "Action 3",
      source: "OPENAI",
      input: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
      },
      output: {
        id: "chatcmpl-96On8EtdlLHZKqMGwDXsl2xbkobnS",
        model: "gpt-3.5-turbo-0125",
        usage: { total_tokens: 38, prompt_tokens: 17, completion_tokens: 21 },
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "Why did the reader bring a ladder to the bar? Because they heard the drinks were on the house!",
            },
            logprobs: null,
            finish_reason: "stop",
          },
        ],
        created: 1711312294,
        system_fingerprint: "fp_3bc1b5746c",
      },
      model: "gpt-3.5-turbo-0125",
      startTime: "2024-03-24 20:31:34.211",
      endTime: "2024-03-24 20:31:35.060",
      duration: 0.85,
      inputTokens: 17,
      outputTokens: 21,
      totalTokens: 38,
      inputCost: 0.000009,
      outputCost: 0.000003,
      totalCost: 0.00001,
    };

    await this.db.trace.create({
      data: {
        envId,
        name: "Sample Trace",
        inputTokens: 52,
        outputTokens: 131,
        totalTokens: 183,
        inputCost: 0.000064,
        outputCost: 0.000813,
        totalCost: 0.00083,
        startTime: "2024-03-24 20:31:31.062",
        endTime: "2024-03-24 20:31:35.060",
        duration: 4,
        extra: {
          some: "extra data",
        },
        userId: "user_123",
        tags: ["tag1"],
        logs: {
          createMany: {
            data: [firstLog, secondLog, thirdLog, fourthLog],
          },
        },
      },
    });
  }
}
