import { StarWarsEntityBase } from '../StarWarsEntityBase';
import type { StarWarsSDK } from '../StarWarsSDK';
import type { Control } from '../types';
import type { Vehicle, VehicleLoadMatch, VehicleListMatch } from '../StarWarsTypes';
declare class VehicleEntity extends StarWarsEntityBase<Vehicle> {
    constructor(client: StarWarsSDK, entopts: any);
    make(this: VehicleEntity): VehicleEntity;
    load(this: any, reqmatch?: VehicleLoadMatch, ctrl?: Control): Promise<VehicleEntity>;
    list(this: any, reqmatch?: VehicleListMatch, ctrl?: Control): Promise<VehicleEntity[]>;
}
export { VehicleEntity };
