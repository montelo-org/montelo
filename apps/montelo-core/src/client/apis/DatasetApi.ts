/* tslint:disable */
/* eslint-disable */
/**
 * Montelo API SDK
 * This server handles creating traces and logs.
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
  CreateDatasetInput,
  DatasetDto,
  DeleteSuccessDto,
  FullDatasetWithCountDto,
} from '../models/index';
import {
    CreateDatasetInputFromJSON,
    CreateDatasetInputToJSON,
    DatasetDtoFromJSON,
    DatasetDtoToJSON,
    DeleteSuccessDtoFromJSON,
    DeleteSuccessDtoToJSON,
    FullDatasetWithCountDtoFromJSON,
    FullDatasetWithCountDtoToJSON,
} from '../models/index';

export interface DatasetControllerCreateRequest {
    createDatasetInput: CreateDatasetInput;
}

export interface DatasetControllerDeleteRequest {
    datasetId: string;
}

export interface DatasetControllerGetFullDatasetRequest {
    datasetId: string;
    take?: string;
    skip?: string;
}

/**
 * 
 */
export class DatasetApi extends runtime.BaseAPI {

    /**
     */
    async datasetControllerCreateRaw(requestParameters: DatasetControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DatasetDto>> {
        if (requestParameters.createDatasetInput === null || requestParameters.createDatasetInput === undefined) {
            throw new runtime.RequiredError('createDatasetInput','Required parameter requestParameters.createDatasetInput was null or undefined when calling datasetControllerCreate.');
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
            path: `/dataset`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDatasetInputToJSON(requestParameters.createDatasetInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DatasetDtoFromJSON(jsonValue));
    }

    /**
     */
    async datasetControllerCreate(requestParameters: DatasetControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DatasetDto> {
        const response = await this.datasetControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerDeleteRaw(requestParameters: DatasetControllerDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeleteSuccessDto>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datasetControllerDelete.');
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
            path: `/dataset/{datasetId}`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DeleteSuccessDtoFromJSON(jsonValue));
    }

    /**
     */
    async datasetControllerDelete(requestParameters: DatasetControllerDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeleteSuccessDto> {
        const response = await this.datasetControllerDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerGetAllDatasetsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<DatasetDto>>> {
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
            path: `/dataset`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DatasetDtoFromJSON));
    }

    /**
     */
    async datasetControllerGetAllDatasets(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<DatasetDto>> {
        const response = await this.datasetControllerGetAllDatasetsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerGetFullDatasetRaw(requestParameters: DatasetControllerGetFullDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FullDatasetWithCountDto>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datasetControllerGetFullDataset.');
        }

        const queryParameters: any = {};

        if (requestParameters.take !== undefined) {
            queryParameters['take'] = requestParameters.take;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/dataset/{datasetId}`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FullDatasetWithCountDtoFromJSON(jsonValue));
    }

    /**
     */
    async datasetControllerGetFullDataset(requestParameters: DatasetControllerGetFullDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FullDatasetWithCountDto> {
        const response = await this.datasetControllerGetFullDatasetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
