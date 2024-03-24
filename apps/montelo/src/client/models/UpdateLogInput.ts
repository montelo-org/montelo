/* tslint:disable */
/* eslint-disable */
/**
 * Montelo API SDK
 * This server handles creating traces and logs.
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
 * @interface UpdateLogInput
 */
export interface UpdateLogInput {
    /**
     * 
     * @type {object}
     * @memberof UpdateLogInput
     */
    updatePayload: object;
}

/**
 * Check if a given object implements the UpdateLogInput interface.
 */
export function instanceOfUpdateLogInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "updatePayload" in value;

    return isInstance;
}

export function UpdateLogInputFromJSON(json: any): UpdateLogInput {
    return UpdateLogInputFromJSONTyped(json, false);
}

export function UpdateLogInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateLogInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'updatePayload': json['updatePayload'],
    };
}

export function UpdateLogInputToJSON(value?: UpdateLogInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'updatePayload': value.updatePayload,
    };
}
