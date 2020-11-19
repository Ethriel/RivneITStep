import axios from "axios";

const setAxiosToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.common["Authorization"];
    }
};

export default setAxiosToken;