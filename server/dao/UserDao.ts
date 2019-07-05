import { Dao } from "./Dao";
import { DBEngine } from "./DbEngine";

interface IUser {}

export type VerifyLogin = (username: string, password: string) => IUser | never;

export class UserDao extends Dao {
  constructor(db: DBEngine) {
    super(db);
  }

  public readonly login: VerifyLogin = (username, password) => {
    return {};
  };
}
