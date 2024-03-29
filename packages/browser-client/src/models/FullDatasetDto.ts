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
import type { DatapointDto } from './DatapointDto';
import {
    DatapointDtoFromJSON,
    DatapointDtoFromJSONTyped,
    DatapointDtoToJSON,
} from './DatapointDto';

/**
 * 
 * @export
 * @interface FullDatasetDto
 */
export interface FullDatasetDto {
    /**
     * 
     * @type {string}
     * @memberof FullDatasetDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FullDatasetDto
     */
    envId: string;
    /**
     * 
     * @type {string}
     * @memberof FullDatasetDto
     */
    slug: string;
    /**
     * 
     * @type {string}
     * @memberof FullDatasetDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof FullDatasetDto
     */
    description?: string;
    /**
     * 
     * @type {object}
     * @memberof FullDatasetDto
     */
    inputSchema: object;
    /**
     * 
     * @type {object}
     * @memberof FullDatasetDto
     */
    outputSchema: object;
    /**
     * 
     * @type {Array<DatapointDto>}
     * @memberof FullDatasetDto
     */
    datapoints: Array<DatapointDto>;
}

/**
 * Check if a given object implements the FullDatasetDto interface.
 */
export function instanceOfFullDatasetDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "envId" in value;
    isInstance = isInstance && "slug" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "inputSchema" in value;
    isInstance = isInstance && "outputSchema" in value;
    isInstance = isInstance && "datapoints" in value;

    return isInstance;
}

export function FullDatasetDtoFromJSON(json: any): FullDatasetDto {
    return FullDatasetDtoFromJSONTyped(json, false);
}

export function FullDatasetDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullDatasetDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'envId': json['envId'],
        'slug': json['slug'],
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'inputSchema': json['inputSchema'],
        'outputSchema': json['outputSchema'],
        'datapoints': ((json['datapoints'] as Array<any>).map(DatapointDtoFromJSON)),
    };
}

export function FullDatasetDtoToJSON(value?: FullDatasetDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'envId': value.envId,
        'slug': value.slug,
        'name': value.name,
        'description': value.description,
        'inputSchema': value.inputSchema,
        'outputSchema': value.outputSchema,
        'datapoints': ((value.datapoints as Array<any>).map(DatapointDtoToJSON)),
    };
}

