import { getBandByIdDTO } from './../types/getBandByIdDTO';
import { Request, Response } from 'express';
import BandBusiness from '../bussiness/BandBusiness';
import { createBandInputDTO } from '../types/createBandInputDTO';

export default class BandController {
    constructor(private bandBusiness: BandBusiness) { }

    public async createBand(req: Request, res: Response) {
        try {
            const { name, music_genre, responsible } = req.body;

            const auth = req.headers.authorization as string;

            const input: createBandInputDTO = {
                name,
                music_genre,
                responsible,
                auth
            };

            await this.bandBusiness.createBand(input);

            res.status(201).send("Banda registrada com sucesso.");
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        };
    };

    public async getBandById(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string;
            const id = req.params.id;

            const findBand: getBandByIdDTO = {
                id,
                auth
            };

            const band = await this.bandBusiness.getBandById(findBand);

            res.status(200).send(band);
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        };
    };
};