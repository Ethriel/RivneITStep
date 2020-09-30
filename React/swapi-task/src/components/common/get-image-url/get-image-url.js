import { BASE_FILMS_IMG_URL, BASE_PEOPLE_IMG_URL, BASE_PLANETS_IMG_URL } from "../../constants";

const getImageUrl = (type, id) => {
    let url = "";

    switch (type) {
        case "films":
            url = `${BASE_FILMS_IMG_URL}${id}.jpg`
            break;
        case "people":
            url = `${BASE_PEOPLE_IMG_URL}${id}.jpg`
            break;
        case "planets":
            url = `${BASE_PLANETS_IMG_URL}${id}.jpg`
            break;
        default:
            break;
    }

    return url;
}

export default getImageUrl;