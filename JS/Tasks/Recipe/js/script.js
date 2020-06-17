function addRecipe() {
    let recDiv = document.querySelector(".recipe-container");
    let allStrs = [];
    let recNameInput = document.querySelector("#recipeName");
    let recNameValue = recNameInput.value;
    allStrs.push(recNameValue);

    let recDescrArea = document.querySelector("#recipeDescription");
    let recDescrValue = recDescrArea.value;
    allStrs.push(recDescrValue);

    let recTypeSelect = document.querySelector("select");
    let rectTypeValue = recTypeSelect.value;
    allStrs.push(rectTypeValue);

    let allRb = Array.from(document.querySelectorAll("input[type='radio']"));
    let recDifficultyValue = "";
    for (let i = 0; allRb.length; i++) {
        if (allRb[i].checked == true) {
            recDifficultyValue = allRb[i].value;
            break;
        }
    }
    allStrs.push(recDifficultyValue);

    let recNOfServings = document.querySelector("#nOfServings");
    let recNOfServingsValue = recNOfServings.value;
    allStrs.push(recNOfServingsValue);

    let recPrepTime = document.querySelector("#prepTime");
    let recPrepTimeValue = recPrepTime.value;
    allStrs.push(recPrepTimeValue);

    let recCookingTime = document.querySelector("#cookTime");
    let recCookingTimeValue = recCookingTime.value;
    allStrs.push(recCookingTimeValue);

    let recIngridients = document.querySelector("#ingridientsArea");
    let recIngridientsValue = recIngridients.value;
    allStrs.push(recIngridientsValue);

    for (let i = 0; i < allStrs.length; i++) {
        if (isStringEmptyOrNull(allStrs[i])) {
            alert("Some fields are empty. Fill them, please");
            return;
        }
    }

    let recipe = {
        rName: recNameValue,
        rDescription: recDescrValue,
        rType: rectTypeValue,
        rDifficulty: recDifficultyValue,
        rNOfServings: recNOfServingsValue,
        rPreparationTime: recPrepTimeValue,
        rCookingTime: recCookingTimeValue,
        rIngridients: recIngridientsValue
    };

    let recDoneDiv = document.querySelector(".recipe-done");
    let recImg = document.querySelector(".r-img");
    let recDoneName = document.querySelector(".r-done-name").innerText = recipe.rName;
    let recDoneType = document.querySelector(".r-done-type").innerText = recipe.rType;
    let recDiffLevel = document.querySelector(".diff-level");
    let recDescr = document.querySelector(".d-1").innerText = recipe.rDescription;
    let recIngridientsText = document.querySelector(".d-2").innerText = `<b>Ingridients: </b> ${recipe.rIngridients}`;

    console.log(recipe);

    recDoneDiv.style.display = "flex";
    recDiv.style.display = "none";
}

function isStringEmptyOrNull(str) {
    return str == "" || str == null;
}