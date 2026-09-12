import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Species, SpeciesLoadMatch, SpeciesListMatch } from '../StarWarsTypes';
declare class SpeciesEntity extends StarWarsEntityBase<Species> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: SpeciesEntity): SpeciesEntity;
    load(this: any, reqmatch?: SpeciesLoadMatch, ctrl?: Control): Promise<SpeciesEntity>;
    list(this: any, reqmatch?: SpeciesListMatch, ctrl?: Control): Promise<SpeciesEntity[]>;
}
export { SpeciesEntity };
