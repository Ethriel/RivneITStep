let fetchedNews = [];
const windowLoaded = () => {
    fetch("https://localhost:44340/api/News/get", {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            fetchedNews = data.data;
            for (let i = 0; i < fetchedNews.length; i++) {
                document.getElementById("listNews").innerHTML +=
                    `
            <div class="col-md-4">
                <div class="card" data-newsId=${fetchedNews[i].id}>
                    <img class="" src=${fetchedNews[i].imagePath} alt="News img" style="max-height: 200px;>
                    <div class="card-body">
                        <h5 class="card-title">${fetchedNews[i].title}</h5>
                        <div class="d-flex flex-row justify-content-between">
                            <button class="btn-sm btn-primary" onclick="showDetails(${fetchedNews[i].id})" data-toggle="modal" data-target="#exampleModal">Read more</button>
                            <button class="btn-sm btn-danger" onclick="removeNews(${fetchedNews[i].id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                      </div>
                </div>
            </div>
            `
            }
        })
        .catch((reason) => {
            console.log(reason);
        });
};

windowLoaded();

const removeNews = (id) => {
    fetch(`https://localhost:44340/api/News/remove/${id}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((reason) => {
            console.log(reason);
        });
};

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
            console.log(response)
        })
        .catch((reason) => {
            console.log(reason);
        });
};

const showDetails = (id) => {
    console.log(id);
    let news = fetchedNews.find((x) => {
        return x.id == id;
    });
    console.log(news);

    document.getElementById("newsModal").innerHTML =
        `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <img src="${news.imagePath}" class="card-img-top" alt="..." height="100px">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${news.title}</h5>
            </div>
            <div class="modal-body">
                <p>${news.description}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`
};