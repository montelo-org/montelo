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

/**
 *
 * @export
 * @interface ProjectDto
 */
export interface ProjectDto {
  /**
   *
   * @type {string}
   * @memberof ProjectDto
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof ProjectDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof ProjectDto
   */
  orgId: string;
}

/**
 * Check if a given object implements the ProjectDto interface.
 */
export function instanceOfProjectDto(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "id" in value;
  isInstance = isInstance && "name" in value;
  isInstance = isInstance && "orgId" in value;

  return isInstance;
}

export function ProjectDtoFromJSON(json: any): ProjectDto {
  return ProjectDtoFromJSONTyped(json, false);
}

export function ProjectDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    name: json["name"],
    orgId: json["orgId"],
  };
}

export function ProjectDtoToJSON(value?: ProjectDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    orgId: value.orgId,
  };
}
