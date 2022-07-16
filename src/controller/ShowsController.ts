import { getShowsByDateDTO } from './../types/getShowsByDateDTO';
import { ShowsBusiness } from '../bussiness/ShowsBusiness';
import { showsInputDTO } from './../types/showsInputDTO';
import { Request, Response } from 'express';



export class ShowsController {
    constructor(private showsBusiness: ShowsBusiness) { }

    public async createShow(req: Request, res: Response): Promise<void> {
        try {
            const { band_id, week_day, start_time, end_time } = req.body;

            const authenticator = req.headers.authorization as string;

            const show: showsInputDTO = {
                band_id,
                week_day,
                start_time,
                end_time,
                authenticator
            };

            await this.showsBusiness.show(show);

            res.status(200).send({ message: "Show successfully scheduled!" });
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        };
    };

    public async getShowByDate(req: Request, res: Response) {
        try {
            const { week_day } = req.params;
            const authenticator = req.headers.authorization as string;;

            if (!week_day) {
                throw new Error("Verifique a data inserida.");
            };

            const getShow: getShowsByDateDTO = {
                week_day,
                authenticator
            };

            const result = await this.showsBusiness.getShowByDate(getShow);

            res.status(200).send({ result });
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        };
    };
};