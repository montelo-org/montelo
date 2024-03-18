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


import * as runtime from '../runtime';
import type {
  AddToDatasetInput,
  DatapointDto,
} from '../models/index';
import {
    AddToDatasetInputFromJSON,
    AddToDatasetInputToJSON,
    DatapointDtoFromJSON,
    DatapointDtoToJSON,
} from '../models/index';

export interface DatapointControllerAddToDatasetRequest {
    datasetId: string;
    addToDatasetInput: AddToDatasetInput;
}

export interface DatapointControllerGetAllRequest {
    datasetId: string;
}

export interface DatapointControllerRemoveFromDatasetRequest {
    datasetId: string;
    datapointId: string;
}

/**
 * 
 */
export class DatapointApi extends runtime.BaseAPI {

    /**
     */
    async datapointControllerAddToDatasetRaw(requestParameters: DatapointControllerAddToDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DatapointDto>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datapointControllerAddToDataset.');
        }

        if (requestParameters.addToDatasetInput === null || requestParameters.addToDatasetInput === undefined) {
            throw new runtime.RequiredError('addToDatasetInput','Required parameter requestParameters.addToDatasetInput was null or undefined when calling datapointControllerAddToDataset.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/dataset/{datasetId}/datapoint`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddToDatasetInputToJSON(requestParameters.addToDatasetInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DatapointDtoFromJSON(jsonValue));
    }

    /**
     */
    async datapointControllerAddToDataset(requestParameters: DatapointControllerAddToDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DatapointDto> {
        const response = await this.datapointControllerAddToDatasetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datapointControllerGetAllRaw(requestParameters: DatapointControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<DatapointDto>>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datapointControllerGetAll.');
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
        const response = await this.request({
            path: `/dataset/{datasetId}/datapoint`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DatapointDtoFromJSON));
    }

    /**
     */
    async datapointControllerGetAll(requestParameters: DatapointControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<DatapointDto>> {
        const response = await this.datapointControllerGetAllRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datapointControllerRemoveFromDatasetRaw(requestParameters: DatapointControllerRemoveFromDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datapointControllerRemoveFromDataset.');
        }

        if (requestParameters.datapointId === null || requestParameters.datapointId === undefined) {
            throw new runtime.RequiredError('datapointId','Required parameter requestParameters.datapointId was null or undefined when calling datapointControllerRemoveFromDataset.');
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
        const response = await this.request({
            path: `/dataset/{datasetId}/datapoint/{datapointId}`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))).replace(`{${"datapointId"}}`, encodeURIComponent(String(requestParameters.datapointId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async datapointControllerRemoveFromDataset(requestParameters: DatapointControllerRemoveFromDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.datapointControllerRemoveFromDatasetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}