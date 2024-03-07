/* tslint:disable */

/* eslint-disable */

/**
 * Montelo Log Server
 * This server handles creating traces and traces.
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { exists, mapValues } from "../runtime";
import type { TokenInfo } from "./TokenInfo";
import { TokenInfoFromJSON, TokenInfoFromJSONTyped, TokenInfoToJSON } from "./TokenInfo";

/**
 *
 * @export
 * @interface LogInput
 */
export interface LogInput {
  /**
   *
   * @type {string}
   * @memberof LogInput
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof LogInput
   */
  source: LogInputSourceEnum;
  /**
   *
   * @type {string}
   * @memberof LogInput
   */
  model?: string;
  /**
   *
   * @type {object}
   * @memberof LogInput
   */
  input: object;
  /**
   *
   * @type {object}
   * @memberof LogInput
   */
  output: object;
  /**
   *
   * @type {string}
   * @memberof LogInput
   */
  startTime?: string;
  /**
   *
   * @type {string}
   * @memberof LogInput
   */
  endTime?: string;
  /**
   *
   * @type {number}
   * @memberof LogInput
   */
  duration?: number;
  /**
   *
   * @type {TokenInfo}
   * @memberof LogInput
   */
  tokens?: TokenInfo;
  /**
   *
   * @type {object}
   * @memberof LogInput
   */
  extra?: object;
}

/**
 * @export
 */
export const LogInputSourceEnum = {
  Manual: "MANUAL",
  Openai: "OPENAI",
  Anthropic: "ANTHROPIC",
  Mistral: "MISTRAL",
  Cohere: "COHERE",
} as const;
export type LogInputSourceEnum = (typeof LogInputSourceEnum)[keyof typeof LogInputSourceEnum];

/**
 * Check if a given object implements the LogInput interface.
 */
export function instanceOfLogInput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "source" in value;
  isInstance = isInstance && "input" in value;
  isInstance = isInstance && "output" in value;

  return isInstance;
}

export function LogInputFromJSON(json: any): LogInput {
  return LogInputFromJSONTyped(json, false);
}

export function LogInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogInput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json["name"],
    source: json["source"],
    model: !exists(json, "model") ? undefined : json["model"],
    input: json["input"],
    output: json["output"],
    startTime: !exists(json, "startTime") ? undefined : json["startTime"],
    endTime: !exists(json, "endTime") ? undefined : json["endTime"],
    duration: !exists(json, "duration") ? undefined : json["duration"],
    tokens: !exists(json, "tokens") ? undefined : TokenInfoFromJSON(json["tokens"]),
    extra: !exists(json, "extra") ? undefined : json["extra"],
  };
}

export function LogInputToJSON(value?: LogInput | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    source: value.source,
    model: value.model,
    input: value.input,
    output: value.output,
    startTime: value.startTime,
    endTime: value.endTime,
    duration: value.duration,
    tokens: TokenInfoToJSON(value.tokens),
    extra: value.extra,
  };
}
