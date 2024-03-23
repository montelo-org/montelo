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
  DatapointRunWithExperimentDto,
  TraceWithLogsDto,
} from '../models/index';
import {
    DatapointRunWithExperimentDtoFromJSON,
    DatapointRunWithExperimentDtoToJSON,
    TraceWithLogsDtoFromJSON,
    TraceWithLogsDtoToJSON,
} from '../models/index';

export interface DatapointRunControllerGetDatapointTraceRequest {
    datapointRunId: string;
}

export interface DatapointRunControllerGetDatapointWithExperimentRequest {
    datapointRunId: string;
}

/**
 * 
 */
export class DatapointRunApi extends runtime.BaseAPI {

    /**
     */
    async datapointRunControllerGetDatapointTraceRaw(requestParameters: DatapointRunControllerGetDatapointTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TraceWithLogsDto>> {
        if (requestParameters.datapointRunId === null || requestParameters.datapointRunId === undefined) {
            throw new runtime.RequiredError('datapointRunId','Required parameter requestParameters.datapointRunId was null or undefined when calling datapointRunControllerGetDatapointTrace.');
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
            path: `/datapoint-run/{datapointRunId}/trace`.replace(`{${"datapointRunId"}}`, encodeURIComponent(String(requestParameters.datapointRunId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TraceWithLogsDtoFromJSON(jsonValue));
    }

    /**
     */
    async datapointRunControllerGetDatapointTrace(requestParameters: DatapointRunControllerGetDatapointTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TraceWithLogsDto> {
        const response = await this.datapointRunControllerGetDatapointTraceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async datapointRunControllerGetDatapointWithExperimentRaw(requestParameters: DatapointRunControllerGetDatapointWithExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DatapointRunWithExperimentDto>> {
        if (requestParameters.datapointRunId === null || requestParameters.datapointRunId === undefined) {
            throw new runtime.RequiredError('datapointRunId','Required parameter requestParameters.datapointRunId was null or undefined when calling datapointRunControllerGetDatapointWithExperiment.');
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
            path: `/datapoint-run/{datapointRunId}`.replace(`{${"datapointRunId"}}`, encodeURIComponent(String(requestParameters.datapointRunId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DatapointRunWithExperimentDtoFromJSON(jsonValue));
    }

    /**
     */
    async datapointRunControllerGetDatapointWithExperiment(requestParameters: DatapointRunControllerGetDatapointWithExperimentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DatapointRunWithExperimentDto> {
        const response = await this.datapointRunControllerGetDatapointWithExperimentRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
