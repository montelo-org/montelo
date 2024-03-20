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

import { exists, mapValues } from '../runtime';
import type { FullDatasetDto } from './FullDatasetDto';
import {
    FullDatasetDtoFromJSON,
    FullDatasetDtoFromJSONTyped,
    FullDatasetDtoToJSON,
} from './FullDatasetDto';

/**
 * 
 * @export
 * @interface FullDatasetWithCountDto
 */
export interface FullDatasetWithCountDto {
    /**
     * 
     * @type {FullDatasetDto}
     * @memberof FullDatasetWithCountDto
     */
    dataset: FullDatasetDto;
    /**
     * 
     * @type {number}
     * @memberof FullDatasetWithCountDto
     */
    totalCount: number;
}

/**
 * Check if a given object implements the FullDatasetWithCountDto interface.
 */
export function instanceOfFullDatasetWithCountDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "dataset" in value;
    isInstance = isInstance && "totalCount" in value;

    return isInstance;
}

export function FullDatasetWithCountDtoFromJSON(json: any): FullDatasetWithCountDto {
    return FullDatasetWithCountDtoFromJSONTyped(json, false);
}

export function FullDatasetWithCountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullDatasetWithCountDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dataset': FullDatasetDtoFromJSON(json['dataset']),
        'totalCount': json['totalCount'],
    };
}

export function FullDatasetWithCountDtoToJSON(value?: FullDatasetWithCountDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dataset': FullDatasetDtoToJSON(value.dataset),
        'totalCount': value.totalCount,
    };
}

