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
  LogsDto,
} from '../models/index';
import {
    LogsDtoFromJSON,
    LogsDtoToJSON,
} from '../models/index';

export interface LogControllerGetAllRequest {
    envId: string;
    take?: string;
    skip?: string;
    sortColumn?: string;
    sortDirection?: string;
    searchQuery?: string;
    startDate?: string;
    lastTimestamp?: string;
}

/**
 * 
 */
export class LogApi extends runtime.BaseAPI {

    /**
     */
    async logControllerGetAllRaw(requestParameters: LogControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LogsDto>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling logControllerGetAll.');
        }

        const queryParameters: any = {};

        if (requestParameters.take !== undefined) {
            queryParameters['take'] = requestParameters.take;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['skip'] = requestParameters.skip;
        }

        if (requestParameters.sortColumn !== undefined) {
            queryParameters['sortColumn'] = requestParameters.sortColumn;
        }

        if (requestParameters.sortDirection !== undefined) {
            queryParameters['sortDirection'] = requestParameters.sortDirection;
        }

        if (requestParameters.searchQuery !== undefined) {
            queryParameters['searchQuery'] = requestParameters.searchQuery;
        }

        if (requestParameters.startDate !== undefined) {
            queryParameters['startDate'] = requestParameters.startDate;
        }

        if (requestParameters.lastTimestamp !== undefined) {
            queryParameters['lastTimestamp'] = requestParameters.lastTimestamp;
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
            path: `/env/{envId}/log`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LogsDtoFromJSON(jsonValue));
    }

    /**
     */
    async logControllerGetAll(requestParameters: LogControllerGetAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LogsDto> {
        const response = await this.logControllerGetAllRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
