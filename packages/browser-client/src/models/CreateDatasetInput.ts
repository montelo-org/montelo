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
 * @interface CreateDatasetInput
 */
export interface CreateDatasetInput {
    /**
     * 
     * @type {string}
     * @memberof CreateDatasetInput
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDatasetInput
     */
    description?: string;
    /**
     * 
     * @type {object}
     * @memberof CreateDatasetInput
     */
    inputSchema: object;
    /**
     * 
     * @type {object}
     * @memberof CreateDatasetInput
     */
    outputSchema: object;
}

/**
 * Check if a given object implements the CreateDatasetInput interface.
 */
export function instanceOfCreateDatasetInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "inputSchema" in value;
    isInstance = isInstance && "outputSchema" in value;

    return isInstance;
}

export function CreateDatasetInputFromJSON(json: any): CreateDatasetInput {
    return CreateDatasetInputFromJSONTyped(json, false);
}

export function CreateDatasetInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateDatasetInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'inputSchema': json['inputSchema'],
        'outputSchema': json['outputSchema'],
    };
}

export function CreateDatasetInputToJSON(value?: CreateDatasetInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'inputSchema': value.inputSchema,
        'outputSchema': value.outputSchema,
    };
}

