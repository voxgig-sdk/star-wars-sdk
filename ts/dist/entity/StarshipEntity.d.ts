import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Starship, StarshipLoadMatch, StarshipListMatch } from '../StarWarsTypes';
declare class StarshipEntity extends StarWarsEntityBase<Starship> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: StarshipEntity): StarshipEntity;
    load(this: any, reqmatch?: StarshipLoadMatch, ctrl?: Control): Promise<StarshipEntity>;
    list(this: any, reqmatch?: StarshipListMatch, ctrl?: Control): Promise<StarshipEntity[]>;
}
export { StarshipEntity };
