import { UserBussiness } from '../bussiness/UserBussiness';
import { UserController } from '../controller/UserController';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/idGenerator';
import express from 'express';

const userRoute = express.Router();

const userBussiness = new UserBussiness(
  new UserDatabase(),
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);

const userController = new UserController(userBussiness);

userRoute.post("/singup", userController.createUser);
userRoute.post("/login", userController.login);

export default userRoute;