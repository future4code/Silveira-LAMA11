import { getBandByIdDTO } from './../types/getBandByIdDTO';
import { BandDataBase } from '../data/BandDataBase';
import Band from '../model/Band';
import { USER_ROLE } from '../model/User';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from './../services/idGenerator';
import { createBandInputDTO } from '../types/createBandInputDTO';


export default class BandBusiness {
    constructor(
        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public async createBand(input: createBandInputDTO) {
        try {
            const { name, music_genre, responsible, auth } = input;
            const compareToken = this.authenticator.getTokenData(auth);

            if (!compareToken && compareToken !== USER_ROLE.ADMIN) {
                throw new Error("Você deve estar logado com um usuário administrador para registrar uma banda.")
            };

            if (!name || !music_genre || !responsible) {
                throw new Error("Cheque os campos nome, gênero e o responsável.")
            };

            const id = this.idGenerator.generate();

            const newBand: Band = new Band(
                id,
                name,
                music_genre,
                responsible
            );

            await this. bandDataBase.createBand(newBand);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);

        };
    };

    public async getBandById(input: getBandByIdDTO) {
        try {
            const { id, auth } = input;
            const compareToken = this.authenticator.getTokenData(auth);

            if (!compareToken) {
                throw new Error("Você deve estar logado com um usuário administrador parabuscar uma banda.")
            };

            if (!id) {
                throw new Error("Insira umid válido.")
            };

            const findBand = await this.bandDataBase.getBandById(id);

            const band = {
                id: findBand.id,
                name: findBand.name,
                music_genre: findBand.music_genre,
                responsible: findBand.responsible
            };

            return band;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        };
    };
};