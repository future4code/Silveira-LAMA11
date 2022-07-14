import { UserBussiness } from "./bussiness/UserBussiness";
import { app } from "./controller/app";
import { UserController } from "./controller/UserController";
import { UserDatabase } from "./data/UserDatabase";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/idGenerator";

const userBussiness = new UserBussiness(
  new UserDatabase(),
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);

const userController = new UserController(userBussiness);

app.post("/user/singup", userController.createUser);
app.post("/user/login", userController.login);
