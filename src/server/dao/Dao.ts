interface IUser {}

export type ValidateUser = (username: string, password: string) => IUser | never

class DBEngine {}
export abstract class Dao {
  static init = async (db = new DBEngine()): Promise<RootDao> => {
    return new RootDao(db)
  }

  constructor(protected readonly db: DBEngine) {}
}

export class UserDao extends Dao {
  constructor(db: DBEngine) {
    super(db)
  }

  public readonly validateUser: ValidateUser = (username, password) => {
    return {}
  }
}

export class RootDao extends Dao {
  public readonly user = new UserDao(this.db)
}
