const createNewsClick = () => {
    const title = document.querySelector("#newsTitle").value;
    console.log(title);

    const description = document.querySelector("#newsDescription").value;
    console.log(description);

    const createNewsViewModel = {
        title: title,
        postDate: null,
        ImagePath: null,
        description: description
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://localhost:44340/api/News/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(createNewsViewModel));
}