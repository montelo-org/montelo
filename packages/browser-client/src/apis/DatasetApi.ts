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
  CreateDatasetInput,
  DatasetDto,
  DeleteSuccessDto,
  ExperimentDto,
  FullDatasetWithCountDto,
} from '../models/index';
import {
    CreateDatasetInputFromJSON,
    CreateDatasetInputToJSON,
    DatasetDtoFromJSON,
    DatasetDtoToJSON,
    DeleteSuccessDtoFromJSON,
    DeleteSuccessDtoToJSON,
    ExperimentDtoFromJSON,
    ExperimentDtoToJSON,
    FullDatasetWithCountDtoFromJSON,
    FullDatasetWithCountDtoToJSON,
} from '../models/index';

export interface DatasetControllerCreateDatasetRequest {
    envId: string;
    createDatasetInput: CreateDatasetInput;
}

export interface DatasetControllerDeleteDatasetRequest {
    datasetId: string;
}

export interface DatasetControllerGetAllDatasetsForEnvRequest {
    envId: string;
}

export interface DatasetControllerGetDatasetRecentExperimentsRequest {
    datasetId: string;
}

export interface DatasetControllerGetDatasetWithDatapointsRequest {
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
    async datasetControllerCreateDatasetRaw(requestParameters: DatasetControllerCreateDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DatasetDto>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling datasetControllerCreateDataset.');
        }

        if (requestParameters.createDatasetInput === null || requestParameters.createDatasetInput === undefined) {
            throw new runtime.RequiredError('createDatasetInput','Required parameter requestParameters.createDatasetInput was null or undefined when calling datasetControllerCreateDataset.');
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
            path: `/env/{envId}/dataset`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDatasetInputToJSON(requestParameters.createDatasetInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DatasetDtoFromJSON(jsonValue));
    }

    /**
     */
    async datasetControllerCreateDataset(requestParameters: DatasetControllerCreateDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DatasetDto> {
        const response = await this.datasetControllerCreateDatasetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerDeleteDatasetRaw(requestParameters: DatasetControllerDeleteDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeleteSuccessDto>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datasetControllerDeleteDataset.');
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
    async datasetControllerDeleteDataset(requestParameters: DatasetControllerDeleteDatasetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeleteSuccessDto> {
        const response = await this.datasetControllerDeleteDatasetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerGetAllDatasetsForEnvRaw(requestParameters: DatasetControllerGetAllDatasetsForEnvRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<DatasetDto>>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling datasetControllerGetAllDatasetsForEnv.');
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
            path: `/env/{envId}/dataset`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DatasetDtoFromJSON));
    }

    /**
     */
    async datasetControllerGetAllDatasetsForEnv(requestParameters: DatasetControllerGetAllDatasetsForEnvRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<DatasetDto>> {
        const response = await this.datasetControllerGetAllDatasetsForEnvRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerGetDatasetRecentExperimentsRaw(requestParameters: DatasetControllerGetDatasetRecentExperimentsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ExperimentDto>>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datasetControllerGetDatasetRecentExperiments.');
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
            path: `/dataset/{datasetId}/experiments`.replace(`{${"datasetId"}}`, encodeURIComponent(String(requestParameters.datasetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ExperimentDtoFromJSON));
    }

    /**
     */
    async datasetControllerGetDatasetRecentExperiments(requestParameters: DatasetControllerGetDatasetRecentExperimentsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ExperimentDto>> {
        const response = await this.datasetControllerGetDatasetRecentExperimentsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datasetControllerGetDatasetWithDatapointsRaw(requestParameters: DatasetControllerGetDatasetWithDatapointsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FullDatasetWithCountDto>> {
        if (requestParameters.datasetId === null || requestParameters.datasetId === undefined) {
            throw new runtime.RequiredError('datasetId','Required parameter requestParameters.datasetId was null or undefined when calling datasetControllerGetDatasetWithDatapoints.');
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
    async datasetControllerGetDatasetWithDatapoints(requestParameters: DatasetControllerGetDatasetWithDatapointsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FullDatasetWithCountDto> {
        const response = await this.datasetControllerGetDatasetWithDatapointsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
