// // @ts-nocheck
// import Anthropic, { ClientOptions as AnthropicClientOptions } from "@anthropic-ai/sdk";
// import { APIPromise, RequestOptions } from "@anthropic-ai/sdk/src/core";
// import {
//   Message,
//   MessageCreateParams,
//   MessageCreateParamsBase,
//   MessageCreateParamsNonStreaming,
//   MessageCreateParamsStreaming,
//   MessageStream,
//   MessageStreamEvent,
//   MessageStreamParams,
// } from "@anthropic-ai/sdk/src/resources/messages";
// import { Stream } from "@anthropic-ai/sdk/src/streaming";
// import OpenAI from "openai";
// import { MonteloClient } from "../MonteloClient";
// import { LogInput } from "../client";
// import { MonteloLogExtend, separateExtend } from "./types";
//
// class ExtendedMessages extends Anthropic.Messages {
//   private monteloClient: MonteloClient;
//
//   constructor(monteloClient: MonteloClient, anthropic: Anthropic) {
//     super(anthropic);
//
//     this.monteloClient = monteloClient;
//   }
//
//   create(body: MessageCreateParamsNonStreaming & MonteloLogExtend, options?: RequestOptions): APIPromise<Message>;
//   create(
//     body: MessageCreateParamsStreaming & MonteloLogExtend,
//     options?: RequestOptions,
//   ): APIPromise<Stream<MessageStreamEvent>>;
//   create(
//     body: MessageCreateParamsBase & MonteloLogExtend,
//     options?: RequestOptions,
//   ): APIPromise<Stream<MessageStreamEvent> | Message>;
//   create(
//     body: MessageCreateParams & MonteloLogExtend,
//     options?: RequestOptions,
//   ): APIPromise<Message> | APIPromise<Stream<MessageStreamEvent>> {
//     const startTime = new Date();
//
//     const { base, extend } = separateExtend(body);
//     // @ts-ignore
//     const originalPromise = this._client.post("/v1/messages", {
//       body: base,
//       timeout: 600000,
//       ...options,
//       stream: body.stream ?? false,
//     }) as APIPromise<Message> | APIPromise<Stream<MessageStreamEvent>>;
//
//     if (body.stream) {
//       // @ts-ignore
//       return originalPromise.then((originalStream) => {
//         // @ts-ignore
//         return this.augmentStream(originalStream, startTime, base, extend);
//       });
//     } else {
//       // @ts-ignore
//       return originalPromise.then((data) => {
//         const endTime = new Date();
//         const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
//
//         void this.logToDatabase(base, extend, data as Message, {
//           startTime: startTime.toISOString(),
//           endTime: endTime.toISOString(),
//           duration: parseFloat(duration),
//         });
//         return data;
//       });
//     }
//   }
//
//   /**
//    * Create a Message stream
//    */
//   stream(body: MessageStreamParams, options?: RequestOptions): MessageStream {
//     return MessageStream.createMessage(this, body, options);
//   }
//
//   private augmentStream(
//     originalStream: Stream<MessageStreamEvent>,
//     startTime: Date,
//     base: MessageCreateParams,
//     extend: MonteloLogExtend,
//   ): Stream<OpenAI.ChatCompletionChunk> {
//     const self = this;
//
//     async function* augmentedIterator() {
//       const chunks: MessageStreamEvent[] = [];
//       for await (const item of originalStream) {
//         chunks.push(item);
//         yield item;
//       }
//
//       // Once all items are consumed, perform logging
//       const endTime = new Date();
//       const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
//
//       const finalContent = chunks.reduce((acc, chunk) => {
//         const content = chunk.choices[0].delta.content;
//         if (content) {
//           acc += content;
//         }
//         return acc;
//       }, "");
//
//       const data: Message = {
//         id: chunks[0].id,
//         system_fingerprint: chunks[0].system_fingerprint,
//         created: chunks[0].created,
//         model: chunks[0].model,
//         usage: {
//           input_tokens: 0,
//           output_tokens: 0,
//         },
//         object: "chat.completion",
//         choices: [
//           {
//             index: chunks[0].choices[0].index,
//             logprobs: chunks[0].choices[0].logprobs || null,
//             finish_reason: chunks[0].choices[0].finish_reason || "stop",
//             message: {
//               content: finalContent,
//               role: "assistant",
//             },
//           },
//         ],
//       };
//
//       await self.logToDatabase(base, extend, data, {
//         startTime: startTime.toISOString(),
//         endTime: endTime.toISOString(),
//         duration: parseFloat(duration),
//       });
//     }
//
//     // Return a new Stream instance wrapping the augmented iterator
//     // Assuming Stream can be constructed with an AsyncGenerator function directly
//     return new Stream(augmentedIterator, originalStream.controller);
//   }
//
//   private async logToDatabase(
//     base: MessageCreateParams,
//     extend: MonteloLogExtend,
//     output: Message,
//     time: {
//       startTime: string;
//       endTime: string;
//       duration: number;
//     },
//   ): Promise<void> {
//     const log: LogInput = {
//       ...time,
//       ...extend,
//       tokens: {
//         inputTokens: output.usage.input_tokens,
//         outputTokens: output.usage.output_tokens,
//         totalTokens: output.usage.input_tokens + output.usage.output_tokens,
//       },
//       source: "ANTHROPIC",
//       model: output.model,
//       input: base,
//       output,
//     };
//     void this.monteloClient.createLog(log);
//   }
// }
//
// export class ExtendedAnthropic extends Anthropic {
//   messages: ExtendedMessages;
//
//   constructor(monteloClient: MonteloClient, anthropicClientOptions?: AnthropicClientOptions) {
//     super(anthropicClientOptions);
//
//     this.messages = new ExtendedMessages(monteloClient, this);
//   }
// }
