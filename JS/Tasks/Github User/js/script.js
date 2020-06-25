const url = "https://api.github.com/users";
let info = document.querySelector(".info-contaner");
info.style.display = "none";

let btn = document.querySelector("button");
btn.addEventListener("click", clickSearch);


async function clickSearch() {
    let inp = document.querySelector("input");
    if (inp.value == "" || inp.value == null) {
        alert("Enter username to search");
        return false;
    }

    let avatar = document.querySelector("img");
    let name = document.querySelector("#name");
    let login = document.querySelector("#login");
    let gitUrl = document.querySelector("#urlGit");
    let blog = document.querySelector("#blog");
    let location = document.querySelector("#location");
    let email = document.querySelector("#email");
    let followers = document.querySelector("#followers");
    let repos = document.querySelector("#repos");

    let user = await getInfo(inp.value);

    avatar.src = user.avatar_url;
    name.innerText = user.name;
    login.innerText = user.login;
    gitUrl.innerText = user.html_url;
    blog.innerText = user.blog;
    location.innerText = user.location;
    email.innerText = user.email;
    followers.innerText = user.followers;
    repos.innerText = user.repositories;
    info.style.display = "flex";
    return true;
}

async function getInfo(user) {
    let response = await fetch(`${url}/${user}`);
    let data = await response.json();
    let followers = await getLength(`${data.followers_url}`);
    let repos = await getLength(`${data.repos_url}`);
    console.log(followers)
    console.log(repos);
    let obj = {
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
        html_url: data.html_url,
        blog: data.blog,
        location: data.location,
        email: data.email,
        followers: followers,
        repositories: repos
    };
    obj = validateUser(obj);
    return obj;
};

async function getLength(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data.length;
}

function validateUser(user) {
    for (let key in user) {
        if (user[key] == null || user[key] == "" || user[key] === 0) {
            user[key] = `No ${key}`;
        }
    }
    return user;
}