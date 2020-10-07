import * as uuid from 'uuid';

export class TaskModel {
    public id: string;
    public topic: string;
    public date: string;
    public description: string;
    public isDone: boolean;
    public isUnderReview: boolean;
    public mark: number;

    constructor(topic: string, date: string, description: string) {
        this.id = uuid.v4();
        this.topic = topic;
        this.date = date;
        this.description = description;
        this.mark = -1;
        this.isDone = false;
        this.isUnderReview = false;
    }
}