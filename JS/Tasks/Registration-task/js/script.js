let btnReg = document.getElementById("btnReg");
let notRobot = document.getElementById("notRobot");

let allInputs = document.querySelectorAll(".input-text");
let fn = document.querySelector(".fn");
let sn = document.querySelector(".sn");
let email = document.querySelector(".em");
let psw = document.querySelector(".psw");
let pswConfirm = document.querySelector(".confirm");
let radios = document.getElementsByName("gender");
let gendersDiv = document.querySelector(".genders");
let goalCount = radios.length + allInputs.length - 1;

let person = {
    firstName: "",
    secondName: "",
    gender: "",
    email: "",
    password: ""
};

allInputs.forEach((x) => x.onfocus = function () {
    x.classList.remove("invalid");
})

btnReg.disabled = true;

function checkNoRobot() {
    if (notRobot.checked) {
        btnReg.disabled = false;
    } else {
        btnReg.disabled = true;
    }
}

function btnRegClick() {
    let allOkcounter = 0;
    let unchecked = 0;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked != true) {
            unchecked++;
        } else {
            person.gender = radios[i].value;
        }
    }

    if (unchecked == radios.length) {
        gendersDiv.classList.add("invalid");
        allOkcounter--;
    } else {
        gendersDiv.classList.remove("invalid");
        allOkcounter++;
    }

    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value == "" || allInputs[i].value == null) {
            allInputs[i].classList.add("invalid");
            allOkcounter--;
        } else {
            allInputs[i].classList.remove("invalid");
            allOkcounter++;
        }
    }

    if (psw.value != pswConfirm.value) {
        psw.classList.add("invalid");
        pswConfirm.classList.add("invalid");
    } else {
        person.password = psw.value;
    }
    console.log("All counter", allOkcounter);
    console.log("Goal", goalCount);


    if (allOkcounter == goalCount) {
        person.firstName = fn.value;
        person.secondName = sn.value;
        person.email = email.value;
        displayPerson();
    }
    console.log(person);

}

function displayPerson() {
    let baseInfo = `First name: ${person.firstName}, Second name: ${person.secondName}, Gender: ${person.gender},`;
    let rest = `Email: ${person.email}, Password: ${person.password}`;
    document.body.innerHTML += `<h3>${baseInfo} ${rest}</h3>`;
}