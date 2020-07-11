function getCoffeeIngridients() {
    return [new Ingredient("coffee", 3), new Ingredient("sugar", 1), new Ingredient("water", 5)];
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
        new Ingredient("coffee", 30),
        new Ingredient("tea", 30),
        new Ingredient("cappuccino", 30),
        new Ingredient("sugar", 100),
        new Ingredient("water", 300)
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
    constructor(ingridients) {
        this.ingridients = ingridients;
    };
};

class Drink {
    constructor(name, recipe, price) {
        this.name = name;
        this.recipe = recipe;
        this.price = price;
    };
};

class Coffee extends Drink {
    constructor(name = "coffee", recipe = new Recipe(getCoffeeIngridients())) {
        super(name, recipe, 5);
    };
};

class Tea extends Drink {
    constructor(name = "tea", recipe = new Recipe(getTeaIngridients())) {
        super(name, recipe, 2);
    };
};

class Cappuccino extends Drink {
    constructor(name = "cappuccino", recipe = new Recipe(getCappuccinoIngridients())) {
        super(name, recipe, 8);
    };
};

let creating = document.querySelector(".creating");
let done = document.querySelector(".done");
let doneText = done.querySelector("p");
let error = document.querySelector(".error");
let errorText = error.querySelector("p");

class DrinksMachine {
    constructor(drinks, ingridients, money) {
        this.drinks = drinks;
        this.ingridients = ingridients;
        this.money = money;
    };

    makeDrink = (amount, recipe, drink) => {
        error.classList.add("display-none");
        doneText.innerText = `${amount} ${drink.name} done`;
        for (let ing of this.ingridients) {
            for (let r of recipe) {
                if (ing.name === r.name) {
                    if (r.amount * amount > ing.amount) {
                        error.classList.remove("display-none");
                        errorText.innerText = `Not enough ${ing.name} to make ${amount} of ${drink.name}!\nRefill ${ing.name}`;
                        return;
                    }
                    ing.amount -= r.amount * amount;
                }
            }
        }
        creating.classList.remove("display-none");
        setTimeout(() => {
            done.classList.remove("display-none");
            creating.classList.add("display-none");
        }, 1000);
    };

    refillIngridient = (name, amount) => {
        let ingridient = this.ingridients.find(i => i.name == name);
        ingridient.amount += amount;
    }
};

let drinksMachine = new DrinksMachine(getBasicDrinks(), getBasicIngridients(), 0);

document.querySelectorAll(".drink").forEach(d => d.addEventListener("click", drinkClick));

document.querySelector(".actions").querySelectorAll("div").forEach(d => d.addEventListener("click", actionClick));

document.querySelectorAll(".refill").forEach(r => r.addEventListener("click", refillClick));

function actionClick(event) {
    const text = event.currentTarget.querySelector("p").innerText;
    const refill = document.querySelector(".refill-actions");
    const drinks = document.querySelector(".drinks");
    switch (text) {
        case "Refill ingridients":
            refill.classList.remove("display-none");
            drinks.classList.add("display-none");
            break;
        case "Get drinks":
            drinks.classList.remove("display-none");
            refill.classList.add("display-none");
            break;
        default:
            break;
    }
};

function refillClick(event) {
    const drink = event.currentTarget
    const text = drink.querySelector("p").innerText.toLowerCase();
    let input = document.querySelector(".select-refill").querySelector("input");
    const amount = +input.value;
    if (amount <= 0) {
        alert("Negative values are not alowed");
        input.value = 1;
        return;
    }
    drinksMachine.refillIngridient(text, amount);
};

function drinkClick(event) {
    done.classList.add("display-none");
    creating.classList.add("display-none");
    let input = document.querySelector(".select").querySelector("input");
    const amount = +input.value;
    if (amount <= 0) {
        alert("Negative values are not alowed");
        input.value = 1;
        return;
    }
    const type = event.currentTarget.querySelector("p");
    const name = type.innerText.toLowerCase();
    const drink = drinksMachine.drinks.find(drink => drink.name == name);
    drinksMachine.money += drink.price;
    const recipe = drink.recipe.ingridients;

    drinksMachine.makeDrink(amount, recipe, drink);
};