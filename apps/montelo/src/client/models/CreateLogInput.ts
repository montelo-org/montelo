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
import type { LogInput } from './LogInput';
import {
    LogInputFromJSON,
    LogInputFromJSONTyped,
    LogInputToJSON,
} from './LogInput';
import type { TraceInput } from './TraceInput';
import {
    TraceInputFromJSON,
    TraceInputFromJSONTyped,
    TraceInputToJSON,
} from './TraceInput';

/**
 * 
 * @export
 * @interface CreateLogInput
 */
export interface CreateLogInput {
    /**
     * 
     * @type {LogInput}
     * @memberof CreateLogInput
     */
    log: LogInput;
    /**
     * 
     * @type {TraceInput}
     * @memberof CreateLogInput
     */
    trace?: TraceInput;
}

/**
 * Check if a given object implements the CreateLogInput interface.
 */
export function instanceOfCreateLogInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "log" in value;

    return isInstance;
}

export function CreateLogInputFromJSON(json: any): CreateLogInput {
    return CreateLogInputFromJSONTyped(json, false);
}

export function CreateLogInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateLogInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'log': LogInputFromJSON(json['log']),
        'trace': !exists(json, 'trace') ? undefined : TraceInputFromJSON(json['trace']),
    };
}

export function CreateLogInputToJSON(value?: CreateLogInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'log': LogInputToJSON(value.log),
        'trace': TraceInputToJSON(value.trace),
    };
}

