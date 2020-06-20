let diffIcons = ["fa-battery-full", "fa-battery-half", "fa-battery-quarter"];
let images = ["../img/salad.png", "../img/cake.png", "../img/hotMeal.jpg"];

function addRecipe() {

    let allValues = [];

    pushValueBySelectorToArray("#recipeName", allValues);
    pushValueBySelectorToArray("#recipeDescription", allValues);
    pushValueBySelectorToArray("select", allValues);
    allValues.push(getDiffValue());
    pushValueBySelectorToArray("#nOfServings", allValues);
    pushValueBySelectorToArray("#prepTime", allValues);
    pushValueBySelectorToArray("#cookTime", allValues);
    pushValueBySelectorToArray("#ingridientsArea", allValues);

    for (let i = 0; i < allValues.length; i++) {
        if (isStringEmptyOrNull(allValues[i])) {
            alert("Some fields are empty. Fill them, please");
            return;
        }
    }

    // recipe obj
    let recipe = {
        rName: allValues[0],
        rDescription: allValues[1],
        rType: allValues[2],
        rDifficulty: allValues[3],
        rNOfServings: allValues[4],
        rPreparationTime: allValues[5],
        rCookingTime: allValues[6],
        rIngridients: allValues[7]
    };

    recipeDone(recipe);
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

// push a value of an element chosen by selector to given array
function pushValueBySelectorToArray(selector, arr) {
    let value = getValueOfElement(selector);
    arr.push(value);
    console.log(value);
};

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
    console.log(diff);

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