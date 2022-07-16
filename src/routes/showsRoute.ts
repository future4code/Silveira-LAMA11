import { ShowsBusiness } from '../bussiness/ShowsBusiness';
import { ShowsController } from '../controller/ShowsController';
import { ShowsDataBase } from '../data/ShowsDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/idGenerator';
import express from 'express';

const showsRoute = express.Router();

const showsBusiness = new ShowsBusiness(
    new ShowsDataBase(),
    new IdGenerator(),
    new Authenticator()
);

const showsController = new ShowsController(showsBusiness);

showsRoute.get('/get/:day', showsController.getShowByDate);
showsRoute.post('/create', showsController.createShow);

export default showsRoute;