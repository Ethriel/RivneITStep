let allCarets = document.querySelectorAll(".my-caret");
let modal = document.getElementById("exampleModalCenter");
let pInModal = modal.querySelector(".my-modal-body p");


for (caret of allCarets) {
    caret.addEventListener("mouseover", caretMouseOver);
    caret.addEventListener("mouseout", caretMouseOut);
}

function onClickMenuItem(number) {
    let subItems = document.querySelector(`.my-sub-items-${number}`);
    subItems.classList.toggle("display-none");
};

function caretMouseOver() {
    this.classList.remove("caret-rotate-bottom");
    this.classList.add("caret-rotate-top");
};

function caretMouseOut() {
    this.classList.remove("caret-rotate-top");
    this.classList.add("caret-rotate-bottom");
};

function showModal(number) {
    let className = "";
    let prevClassName = "";
    let length = 0;
    switch (number) {
        case 1:
            className = "language";
            break;
        case 2:
            className = "notification";
            break;
        case 3:
            className = "privacy";
            break;
        default:
            return;
    }
    console.log("CURRENT:", className);
    if (!pInModal.classList.contains(className)) {
        // remove previous class
        length = pInModal.classList.length;
        prevClassName = pInModal.classList[length - 1];
        console.log("PREV:", prevClassName);
        pInModal.classList.remove(prevClassName);
        // add current class
        pInModal.classList.add(className);
    }
    // show modal
    modal.style.display = "block";
};