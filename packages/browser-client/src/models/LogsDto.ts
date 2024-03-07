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

import { exists, mapValues } from '../runtime';
import type { LogDto } from './LogDto';
import {
    LogDtoFromJSON,
    LogDtoFromJSONTyped,
    LogDtoToJSON,
} from './LogDto';

/**
 * 
 * @export
 * @interface LogsDto
 */
export interface LogsDto {
    /**
     * 
     * @type {Array<LogDto>}
     * @memberof LogsDto
     */
    logs: Array<LogDto>;
    /**
     * 
     * @type {number}
     * @memberof LogsDto
     */
    totalCount: number;
}

/**
 * Check if a given object implements the LogsDto interface.
 */
export function instanceOfLogsDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "logs" in value;
    isInstance = isInstance && "totalCount" in value;

    return isInstance;
}

export function LogsDtoFromJSON(json: any): LogsDto {
    return LogsDtoFromJSONTyped(json, false);
}

export function LogsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'logs': ((json['logs'] as Array<any>).map(LogDtoFromJSON)),
        'totalCount': json['totalCount'],
    };
}

export function LogsDtoToJSON(value?: LogsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'logs': ((value.logs as Array<any>).map(LogDtoToJSON)),
        'totalCount': value.totalCount,
    };
}
