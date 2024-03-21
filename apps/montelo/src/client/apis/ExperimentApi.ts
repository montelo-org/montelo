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
  CreateExperimentInput,
  CreateRunInput,
  EventQueuedDto,
  ExperimentDto,
  FullExperimentDto,
} from '../models/index';
import {
    CreateExperimentInputFromJSON,
    CreateExperimentInputToJSON,
    CreateRunInputFromJSON,
    CreateRunInputToJSON,
    EventQueuedDtoFromJSON,
    EventQueuedDtoToJSON,
    ExperimentDtoFromJSON,
    ExperimentDtoToJSON,
    FullExperimentDtoFromJSON,
    FullExperimentDtoToJSON,
} from '../models/index';

export interface ExperimentControllerCreateRequest {
    datasetSlug: string;
    createExperimentInput: CreateExperimentInput;
}

export interface ExperimentControllerGetFullExperimentRequest {
    experimentId: string;
}

export interface ExperimentControllerRunRequest {
    createRunInput: CreateRunInput;
}

/**
 * 
 */
export class ExperimentApi extends runtime.BaseAPI {

    /**
     */
    async experimentControllerCreateRaw(requestParameters: ExperimentControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExperimentDto>> {
        if (requestParameters.datasetSlug === null || requestParameters.datasetSlug === undefined) {
            throw new runtime.RequiredError('datasetSlug','Required parameter requestParameters.datasetSlug was null or undefined when calling experimentControllerCreate.');
        }

        if (requestParameters.createExperimentInput === null || requestParameters.createExperimentInput === undefined) {
            throw new runtime.RequiredError('createExperimentInput','Required parameter requestParameters.createExperimentInput was null or undefined when calling experimentControllerCreate.');
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
            path: `/dataset/{datasetSlug}/experiment`.replace(`{${"datasetSlug"}}`, encodeURIComponent(String(requestParameters.datasetSlug))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateExperimentInputToJSON(requestParameters.createExperimentInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExperimentDtoFromJSON(jsonValue));
    }

    /**
     */
    async experimentControllerCreate(requestParameters: ExperimentControllerCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExperimentDto> {
        const response = await this.experimentControllerCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async experimentControllerGetFullExperimentRaw(requestParameters: ExperimentControllerGetFullExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FullExperimentDto>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling experimentControllerGetFullExperiment.');
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
            path: `/experiment/{experimentId}`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FullExperimentDtoFromJSON(jsonValue));
    }

    /**
     */
    async experimentControllerGetFullExperiment(requestParameters: ExperimentControllerGetFullExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FullExperimentDto> {
        const response = await this.experimentControllerGetFullExperimentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async experimentControllerRunRaw(requestParameters: ExperimentControllerRunRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventQueuedDto>> {
        if (requestParameters.createRunInput === null || requestParameters.createRunInput === undefined) {
            throw new runtime.RequiredError('createRunInput','Required parameter requestParameters.createRunInput was null or undefined when calling experimentControllerRun.');
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
            path: `/experiment/run`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateRunInputToJSON(requestParameters.createRunInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventQueuedDtoFromJSON(jsonValue));
    }

    /**
     */
    async experimentControllerRun(requestParameters: ExperimentControllerRunRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventQueuedDto> {
        const response = await this.experimentControllerRunRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
