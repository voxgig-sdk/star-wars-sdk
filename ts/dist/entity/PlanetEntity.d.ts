import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Planet, PlanetLoadMatch, PlanetListMatch } from '../StarWarsTypes';
declare class PlanetEntity extends StarWarsEntityBase<Planet> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: PlanetEntity): PlanetEntity;
    load(this: any, reqmatch?: PlanetLoadMatch, ctrl?: Control): Promise<PlanetEntity>;
    list(this: any, reqmatch?: PlanetListMatch, ctrl?: Control): Promise<PlanetEntity[]>;
}
export { PlanetEntity };
