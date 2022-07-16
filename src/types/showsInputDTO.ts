import { SHOW_DAY } from '../model/Shows';

export type showsInputDTO = {
    band_id: string,
    week_day: SHOW_DAY,
    start_time: number,
    end_time: number,
    authenticator: string
};