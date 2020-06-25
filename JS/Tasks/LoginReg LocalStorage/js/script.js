let isSignIn = true;
function switchForms() {
    let regForm = document.querySelector(".reg-form");
    regForm.classList.toggle("display-none");
    isSignIn = !isSignIn;
};

let users = [];

let activeUser = {
    name: "",
    password: "",
    email: "",
    login: ""
};
function composeUser() {
    if (users == null) {
        users = [];
    }
    let _login = document.querySelector("#_login").value;
    let _password = document.querySelector("#_password").value;
    let _name = document.querySelector("#_name").value;
    let _email = document.querySelector("#_email").value;

    if (isSignIn) {
        let registredUser = {
            login: _login,
            password: _password
        };

        if (!validateUser(registredUser)) {
            alert("Some fields are empty");
            return;
        }

        if (!validateLogin(registredUser)) {
            alert("Login failed");
            return;
        }

        setActiveUser();

        localStorage.setItem("activeUser", JSON.stringify(activeUser));

    }
    else {
        let newUser = {
            name: _name,
            password: _password,
            email: _email,
            login: _login
        };
        if (!validateUser(newUser)) {
            alert("Some fields are empty");
            return;
        }
        users.push(newUser);
        localStorage.setItem("_users", JSON.stringify(users));
        setActiveUser(newUser);
    }

    redirectTo("profile.html");
};

function isNewUserValid(user) {
    if (users.includes(user)) {
        return false;
    }
    return true;
};

function validateUser(user) {
    for (key in user) {
        if (!user[key]) {
            return false;
        }
    }
    return true;
};

function validateLogin(user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i]._login == user._login && users[i]._password == user._password) {
            return true;
        }
    }
    return false;
};

window.onload = function () {
    let data = localStorage.getItem("_users");
    users = JSON.parse(data);
};

function setActiveUser(userToset = null) {
    if (isSignIn) {
        for (let i = 0; i < users.length; i++) {
            if (validateLogin(users[i])) {
                activeUser = users[i];
                return;
            }
        }
    }
    else {
        activeUser = userToset;
    }
};

function redirectTo(page){
    window.location.href = page;
};