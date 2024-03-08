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
import type { DeleteSuccessDto, TraceWithLogsDto } from "../models/index";
import {
  DeleteSuccessDtoFromJSON,
  DeleteSuccessDtoToJSON,
  TraceWithLogsDtoFromJSON,
  TraceWithLogsDtoToJSON,
} from "../models/index";
import * as runtime from "../runtime";

export interface TraceControllerDeleteRequest {
  traceId: string;
}

export interface TraceControllerGetAllRequest {
  traceId: string;
}

/**
 *
 */
export class TraceApi extends runtime.BaseAPI {
  /**
   */
  async traceControllerDeleteRaw(
    requestParameters: TraceControllerDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<DeleteSuccessDto>> {
    if (requestParameters.traceId === null || requestParameters.traceId === undefined) {
      throw new runtime.RequiredError(
        "traceId",
        "Required parameter requestParameters.traceId was null or undefined when calling traceControllerDelete.",
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
        path: `/trace/{traceId}`.replace(`{${"traceId"}}`, encodeURIComponent(String(requestParameters.traceId))),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DeleteSuccessDtoFromJSON(jsonValue));
  }

  /**
   */
  async traceControllerDelete(
    requestParameters: TraceControllerDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<DeleteSuccessDto> {
    const response = await this.traceControllerDeleteRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async traceControllerGetAllRaw(
    requestParameters: TraceControllerGetAllRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TraceWithLogsDto>> {
    if (requestParameters.traceId === null || requestParameters.traceId === undefined) {
      throw new runtime.RequiredError(
        "traceId",
        "Required parameter requestParameters.traceId was null or undefined when calling traceControllerGetAll.",
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
        path: `/trace/{traceId}`.replace(`{${"traceId"}}`, encodeURIComponent(String(requestParameters.traceId))),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TraceWithLogsDtoFromJSON(jsonValue));
  }

  /**
   */
  async traceControllerGetAll(
    requestParameters: TraceControllerGetAllRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TraceWithLogsDto> {
    const response = await this.traceControllerGetAllRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
