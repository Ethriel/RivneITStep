function getCoffeeIngridients() {
    return [new Ingredient("coffee", 2), new Ingredient("sugar", 1), new Ingredient("water", 5)];
};

function getTeaIngridients() {
    return [new Ingredient("tea", 3), new Ingredient("sugar", 1), new Ingredient("water", 5)];
};

function getCappuccinoIngridients() {
    return [new Ingredient("cappuccino", 2), new Ingredient("sugar", 1), new Ingredient("water", 5)];
};

function getBasicDrinks() {
    return [new Coffee(), new Tea(), new Cappuccino()];
};

function getBasicIngridients() {
    return [
        new Ingredient("coffee", 10),
        new Ingredient("tea", 10),
        new Ingredient("cappuccino", 10),
        new Ingredient("sugar", 50),
        new Ingredient("water", 100)
    ];
};

class Ingredient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    };

    decreaseBy(amount) {
        if (this.amount < amount) {
            alert(`Current amount - ${this.amount} is lower than amount you inputted - ${amount}`);
            return;
        }
        this.amount -= amount
    };

    increaseBy(amount) {
        this.amount += amount;
    };
};

class Recipe {
    constructor(...ingridients) {
        this.ingridients = ingridients;
    };
};

class Drink {
    constructor(name, recipe, price) {
        this.name = name;
        this.recipie = recipe;
        this.price = price;
    };
    create(){

    };
};

class Coffee extends Drink {
    constructor(name = "coffee", recipe = new Recipe(getCoffeeIngridients())) {
        super(name, recipe);
    };
};

class Tea extends Drink {
    constructor(name = "tea", recipe = new Recipe(getTeaIngridients())) {
        super(name, recipe);
    };
};

class Cappuccino extends Drink {
    constructor(name = "cappuccino", recipe = new Recipe(getCappuccinoIngridients())) {
        super(name, recipe);
    };
};

class DrinksMachine {
    constructor(drinks = getBasicDrinks(), ingridients = getBasicIngridients(), money) {
        this.drinks = drinks;
        this.ingridients = ingridients;
        this.money = money;
    };
    createDrink(event) {

    };

    createCoffee(amount) {

    };

    createTea(amount) {

    };

    createCappuccino(amount) {

    };

    refillIngredient(event){

    };

    refillCoffee(amount){

    };

    refillTea(amount){

    };

    refillCappuccino(amount){

    };

    refillWater(amount){

    };
};

let drinksMachine = new DrinksMachine();
console.log(drinksMachine);