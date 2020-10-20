export class ProductModel {
    public id: number;
    public title: string;
    public price: number;
    public imageURL: string;
    public description: string;

    // constructor(id: number, title: string, price: number, image: string, description: string) {
    //     this.id = id;
    //     this.title = title;
    //     this.price = price;
    //     this.imageURL = image;
    //     this.description = description;
    // }

    constructor() {
        this.id = 0;
        this.title = "";
        this.price = 0;
        this.imageURL = "";
        this.description = "";
    }
}