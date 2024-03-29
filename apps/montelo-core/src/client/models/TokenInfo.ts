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
 * @interface TokenInfo
 */
export interface TokenInfo {
    /**
     * 
     * @type {number}
     * @memberof TokenInfo
     */
    inputTokens: number;
    /**
     * 
     * @type {number}
     * @memberof TokenInfo
     */
    outputTokens: number;
    /**
     * 
     * @type {number}
     * @memberof TokenInfo
     */
    totalTokens: number;
}

/**
 * Check if a given object implements the TokenInfo interface.
 */
export function instanceOfTokenInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "inputTokens" in value;
    isInstance = isInstance && "outputTokens" in value;
    isInstance = isInstance && "totalTokens" in value;

    return isInstance;
}

export function TokenInfoFromJSON(json: any): TokenInfo {
    return TokenInfoFromJSONTyped(json, false);
}

export function TokenInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'inputTokens': json['inputTokens'],
        'outputTokens': json['outputTokens'],
        'totalTokens': json['totalTokens'],
    };
}

export function TokenInfoToJSON(value?: TokenInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'inputTokens': value.inputTokens,
        'outputTokens': value.outputTokens,
        'totalTokens': value.totalTokens,
    };
}

