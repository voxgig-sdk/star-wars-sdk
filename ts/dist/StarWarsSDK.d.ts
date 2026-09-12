import { FilmEntity } from './entity/FilmEntity';
import { PeopleListEntity } from './entity/PeopleListEntity';
import { PersonEntity } from './entity/PersonEntity';
import { PlanetEntity } from './entity/PlanetEntity';
import { SpeciesEntity } from './entity/SpeciesEntity';
import { StarshipEntity } from './entity/StarshipEntity';
import { VehicleEntity } from './entity/VehicleEntity';
export type * from './StarWarsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { StarWarsEntityBase } from './StarWarsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class StarWarsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Film(entopts?: Record<string, any>): FilmEntity;
    PeopleList(entopts?: Record<string, any>): PeopleListEntity;
    Person(entopts?: Record<string, any>): PersonEntity;
    Planet(entopts?: Record<string, any>): PlanetEntity;
    Species(entopts?: Record<string, any>): SpeciesEntity;
    Starship(entopts?: Record<string, any>): StarshipEntity;
    Vehicle(entopts?: Record<string, any>): VehicleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): StarWarsSDK;
    tester(testopts?: any, sdkopts?: any): StarWarsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof StarWarsSDK;
export { stdutil, config, BaseFeature, StarWarsEntityBase, StarWarsSDK, SDK, };
