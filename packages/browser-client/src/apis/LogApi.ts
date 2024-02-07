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
import type { LogDto } from "../models/index";
import { LogDtoFromJSON, LogDtoToJSON } from "../models/index";
import * as runtime from "../runtime";

export interface LogControllerGetAllRequest {
  envId: string;
}

/**
 *
 */
export class LogApi extends runtime.BaseAPI {
  /**
   */
  async logControllerGetAllRaw(
    requestParameters: LogControllerGetAllRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<LogDto>>> {
    if (requestParameters.envId === null || requestParameters.envId === undefined) {
      throw new runtime.RequiredError(
        "envId",
        "Required parameter requestParameters.envId was null or undefined when calling logControllerGetAll.",
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearer", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/env/{envId}/log`.replace(
          `{${"envId"}}`,
          encodeURIComponent(String(requestParameters.envId)),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LogDtoFromJSON));
  }

  /**
   */
  async logControllerGetAll(
    requestParameters: LogControllerGetAllRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<LogDto>> {
    const response = await this.logControllerGetAllRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
