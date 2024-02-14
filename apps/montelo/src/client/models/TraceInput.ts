/* tslint:disable */

/* eslint-disable */

/**
 * Montelo Log Server
 * This server handles creating traces and logs.
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { exists, mapValues } from "../runtime";

/**
 *
 * @export
 * @interface TraceInput
 */
export interface TraceInput {
  /**
   *
   * @type {string}
   * @memberof TraceInput
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof TraceInput
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof TraceInput
   */
  userId?: string;
  /**
   *
   * @type {object}
   * @memberof TraceInput
   */
  extra?: object;
}

/**
 * Check if a given object implements the TraceInput interface.
 */
export function instanceOfTraceInput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "name" in value;

  return isInstance;
}

export function TraceInputFromJSON(json: any): TraceInput {
  return TraceInputFromJSONTyped(json, false);
}

export function TraceInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraceInput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    name: json["name"],
    userId: !exists(json, "userId") ? undefined : json["userId"],
    extra: !exists(json, "extra") ? undefined : json["extra"],
  };
}

export function TraceInputToJSON(value?: TraceInput | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    userId: value.userId,
    extra: value.extra,
  };
}
