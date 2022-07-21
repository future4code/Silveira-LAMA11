import BandBusiness from '../bussiness/BandBusiness';
import BandController from '../controller/BandController';
import { BandDataBase } from '../data/BandDataBase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/idGenerator';
import express from 'express';

const bandRoute = express.Router();

const bandBusiness = new BandBusiness(
  new BandDataBase(),
  new IdGenerator(),
  new Authenticator()
);

const bandController = new BandController(bandBusiness);

bandRoute.post("/create", bandController.createBand);
bandRoute.post("/get/:id", bandController.getBandById);

export default bandRoute;