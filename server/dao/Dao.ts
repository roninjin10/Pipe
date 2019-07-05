import { DBEngine } from "./dbEngine";
import { UserDao } from "./UserDao";

export abstract class Dao {
  static init = async (db = new DBEngine()): Promise<IRootDao> => {
    return new RootDao(db);
  };

  constructor(protected readonly db: DBEngine) {}
}

export interface IRootDao extends RootDao {}
class RootDao extends Dao {
  public readonly user = new UserDao(this.db);
}
