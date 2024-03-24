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
import type { ExperimentWithDatapointRunsDto } from './ExperimentWithDatapointRunsDto';
import {
    ExperimentWithDatapointRunsDtoFromJSON,
    ExperimentWithDatapointRunsDtoFromJSONTyped,
    ExperimentWithDatapointRunsDtoToJSON,
} from './ExperimentWithDatapointRunsDto';

/**
 * 
 * @export
 * @interface PaginatedExperimentWithDatapointRunsDto
 */
export interface PaginatedExperimentWithDatapointRunsDto {
    /**
     * 
     * @type {ExperimentWithDatapointRunsDto}
     * @memberof PaginatedExperimentWithDatapointRunsDto
     */
    experiment: ExperimentWithDatapointRunsDto;
    /**
     * 
     * @type {number}
     * @memberof PaginatedExperimentWithDatapointRunsDto
     */
    totalDatapointRuns: number;
}

/**
 * Check if a given object implements the PaginatedExperimentWithDatapointRunsDto interface.
 */
export function instanceOfPaginatedExperimentWithDatapointRunsDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "experiment" in value;
    isInstance = isInstance && "totalDatapointRuns" in value;

    return isInstance;
}

export function PaginatedExperimentWithDatapointRunsDtoFromJSON(json: any): PaginatedExperimentWithDatapointRunsDto {
    return PaginatedExperimentWithDatapointRunsDtoFromJSONTyped(json, false);
}

export function PaginatedExperimentWithDatapointRunsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedExperimentWithDatapointRunsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'experiment': ExperimentWithDatapointRunsDtoFromJSON(json['experiment']),
        'totalDatapointRuns': json['totalDatapointRuns'],
    };
}

export function PaginatedExperimentWithDatapointRunsDtoToJSON(value?: PaginatedExperimentWithDatapointRunsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'experiment': ExperimentWithDatapointRunsDtoToJSON(value.experiment),
        'totalDatapointRuns': value.totalDatapointRuns,
    };
}
