// 

// let chText = document.querySelector(".changed-text");

// function changeText() {
//     let ta = document.querySelector("#textToChange");
//     let text = ta.innerText;
//     for (let i = 0; i < allCheckBoxes.length; i++) {
//         if (allCheckBoxes[i].checked == true) {

//         }
//     }
// };


let allCheckBoxes = Array.from(document.querySelectorAll("input[type='checkbox']"));
allCheckBoxes.forEach((x) => {
    x.addEventListener("click", checkedChanged);
});

let allRb = document.querySelectorAll("input[type='radio']");
allRb.forEach((x) => {
    x.addEventListener("click", rbCheckedChanged);
});

let btn = document.querySelector("button");
btn.addEventListener("click", changeTextClick);

let chText = document.querySelector(".changed-text");
chText.style.display = "none";
let styles = [];
let prevStyles = [];
let fontStyle = "";

function checkedChanged(event) {
    let element = event.target;
    let name = element.getAttribute("name");
    if (element.checked == true) {
        styles.push(name);

    } else {
        let index = styles.indexOf(name);
        styles.splice(index, 1);
    }
};

function rbCheckedChanged(event) {
    let element = event.target;
    fontStyle = element.id;
};

function changeTextClick() {
    let ta = document.querySelector("#textToChange");
    let text = ta.value;

    for (let i = 0; i < prevStyles.length; i++) {
        chText.classList.remove(prevStyles[i]);
    }

    if (fontStyle != "") {
        styles.push(fontStyle);
    }

    for (let i = 0; i < styles.length; i++) {
        chText.classList.add(styles[i]);
    }

    prevStyles = styles;
    chText.innerText = text;
    chText.style.display = "inline-block";
    ta.innerText = "";
}