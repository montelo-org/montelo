/* tslint:disable */

/* eslint-disable */

/**
 * Montelo API SDK
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
import type { HealthControllerCheck200ResponseInfoValue } from "./HealthControllerCheck200ResponseInfoValue";
import {
  HealthControllerCheck200ResponseInfoValueFromJSON,
  HealthControllerCheck200ResponseInfoValueFromJSONTyped,
  HealthControllerCheck200ResponseInfoValueToJSON,
} from "./HealthControllerCheck200ResponseInfoValue";

/**
 *
 * @export
 * @interface HealthControllerCheck200Response
 */
export interface HealthControllerCheck200Response {
  /**
   *
   * @type {string}
   * @memberof HealthControllerCheck200Response
   */
  status?: string;
  /**
   *
   * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
   * @memberof HealthControllerCheck200Response
   */
  info?: { [key: string]: HealthControllerCheck200ResponseInfoValue } | null;
  /**
   *
   * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
   * @memberof HealthControllerCheck200Response
   */
  error?: { [key: string]: HealthControllerCheck200ResponseInfoValue } | null;
  /**
   *
   * @type {{ [key: string]: HealthControllerCheck200ResponseInfoValue; }}
   * @memberof HealthControllerCheck200Response
   */
  details?: { [key: string]: HealthControllerCheck200ResponseInfoValue };
}

/**
 * Check if a given object implements the HealthControllerCheck200Response interface.
 */
export function instanceOfHealthControllerCheck200Response(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function HealthControllerCheck200ResponseFromJSON(json: any): HealthControllerCheck200Response {
  return HealthControllerCheck200ResponseFromJSONTyped(json, false);
}

export function HealthControllerCheck200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): HealthControllerCheck200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, "status") ? undefined : json["status"],
    info: !exists(json, "info")
      ? undefined
      : json["info"] === null
        ? null
        : mapValues(json["info"], HealthControllerCheck200ResponseInfoValueFromJSON),
    error: !exists(json, "error")
      ? undefined
      : json["error"] === null
        ? null
        : mapValues(json["error"], HealthControllerCheck200ResponseInfoValueFromJSON),
    details: !exists(json, "details")
      ? undefined
      : mapValues(json["details"], HealthControllerCheck200ResponseInfoValueFromJSON),
  };
}

export function HealthControllerCheck200ResponseToJSON(value?: HealthControllerCheck200Response | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: value.status,
    info:
      value.info === undefined
        ? undefined
        : value.info === null
          ? null
          : mapValues(value.info, HealthControllerCheck200ResponseInfoValueToJSON),
    error:
      value.error === undefined
        ? undefined
        : value.error === null
          ? null
          : mapValues(value.error, HealthControllerCheck200ResponseInfoValueToJSON),
    details:
      value.details === undefined
        ? undefined
        : mapValues(value.details, HealthControllerCheck200ResponseInfoValueToJSON),
  };
}
