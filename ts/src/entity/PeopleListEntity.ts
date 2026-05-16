
import { inspect } from 'node:util'

import { StarWarsEntityBase } from '../StarWarsEntityBase'

import type {
  StarWarsSDK,
} from '../StarWarsSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'


// TODO: needs Entity superclass
class PeopleListEntity extends StarWarsEntityBase {

  constructor(client: StarWarsSDK, entopts: any) {
    super(client, entopts)
    this.name = 'people_list'
    this.name_ = 'people_list'
    this.Name = 'PeopleList'
  }


  make(this: PeopleListEntity) {
    return new PeopleListEntity(this._client, this.entopts())
  }







}


export {
  PeopleListEntity
}
