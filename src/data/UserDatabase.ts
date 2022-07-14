import { User } from "../model/User";
import { FindByEmailRes } from "../model/UserTypes";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public insertUser = async (user: User): Promise<void> => {
    try {
      await UserDatabase.connection("user_LAMA").insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public findUserByEmail = async (email: string) => {
    try {
      const result: FindByEmailRes = await UserDatabase.connection("user_LAMA")
        .select("*")
        .where({ email });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
