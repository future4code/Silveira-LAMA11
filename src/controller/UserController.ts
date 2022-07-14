import { Request, Response } from "express";
import { UserBussiness } from "../bussiness/UserBussiness";
import { UserInputDTO } from "../model/UserTypes";

export class UserController {
  constructor(private userBussiness: UserBussiness) {}
  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const inputUser: UserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const token = await this.userBussiness.createUser(inputUser);

      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!", token });
    } catch (error: any) {}
  };
}
