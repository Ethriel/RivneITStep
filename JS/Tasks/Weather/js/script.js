const apiKey = "063f18e685df1ce3a0757c7fe7963b32";
const units = "metric";
const i = document.querySelector(".my-i-search");
i.addEventListener("click", getWeatherData);

async function getWeatherData() {
    const city = document.querySelector("input[type='text']").value;
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    const search = new URLSearchParams();
    search.append("q", city);
    search.append("units", units);
    search.append("appid", apiKey);
    url.search = search;
    await fetch(url)
        .then(async (response) => {
            console.log("RESPONSE", response);
            if (response.status === 404)
                throw new Error("404");
            const data = await response.json();
            console.log(data);
            generateCurrent(data);
        })
        .catch((reason) => {
            console.log(reason);
            showNotFound();
        });
}

function showNotFound() {
    console.log("ERROR");
    // let notFound = document.querySelector('container-not-found');
    // let content = document.querySelector(".content");
    // content.classList.toggle("display-none");
    // notFound.classList.toggle("display-none");
};

function generateCurrent(data) {
    console.log("PARSE");
    let content = document.querySelector(".content");
    let current = document.querySelector(".current");

    let currentTop = getCurrentTop(data.name);

    current = appendChild(current, currentTop);
    
    content.className = "content display-flex col-flex";

    content = appendChild(content, current);
}

function getCurrentTop(city) {
    let currentTop = document.querySelector(".current-top");
    let today = getCurrentDate();

    let cityName = document.createElement("h3");
    cityName.className = "h3-current-weather";
    cityName.innerText = city;

    let date = document.createElement("h3");
    date.className = "h3-current-weather";
    date.innerText = today;
    
    currentTop = appendChild(currentTop, cityName, date);
    return currentTop;
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today.toString();
}

function appendChild() {
    let container = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        container.append(arguments[i]);
    }
    return container;
}