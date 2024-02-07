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
 * @interface RegisterUserInput
 */
export interface RegisterUserInput {
  /**
   * The user's email.
   * @type {string}
   * @memberof RegisterUserInput
   */
  email: string;
  /**
   * The user's first name.
   * @type {string}
   * @memberof RegisterUserInput
   */
  firstName: string;
  /**
   * The user's last name.
   * @type {string}
   * @memberof RegisterUserInput
   */
  lastName: string;
  /**
   * The user's unencrypted/unhashed password.
   * @type {string}
   * @memberof RegisterUserInput
   */
  password: string;
}

/**
 * Check if a given object implements the RegisterUserInput interface.
 */
export function instanceOfRegisterUserInput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "email" in value;
  isInstance = isInstance && "firstName" in value;
  isInstance = isInstance && "lastName" in value;
  isInstance = isInstance && "password" in value;

  return isInstance;
}

export function RegisterUserInputFromJSON(json: any): RegisterUserInput {
  return RegisterUserInputFromJSONTyped(json, false);
}

export function RegisterUserInputFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RegisterUserInput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    email: json["email"],
    firstName: json["firstName"],
    lastName: json["lastName"],
    password: json["password"],
  };
}

export function RegisterUserInputToJSON(value?: RegisterUserInput | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    email: value.email,
    firstName: value.firstName,
    lastName: value.lastName,
    password: value.password,
  };
}
