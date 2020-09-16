
const fetchNews = () => {
    const id = +localStorage.getItem("editNewsId");

    fetch(`https://localhost:44340/api/News/get/${id}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const news = data.data;
            document.getElementById("newsTitle").value = news.title;
            document.getElementById("newsDescription").value = news.description;
            document.getElementById("newsImageURL").value = news.imagePath;
            document.getElementById("newsDate").value = news.postDate;
        })
        .catch((reason) => {
            console.log(reason);
        })
};

const confirmEdit = () => {
    const id = +localStorage.getItem("editNewsId");
    const title = document.getElementById("newsTitle").value;
    const description = document.getElementById("newsDescription").value;
    const image = document.getElementById("newsImageURL").value;
    const date = document.getElementById("newsDate").value;

    const createNewsViewModel = {
        title: title,
        postDate: date,
        imagePath: image,
        description: description
    };

    fetch(`https://localhost:44340/api/News/update/${id}`, {
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

document.getElementById("btnConfirm").addEventListener("click", confirmEdit);

fetchNews();