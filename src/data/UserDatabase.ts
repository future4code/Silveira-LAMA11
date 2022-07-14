import { User } from "../model/User";
import { FindByEmailRes } from "../model/UserTypes";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public insertUser = async (newUser: User): Promise<void> => {
    try {
      await BaseDatabase.connection("user_LAMA").insert({
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
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

      return result[0] && User.toUserModel(result[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
