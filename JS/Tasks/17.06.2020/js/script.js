window.onload = populateWithColors;
let numberInput = document.querySelector("#numberInput");
numberInput.addEventListener("keypress", forbidInputNumbers);

function forbidInputNumbers(evt) {
    evt.preventDefault();
};

function randomInRange(min, max) {
    return Math.trunc(min + Math.random() * (max - min + 1));
};

function randomColor() {
    let red = randomInRange(0, 255);
    let green = randomInRange(0, 255);
    let blue = randomInRange(0, 255);
    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
};

let colorBlocksContainer = document.querySelector(".color-blocks-container");

function clickAddBlockWithBg() {
    let block = document.createElement("div");
    block.classList.add("color-block");
    block.style.backgroundColor = randomColor();
    block.addEventListener("click", deleteBlock);
    colorBlocksContainer.appendChild(block);
};

function deleteBlock() {
    colorBlocksContainer.removeChild(this);
};

let paletteContainer = document.querySelector(".palette-container");
let parCol = document.querySelector(".text-after-palette");

function populateWithColors() {
    let colors = [];
    let goal = 20;
    let current = 1;
    let color = "";
    while (current != goal) {
        color = randomColor();
        if (colors.includes(color, 0)) {
            continue;
        } else {
            let colBlock = document.createElement("div");
            colBlock.addEventListener("click", paletteClick);
            colBlock.classList.add("color-palette");
            colors.push(color);
            current++;
            colBlock.style.backgroundColor = color;
            colBlock.setAttribute("data-color", color);
            paletteContainer.appendChild(colBlock);
        }
    }
};

function paletteClick() {
    parCol.style.color = this.getAttribute("data-color");
};


let commentsSection = document.querySelector(".comments-section");

function addCommentClick() {
    let nameInput = document.querySelector("#commName");
    let nameValue = nameInput.value;
    let commentArea = document.querySelector("textarea");
    let commentValue = commentArea.value;
    
    if (nameValue == "" || nameValue == null) {
        alert("Enter your name, please");
    }
    else if (commentValue == "" || commentValue == null) {
        alert("Enter a comment, please");
    } else {
        let commentDiv = document.createElement("div");
        commentDiv.style.border = "1px solid black";
        let dateValue = (new Date()).toDateString();
        let name = document.createElement("p");
        name.innerText = nameValue;
        let date = document.createElement("p");
        date.innerText = dateValue;
        let comment = document.createElement("p");
        comment.innerText = commentValue;
        commentDiv.appendChild(name);
        commentDiv.appendChild(date);
        commentDiv.appendChild(comment);
        commentsSection.appendChild(commentDiv);
        nameInput.value = "";
        commentValue = "";
    }
}