// import { ClientOptions as AnthropicClientOptions } from "@anthropic-ai/sdk";
import { ClientOptions as OpenAIClientOptions } from "openai";

export type MistralClientOptions = {
  apiKey?: string;
  endpoint?: string;
};

export type MonteloOptions = {
  montelo?: MonteloClientOptions;
  openai?: OpenAIClientOptions;
  mistral?: MistralClientOptions;
  // anthropic?: AnthropicClientOptions;
};

export type MonteloClientOptions = {
  apiKey?: string;
  baseUrl?: string;
};

export type TraceParams = {
  name: string;
  userId?: string;
  extra?: Record<string, any>;
};
