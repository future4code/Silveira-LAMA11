import { getShowsByDateDTO } from './../types/getShowsByDateDTO';
import { ShowsDataBase } from './../data/ShowsDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from './../services/idGenerator';
import { showsInputDTO } from './../types/showsInputDTO';


export class ShowsBusiness {
    constructor(
        private showsDatabase: ShowsDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public async show(input: showsInputDTO) {
        try {
            const { band_id, week_day, start_time, end_time, authenticator } = input

            if (start_time < 8 || start_time > 23) {
                throw new Error("Shows só podem ser marcados das 8 as 23 horas.")
            };

            if (!band_id || !week_day || !start_time || !end_time) {
                throw new Error("Cheque os campos.")
            };

            const verifyAuthenticator = this.authenticator.getTokenData(authenticator);

            if (!verifyAuthenticator) {
                throw new Error("Por favor faça login.")
            };

            const id = this.idGenerator.generate();

            const newShow: any = {
                id,
                week_day,
                start_time,
                end_time,
                band_id
            };

            await this.showsDatabase.createShow(newShow);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };


    public async getShowByDate(input: getShowsByDateDTO) {
        try {
            const { week_day, authenticator } = input;

            const checkingAuth = this.authenticator.getTokenData(authenticator);

            if (!checkingAuth) {
                throw new Error("Por favor faça login")
            };

            const data = await this.showsDatabase.getShowsByDate(week_day);

            return data;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};