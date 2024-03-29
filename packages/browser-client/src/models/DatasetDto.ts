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
/**
 * 
 * @export
 * @interface DatasetDto
 */
export interface DatasetDto {
    /**
     * 
     * @type {string}
     * @memberof DatasetDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof DatasetDto
     */
    envId: string;
    /**
     * 
     * @type {string}
     * @memberof DatasetDto
     */
    slug: string;
    /**
     * 
     * @type {string}
     * @memberof DatasetDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof DatasetDto
     */
    description?: string;
    /**
     * 
     * @type {object}
     * @memberof DatasetDto
     */
    inputSchema: object;
    /**
     * 
     * @type {object}
     * @memberof DatasetDto
     */
    outputSchema: object;
}

/**
 * Check if a given object implements the DatasetDto interface.
 */
export function instanceOfDatasetDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "envId" in value;
    isInstance = isInstance && "slug" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "inputSchema" in value;
    isInstance = isInstance && "outputSchema" in value;

    return isInstance;
}

export function DatasetDtoFromJSON(json: any): DatasetDto {
    return DatasetDtoFromJSONTyped(json, false);
}

export function DatasetDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DatasetDto {
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
    };
}

export function DatasetDtoToJSON(value?: DatasetDto | null): any {
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
    };
}

