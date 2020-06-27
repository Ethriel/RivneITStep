window.addEventListener("load", setOnLoad);
let gravatarDiv = document.querySelector(".gravatar");
gravatarDiv.addEventListener("click", showModal);
let btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", saveChanges);

let user = JSON.parse(localStorage.getItem("activeUser"));

function setOnLoad() {
    let pGreeting = document.querySelector(".p-greeting");
    pGreeting.innerText = `Hello, ${user.name}!`;
    let pGravatar = document.querySelector(".p-gravatar");
    pGravatar.innerText = getGravatar();
    setModalInfo();
};

function getGravatar() {
    let gr = "";
    let splittedName = splitName(user.name);
    for (let item of splittedName) {
        gr += getFirstLetter(item);
    };
    return gr;
};

function getFirstLetter(str) {
    return str.substr(0, 1).toUpperCase();
};

function splitName(name) {
    return name.split(" ");
};

function showModal() {
    let modal = document.querySelector(".fade");
    modal.style.display = "flex";
};

function setModalInfo() {
    let inputs = getAllInputs();
    let keys = getObjKeys(user);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = user[keys[i]];
    };
};

function getAllInputs() {
    let inputs = document.querySelector("form").querySelectorAll("input");
    return inputs;
};

function getObjKeys(obj) {
    return Object.keys(obj);
};

function saveChanges(event) {
    let keys = getObjKeys(user);
    let inputs = getAllInputs();
    for (let i = 0; i < inputs.length; i++) {
        user[keys[i]] = inputs[i].value;
    }
    localStorage.setItem("activeUser", JSON.stringify(user));
};