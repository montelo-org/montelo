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
import type { AddToDatasetInput, DatapointDto } from "../models/index";
import {
  AddToDatasetInputFromJSON,
  AddToDatasetInputToJSON,
  DatapointDtoFromJSON,
  DatapointDtoToJSON,
} from "../models/index";
import * as runtime from "../runtime";

export interface DatapointControllerAddToDatasetRequest {
  datasetSlug: string;
  addToDatasetInput: AddToDatasetInput;
}

/**
 *
 */
export class DatapointApi extends runtime.BaseAPI {
  /**
   */
  async datapointControllerAddToDatasetRaw(
    requestParameters: DatapointControllerAddToDatasetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<DatapointDto>> {
    if (requestParameters.datasetSlug === null || requestParameters.datasetSlug === undefined) {
      throw new runtime.RequiredError(
        "datasetSlug",
        "Required parameter requestParameters.datasetSlug was null or undefined when calling datapointControllerAddToDataset.",
      );
    }

    if (requestParameters.addToDatasetInput === null || requestParameters.addToDatasetInput === undefined) {
      throw new runtime.RequiredError(
        "addToDatasetInput",
        "Required parameter requestParameters.addToDatasetInput was null or undefined when calling datapointControllerAddToDataset.",
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
        path: `/dataset/{datasetSlug}/datapoint`.replace(
          `{${"datasetSlug"}}`,
          encodeURIComponent(String(requestParameters.datasetSlug)),
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: AddToDatasetInputToJSON(requestParameters.addToDatasetInput),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => DatapointDtoFromJSON(jsonValue));
  }

  /**
   */
  async datapointControllerAddToDataset(
    requestParameters: DatapointControllerAddToDatasetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<DatapointDto> {
    const response = await this.datapointControllerAddToDatasetRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
