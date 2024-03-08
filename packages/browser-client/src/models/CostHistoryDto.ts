/* tslint:disable */

/* eslint-disable */

/**
 * Montelo
 * Documentation for the Montelo API.
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { exists, mapValues } from "../runtime";
import type { CostHistory } from "./CostHistory";
import { CostHistoryFromJSON, CostHistoryFromJSONTyped, CostHistoryToJSON } from "./CostHistory";

/**
 *
 * @export
 * @interface CostHistoryDto
 */
export interface CostHistoryDto {
  /**
   *
   * @type {Array<CostHistory>}
   * @memberof CostHistoryDto
   */
  costHistory: Array<CostHistory>;
}

/**
 * Check if a given object implements the CostHistoryDto interface.
 */
export function instanceOfCostHistoryDto(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "costHistory" in value;

  return isInstance;
}

export function CostHistoryDtoFromJSON(json: any): CostHistoryDto {
  return CostHistoryDtoFromJSONTyped(json, false);
}

export function CostHistoryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CostHistoryDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    costHistory: (json["costHistory"] as Array<any>).map(CostHistoryFromJSON),
  };
}

export function CostHistoryDtoToJSON(value?: CostHistoryDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    costHistory: (value.costHistory as Array<any>).map(CostHistoryToJSON),
  };
}
