export class Event {
    public id: number;
    public name: string;
    public description: string;
    public imageURL: string;
    public startDate: string;
    public isHidden: boolean;
    public isPrior: boolean;
    public isDone: boolean;

    constructor(name: string, description: string, imageURL: string, startDate: string) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.startDate = startDate;
        this.isHidden = false;
        this.isPrior = false;
        this.isDone = false;
    }
}
