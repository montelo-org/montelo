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
/**
 * 
 * @export
 * @interface CreateExperimentInput
 */
export interface CreateExperimentInput {
    /**
     * 
     * @type {string}
     * @memberof CreateExperimentInput
     */
    datasetId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExperimentInput
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExperimentInput
     */
    description?: string;
}

/**
 * Check if a given object implements the CreateExperimentInput interface.
 */
export function instanceOfCreateExperimentInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "datasetId" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function CreateExperimentInputFromJSON(json: any): CreateExperimentInput {
    return CreateExperimentInputFromJSONTyped(json, false);
}

export function CreateExperimentInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateExperimentInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'datasetId': json['datasetId'],
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function CreateExperimentInputToJSON(value?: CreateExperimentInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'datasetId': value.datasetId,
        'name': value.name,
        'description': value.description,
    };
}

