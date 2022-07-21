export default class Band {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ) { }

    public getId() {
        return this.id;
    };
    public getName() {
        return this.name;
    };
    public getGenre() {
        return this.music_genre;
    };
    public getResponsible() {
        return this.responsible;
    };

    static toBandModel(data: any): Band {
        return new Band(data.id, data.name, data.music_genre, data.responsible);
    };
};