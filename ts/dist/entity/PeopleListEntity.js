"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleListEntity = void 0;
const StarWarsEntityBase_1 = require("../StarWarsEntityBase");
// TODO: needs Entity superclass
class PeopleListEntity extends StarWarsEntityBase_1.StarWarsEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'people_list';
        this.name_ = 'people_list';
        this.Name = 'PeopleList';
    }
    make() {
        return new PeopleListEntity(this._client, this.entopts());
    }
}
exports.PeopleListEntity = PeopleListEntity;
//# sourceMappingURL=PeopleListEntity.js.map