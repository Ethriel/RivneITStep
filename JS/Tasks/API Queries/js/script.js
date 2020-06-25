const privatUrl = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
const photosUrl = "http://jsonplaceholder.typicode.com/photos";

let btn = document.querySelector("button");

window.addEventListener("load", getExchangeRates);
btn.addEventListener("click", getPhotosClick);

async function getExchangeRates() {
    let response = await fetch(privatUrl);
    let rates = await response.json();
    let elem = document.createElement("div");
    elem.className = "class 1"
    
    elem = getTest();
    
    displayExchange(rates);
};

function getTest(){
    let tmp = document.createElement("div");
    tmp.className = " class 2"
    return tmp;
}

function displayExchange(rates) {
    let h3 = document.querySelector(".h3-exchange");
    let text = "";
    for (let exc of rates) {
        text += `${exc.ccy}: buy - ${exc.buy} ${exc.base_ccy}, sale - ${exc.sale} ${exc.base_ccy}\n`;
    }
    h3.innerText = text;
};

async function getPhotosClick() {
    let spinnerContainer = document.querySelector(".spinner-container");
    let photosContainer = document.querySelector(".photos-container");
    let photosMain = document.querySelector(".photos");

    let response = await fetch(photosUrl);

    if (photosContainer.childElementCount > 0) {
        photosContainer.remove();
    }

    spinnerContainer.classList.remove("display-none");

    let photos = await response.json();
    photos.length = 500;

    for (let i = 0; i < photos.length; i++) {
        let card = getCard();
        let img = getImage(photos[i].thumbnailUrl);
        let cardBody = getCardBody();
        let cardText = getCardText(photos[i].title);
        card.append(img);
        cardBody.append(cardText);
        card.append(cardBody);
        photosContainer.append(card);
    };
    
    spinnerContainer.classList.add("display-none");
    photosMain.append(photosContainer);
};

async function setPhotos(photos){
    let photosContainer = document.querySelector(".photos-container");
    for (let i = 0; i < photos.length; i++) {
        let card = getCard();
        let img = getImage(photos[i].thumbnailUrl);
        let cardBody = getCardBody();
        let cardText = getCardText(photos[i].title);
        card.append(img);
        cardBody.append(cardText);
        card.append(cardBody);
        photosContainer.append(card);
    };
    return photosContainer;
};


function getCard() {
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    return card;
};

function getImage(src) {
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = src;
    img.style.margin = "0 auto";
    return img;
};

function getCardBody() {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    return cardBody;
};

function getCardText(text) {
    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = text;
    return p;
};