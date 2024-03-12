/* tslint:disable */
/* eslint-disable */
/**
 * Montelo Log Server
 * This server handles creating traces and traces.
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
  HealthControllerCheck200Response,
  HealthControllerCheck503Response,
} from '../models/index';
import {
    HealthControllerCheck200ResponseFromJSON,
    HealthControllerCheck200ResponseToJSON,
    HealthControllerCheck503ResponseFromJSON,
    HealthControllerCheck503ResponseToJSON,
} from '../models/index';

/**
 * 
 */
export class HealthApi extends runtime.BaseAPI {

    /**
     */
    async healthControllerCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HealthControllerCheck200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HealthControllerCheck200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async healthControllerCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HealthControllerCheck200Response> {
        const response = await this.healthControllerCheckRaw(initOverrides);
        return await response.value();
    }

}
