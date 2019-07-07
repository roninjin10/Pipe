import { Service } from './Service'
import { Dao } from './dao/Dao'

export class AppServices extends Array<Service> {
  constructor(readonly dao: Dao) {
    super()
  }
}
