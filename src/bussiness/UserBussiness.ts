import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserInputDTO, UserInputLoginDTO } from "../model/UserTypes";
import {
  CustomError,
  InvalidEmail,
  InvalidName,
  InvalidPassword,
  InvalidUser,
  InvalidUserRegister,
  PasswordTooShort,
} from "../error/customErrors";
import { AuthenticationData, User } from "../model/User";

export class UserBussiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  public createUser = async (inputUser: UserInputDTO) => {
    try {
      const { name, email, password, role } = inputUser;

      const userRegistered: any = this.userDatabase.findUserByEmail(email);

      if (!name || !email || !password || !role) {
        throw new CustomError(400, "Preencha os campos corretamente.");
      }

      if (name.length < 3) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (password.length < 8) {
        throw new PasswordTooShort();
      }

      const id: string = this.idGenerator.generate();
      const hashedPassword = await this.hashManager.hash(password);

      const newUser = new User(id, name, email, hashedPassword, role);

      if (userRegistered === newUser) {
        throw new CustomError(400, "Usuário já cadastrado.");
      }

      const payload: AuthenticationData = {
        id: newUser.getId(),
        role: newUser.getRole(),
      };

      await this.userDatabase.insertUser(newUser);

      const token = this.authenticator.generate(payload);

      return token;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  };

  public login = async (inputLogin: UserInputLoginDTO) => {
    try {
      const { email, password } = inputLogin;

      if (!email || !password) {
        throw new CustomError(422, "Preencha os campos corretamente.");
      }

      const user = await this.userDatabase.findUserByEmail(email);

      if (!user) {
        throw new InvalidUser();
      }

      const checkPassword = await this.hashManager.compare(
        password,
        user.getPassword()
      );

      if (!checkPassword) {
        throw new InvalidPassword();
      }

      const token = this.authenticator.generate({
        id: user.getId(),
        role: user.getRole(),
      });

      return token;
    } catch (error: any) {}
  };
}
