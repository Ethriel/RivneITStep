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
            const elem = clearNodeChildren("listNews");

            for (let i = 0; i < fetchedNews.length; i++) {
                elem.append(getNewsCard(fetchedNews[i]));
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
            windowLoaded();
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
            windowLoaded();
        })
        .catch((reason) => {
            console.log(reason);
        });
};

const showDetails = (id) => {
    let news = fetchedNews.find((x) => {
        return x.id == id;
    });
    console.log(news);
    const elem = clearNodeChildren("newsModal");
    elem.append(getModal(news));
};

const getModal = (news) => {
    const modal = createElement("div", "modal fade show");
    modal.setAttribute("id", "exampleModal");
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("tabindex", "-1");

    const modalDialog = createElement("div", "modal-dialog");
    modalDialog.setAttribute("role", "document");

    const modalContent = createElement("div", "modal-content");

    const img = createElement("img", "card-img-top card-img-my");
    img.src = news.imagePath;

    const modalHeader = createElement("div", "modal-header");

    const h5 = createElement("h5", "modal-title");
    h5.setAttribute("id", "exampleModalLabel");
    h5.innerText = news.title;

    const modalBody = createElement("div", "modal-body");

    const p = createElement("p", "text-center");
    p.innerText = news.description;

    const modalFooter = createElement("div", "modal-footer");

    const btnClose = createElement("button", "btn btn-secondary");
    btnClose.setAttribute("type", "button");
    btnClose.dataset.dismiss = "modal";
    btnClose.innerText = "Close";

    modalFooter.append(btnClose);
    modalBody.append(p);
    modalHeader.append(h5);

    modalContent.append(img, modalHeader, modalBody, modalFooter);

    modalDialog.append(modalContent);

    modal.append(modalDialog);

    return modal;
};

const getNewsCard = (news) => {
    const col = createElement("div", "col-md-3");

    const card = createElement("div", "card");

    const img = createElement("img", "card-img-top card-img-my");
    img.src = news.imagePath;

    const cardBody = createElement("div", "card-body");

    const h5 = createElement("h5", "card-title");
    h5.innerText = news.title;

    const p = createElement("p", "text-left");
    p.innerText = `Date: ${news.postDate}`;

    const buttonsContainer = createElement("div", "d-flex flex-row justify-content-between");

    const btnReadMore = createElement("button", "btn-sm btn-primary");
    btnReadMore.onclick = function () { showDetails(news.id); };
    btnReadMore.innerText = "Read more";
    btnReadMore.dataset.toggle = "modal";
    btnReadMore.dataset.target = "#exampleModal";

    const btnDelete = createElement("button", "btn-sm btn-danger");
    btnDelete.onclick = function () { removeNews(news.id); };

    const icon = createElement("i", "fa fa-trash");

    btnDelete.append(icon);
    buttonsContainer.append(btnReadMore, btnDelete);
    cardBody.append(h5, p, buttonsContainer);
    card.append(img, cardBody);
    col.append(card);

    return col;
};

const clearNodeChildren = (id) => {
    const elem = document.getElementById(id);

    while (elem.firstChild) {
        elem.removeChild(elem.lastChild);
    }

    return elem;
}

const createElement = (type, className) => {
    const elem = document.createElement(type);
    elem.className = className;
    return elem;
}