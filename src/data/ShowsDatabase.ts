import Shows from '../model/Shows';
import { BaseDatabase } from './BaseDatabase';


export class ShowsDataBase extends BaseDatabase {
    private static TABLE_NAME = "Lama_Shows";

    public async createShow(show: Shows) {
        try {
            await BaseDatabase.connection
                .insert(show)
                .into(ShowsDataBase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    public async getShowsByDate(week_day: string) {
        try {
            const result = await BaseDatabase.connection
                .select("Lama_Bands.name", "Lama_Bands.music_genre")
                .from('Lama_Bands')
                .innerJoin('Lama_Shows', 'Lama_Bands.id', "Lama_Shows.band_id")
                .orderBy('start_time', 'asc')

            return result;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};