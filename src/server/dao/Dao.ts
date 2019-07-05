interface IUser {}

export type VerifyLogin = (username: string, password: string) => IUser | never

class DBEngine {}
export abstract class Dao {
  static init = async (db = new DBEngine()): Promise<IRootDao> => {
    return new RootDao(db)
  }

  constructor(protected readonly db: DBEngine) {}
}

export class UserDao extends Dao {
  constructor(db: DBEngine) {
    super(db)
  }

  public readonly login: VerifyLogin = (username, password) => {
    return {}
  }
}

export interface IRootDao extends RootDao {}
class RootDao extends Dao {
  public readonly user = new UserDao(this.db)
}
