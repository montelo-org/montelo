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
import type { CreateLogInput } from "../models/index";
import { CreateLogInputFromJSON, CreateLogInputToJSON } from "../models/index";
import * as runtime from "../runtime";

export interface LogsControllerCreateLogRequest {
  createLogInput: CreateLogInput;
}

/**
 *
 */
export class LogsApi extends runtime.BaseAPI {
  /**
   */
  async logsControllerCreateLogRaw(
    requestParameters: LogsControllerCreateLogRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.createLogInput === null || requestParameters.createLogInput === undefined) {
      throw new runtime.RequiredError(
        "createLogInput",
        "Required parameter requestParameters.createLogInput was null or undefined when calling logsControllerCreateLog.",
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("bearer", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/logs`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateLogInputToJSON(requestParameters.createLogInput),
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async logsControllerCreateLog(
    requestParameters: LogsControllerCreateLogRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.logsControllerCreateLogRaw(requestParameters, initOverrides);
  }
}
