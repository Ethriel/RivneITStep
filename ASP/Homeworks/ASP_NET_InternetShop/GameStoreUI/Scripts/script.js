const setDeveloper = event => {
    const target = event.target;
    const value = target.getAttribute("id");
    const name = encodeURI(value);
    $("#games").load(`/Home/Filter?type=Developer&name=${name}`);
};

const setGenre = event => {
    const target = event.target;
    const value = target.getAttribute("id");
    const name = encodeURI(value);
    $("#games").load(`/Home/Filter?type=Genre&name=${name}`);
};

const searchClick = event => {
    const input = document.querySelector("#search");
    const value = input.value;
    $("#games").load(`/Home/Search?criteria=${value}`);
};