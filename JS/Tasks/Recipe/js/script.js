let diffIcons = ["fa-battery-full", "fa-battery-half", "fa-battery-quarter"];
let images = ["../img/salad.png", "../img/cake.png", "../img/hotMeal.jpg"];

function addRecipe() {

    // recipe obj
    let recipe = {
        rName: "",
        rDescription: "",
        rType: "",
        rDifficulty: "",
        rNOfServings: "",
        rPreparationTime: "",
        rCookingTime: "",
        rIngridients: ""
    };

    setRecipeObject(recipe);

    if (!checkRecipe(recipe)) {
        return;
    }

    recipeDone(recipe);
}

function setRecipeObject(recipe) {
    setObjectPropertyValue("#recipeName", recipe, "rName");
    setObjectPropertyValue("#recipeDescription", recipe, "rDescription");
    setObjectPropertyValue("select", recipe, "rType");
    recipe.rDifficulty = getDiffValue();
    setObjectPropertyValue("#nOfServings", recipe, "rNOfServings");
    setObjectPropertyValue("#prepTime", recipe, "rPreparationTime");
    setObjectPropertyValue("#cookTime", recipe, "rCookingTime");
    setObjectPropertyValue("#ingridientsArea", recipe, "rIngridients");
}

// compose recipe info div
function recipeDone(recipe) {
    let recDiv = document.querySelector(".recipe-container");
    let recDoneDiv = document.querySelector(".recipe-done");

    selectImage(recipe.rType);
    fillElementInnerValue(".r-done-name", recipe.rName);
    fillElementInnerValue(".r-done-type", recipe.rType);
    fillDiffLevel(recipe);
    fillElementInnerValue(".d-1", recipe.rDescription);
    fillElementInnerValue(".d-2", `<b>Ingridients: </b> ${recipe.rIngridients}`, true);
    fillElementInnerValue("#srv", recipe.rNOfServings);
    fillElementInnerValue("#pTime", recipe.rPreparationTime);
    fillElementInnerValue("#cTime", recipe.rCookingTime);

    recDoneDiv.style.display = "flex";
    recDiv.style.display = "none";
};

// fill difficulty level
function fillDiffLevel(recipe) {
    let recDiffLevel = document.querySelector(".diff-level");
    recDiffLevel.classList.add("fas");
    recDiffLevel.classList.add(getDiffIcon(recipe.rDifficulty));
    fillElementInnerValue("#diff", getDiffText(recipe.rDifficulty));
};

// fill innerText or innerHTML of an element chosen by selector with given value
function fillElementInnerValue(selector, value, innerHtml = false) {
    let element = document.querySelector(selector);
    if (innerHtml) {
        element.innerHTML = value;
    } else {
        element.innerText = value;
    }
};

// select an image by given meal type
function selectImage(meal) {
    let recImg = document.querySelector(".r-img");
    let imgSrc = "";
    switch (meal) {
        case "Salad":
            imgSrc = images[0];
            break;
        case "Cake":
            imgSrc = images[1];
            break;
        case "Hot meal":
            imgSrc = images[2];
            break;
    }
    recImg.src = imgSrc;
};

// get value of an element chosen by selector
function getValueOfElement(selector) {
    let element = document.querySelector(selector);
    let val = element.value;
    return val;
};

// select an element by selector. get value of it and set this value to obj's property
function setObjectPropertyValue(selector, obj, propName) {
    let value = getValueOfElement(selector);
    obj[propName] = value;
};

// check if recipe's properties are not empty or null
function checkRecipe(recipe) {
    for (key in recipe) {
        if (isStringEmptyOrNull(recipe[key])) {
            alert("Some fields are empty. Fill them, please");
            return false;
        }
    }
    return true;
}

// get difficulty level
function getDiffValue() {
    let allRb = Array.from(document.querySelectorAll("input[type='radio']"));
    let recDifficultyValue = "";
    for (let i = 0; allRb.length; i++) {
        if (allRb[i].checked == true) {
            recDifficultyValue = allRb[i].value;
            break;
        }
    }
    return recDifficultyValue;
};

// check if string null or empty
function isStringEmptyOrNull(str) {
    return str == "" || str == null;
};

// get icon of difficulty level
function getDiffIcon(diff) {
    let d = "";
    switch (diff) {
        case "hard":
            d = diffIcons[0];
            break;
        case "moderate":
            d = diffIcons[1];
            break;
        case "easy":
            d = diffIcons[2];
            break;
    }
    return d;
};

// get diffuclty text
function getDiffText(diff) {
    let d = "";
    switch (diff) {
        case "hard":
            d = " Hard level";
            break;
        case "moderate":
            d = " Moderate level";
            break;
        case "easy":
            d = " Easy level";
            break;
    }
    return d;
}