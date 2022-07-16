import { Request, Response } from "express";
import { UserBusiness } from "../bussiness/UserBusiness";
import { UserInputDTO } from "../types/UserInputDTO";
import { UserInputLoginDTO } from "../types/UserInputLoginDTO";

export class UserController {
  constructor(private userBusiness: UserBusiness) { }
  
  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const inputUser: UserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const token = await this.userBusiness.createUser(inputUser);

      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!", token });
    } catch (error: any) { }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const inputLogin: UserInputLoginDTO = {
        email,
        password,
      };

      const token = await this.userBusiness.login(inputLogin);
      res.status(200).send({ message: "Usuário logado", token });
    } catch (error: any) { }
  };
}
