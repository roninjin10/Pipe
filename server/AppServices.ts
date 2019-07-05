import { Service } from "./Service";
import { IRootDao } from "./dao/Dao";

export class AppServices extends Array<Service> {
  constructor(readonly dao: IRootDao) {
    super();
  }
}
