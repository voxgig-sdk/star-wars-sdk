import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { PeopleList } from '../StarWarsTypes';
declare class PeopleListEntity extends StarWarsEntityBase<PeopleList> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: PeopleListEntity): PeopleListEntity;
}
export { PeopleListEntity };
