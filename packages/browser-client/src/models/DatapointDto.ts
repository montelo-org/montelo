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
 * @interface DatapointDto
 */
export interface DatapointDto {
    /**
     * 
     * @type {string}
     * @memberof DatapointDto
     */
    id: string;
    /**
     * 
     * @type {object}
     * @memberof DatapointDto
     */
    input: object;
    /**
     * 
     * @type {object}
     * @memberof DatapointDto
     */
    expectedOutput: object;
    /**
     * 
     * @type {string}
     * @memberof DatapointDto
     */
    datasetId: string;
    /**
     * 
     * @type {string}
     * @memberof DatapointDto
     */
    createdAt: string;
}

/**
 * Check if a given object implements the DatapointDto interface.
 */
export function instanceOfDatapointDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "input" in value;
    isInstance = isInstance && "expectedOutput" in value;
    isInstance = isInstance && "datasetId" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function DatapointDtoFromJSON(json: any): DatapointDto {
    return DatapointDtoFromJSONTyped(json, false);
}

export function DatapointDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DatapointDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'input': json['input'],
        'expectedOutput': json['expectedOutput'],
        'datasetId': json['datasetId'],
        'createdAt': json['createdAt'],
    };
}

export function DatapointDtoToJSON(value?: DatapointDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'input': value.input,
        'expectedOutput': value.expectedOutput,
        'datasetId': value.datasetId,
        'createdAt': value.createdAt,
    };
}

