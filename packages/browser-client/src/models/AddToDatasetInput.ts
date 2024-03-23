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
 * @interface AddToDatasetInput
 */
export interface AddToDatasetInput {
    /**
     * 
     * @type {object}
     * @memberof AddToDatasetInput
     */
    input: object;
    /**
     * 
     * @type {object}
     * @memberof AddToDatasetInput
     */
    expectedOutput: object;
}

/**
 * Check if a given object implements the AddToDatasetInput interface.
 */
export function instanceOfAddToDatasetInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "input" in value;
    isInstance = isInstance && "expectedOutput" in value;

    return isInstance;
}

export function AddToDatasetInputFromJSON(json: any): AddToDatasetInput {
    return AddToDatasetInputFromJSONTyped(json, false);
}

export function AddToDatasetInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddToDatasetInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'input': json['input'],
        'expectedOutput': json['expectedOutput'],
    };
}

export function AddToDatasetInputToJSON(value?: AddToDatasetInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'input': value.input,
        'expectedOutput': value.expectedOutput,
    };
}

