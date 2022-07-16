export enum SHOW_DAY {
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
};

export default class Shows {
    constructor(
        private id: string,
        private week_day: SHOW_DAY,
        private start_time: number,
        private end_time: number,
        private band_id: string,
    ) { }
};