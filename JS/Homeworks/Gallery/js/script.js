let allImgs = document.querySelectorAll(".img-item");
let allImgsArr = Array.from(allImgs);
let mainImg = document.querySelector(".main-img");
let globalImgIndex = 0;
let allImgsLength = allImgsArr.length;

allImgsArr.forEach((x) => {
    x.addEventListener("click", imgClick);
});

window.onload = populateGallery;

function populateGallery() {
    let current = 0;
    let content = "";
    for (let i = 0; i < allImgsLength; i++) {
        current = i + 1;
        if (current == 8) {
            content = `url(../img/${current}.gif)`
        }
        content = `url(../img/${current}.jpg)`;
        allImgs[i].style.content = content;
    }
};

function imgClick() {
    let content = this.style.content;
    globalImgIndex = getNumFromString(content) - 1;

    mainImg.style.content = content;
};

function getNumFromString(str) {
    let matches = str.match(/(\d+)/);
    return matches[0];
};

function leftClick() {
    if (globalImgIndex > 0) {
        globalImgIndex--;
    } else {
        globalImgIndex = allImgsLength - 1;
    }
    let content = allImgsArr[globalImgIndex].style.content;
    mainImg.style.content = content;
};

function rightClick() {
    if (globalImgIndex < (allImgsLength - 1)) {
        globalImgIndex++;
    } else {
        globalImgIndex = 0;
    }
    let content = allImgsArr[globalImgIndex].style.content;
    mainImg.style.content = content;
};

let interval = 0;

function startCycle() {
    let cycleImgIndex = globalImgIndex;
    let content = "";
    interval = setInterval(() => {
        content = allImgs[cycleImgIndex].style.content;
        mainImg.style.content = content;
        if (cycleImgIndex < (allImgsLength - 1)) {
            cycleImgIndex++;
        } else {
            cycleImgIndex = 0;
        }
        globalImgIndex = cycleImgIndex;
    }, 1000);
};

function stopCycle() {
    clearInterval(interval);
};