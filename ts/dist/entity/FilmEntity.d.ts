import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Film, FilmLoadMatch, FilmListMatch } from '../StarWarsTypes';
declare class FilmEntity extends StarWarsEntityBase<Film> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: FilmEntity): FilmEntity;
    load(this: any, reqmatch?: FilmLoadMatch, ctrl?: Control): Promise<FilmEntity>;
    list(this: any, reqmatch?: FilmListMatch, ctrl?: Control): Promise<FilmEntity[]>;
}
export { FilmEntity };
