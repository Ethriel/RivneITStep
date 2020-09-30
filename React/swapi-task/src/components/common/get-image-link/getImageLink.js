import getImageUrl from "../get-image-url/get-image-url";

const getImageLink = (link, type) => {
    const spl = link.split("/");
    spl.pop();
    let id = +spl.pop();
    if (type === "people" && id === 17) {
        id++;
    }
    const img = getImageUrl(type, id);

    return {
        img: img,
        id: id
    };
};

export default getImageLink;