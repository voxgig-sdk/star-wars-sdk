import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Person, PersonLoadMatch, PersonListMatch } from '../StarWarsTypes';
declare class PersonEntity extends StarWarsEntityBase<Person> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: PersonEntity): PersonEntity;
    load(this: any, reqmatch?: PersonLoadMatch, ctrl?: Control): Promise<PersonEntity>;
    list(this: any, reqmatch?: PersonListMatch, ctrl?: Control): Promise<PersonEntity[]>;
}
export { PersonEntity };
