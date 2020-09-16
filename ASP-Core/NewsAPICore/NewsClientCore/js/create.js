const postNews = () => {
    const title = document.getElementById("addTitle").value;
    const description = document.getElementById("addDescription").value;
    const date = document.getElementById("addDate").value;
    const image = document.getElementById("addImage").value;

    const createNewsViewModel = {
        title: title,
        postDate: date,
        imagePath: image,
        description: description
    };

    fetch("https://localhost:44340/api/News/add", {
        method: "POST",
        body: JSON.stringify(createNewsViewModel),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            alert(data.message);
        })
        .catch((reason) => {
            console.log(reason);
        });
};
