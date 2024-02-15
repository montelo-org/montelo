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
import type { EnvironmentDto } from './EnvironmentDto';
import {
    EnvironmentDtoFromJSON,
    EnvironmentDtoFromJSONTyped,
    EnvironmentDtoToJSON,
} from './EnvironmentDto';
import type { TeamDto } from './TeamDto';
import {
    TeamDtoFromJSON,
    TeamDtoFromJSONTyped,
    TeamDtoToJSON,
} from './TeamDto';

/**
 * 
 * @export
 * @interface FullProjectDto
 */
export interface FullProjectDto {
    /**
     * 
     * @type {string}
     * @memberof FullProjectDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FullProjectDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof FullProjectDto
     */
    teamId: string;
    /**
     * 
     * @type {TeamDto}
     * @memberof FullProjectDto
     */
    team: TeamDto;
    /**
     * 
     * @type {Array<EnvironmentDto>}
     * @memberof FullProjectDto
     */
    environments: Array<EnvironmentDto>;
}

/**
 * Check if a given object implements the FullProjectDto interface.
 */
export function instanceOfFullProjectDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "teamId" in value;
    isInstance = isInstance && "team" in value;
    isInstance = isInstance && "environments" in value;

    return isInstance;
}

export function FullProjectDtoFromJSON(json: any): FullProjectDto {
    return FullProjectDtoFromJSONTyped(json, false);
}

export function FullProjectDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullProjectDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'teamId': json['teamId'],
        'team': TeamDtoFromJSON(json['team']),
        'environments': ((json['environments'] as Array<any>).map(EnvironmentDtoFromJSON)),
    };
}

export function FullProjectDtoToJSON(value?: FullProjectDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'teamId': value.teamId,
        'team': TeamDtoToJSON(value.team),
        'environments': ((value.environments as Array<any>).map(EnvironmentDtoToJSON)),
    };
}

