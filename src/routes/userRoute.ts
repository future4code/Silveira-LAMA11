import { UserBusiness } from '../bussiness/UserBusiness';
import { UserController } from '../controller/UserController';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/idGenerator';
import express from 'express';

const userRoute = express.Router();

const userBusiness = new UserBusiness(
  new UserDatabase(),
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);

const userController = new UserController(userBusiness);

userRoute.post("/singup", userController.createUser);
userRoute.post("/login", userController.login);

export default userRoute;