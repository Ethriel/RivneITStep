import * as types from './types';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem("token");
let name = "Профіль";
let image = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-illustration-132483587.jpg";
let isLoggedIn = false;
if (token) {
    isLoggedIn = true;
    const decoded = jwt_decode(token);
    if (decoded) {
        name = decoded.name;
        if (!!decoded.image) {
            image = decoded.image;
        }
        else {
            image = decoded.defaultImage
        }
    }
}

const intialState = {
    loading: false,
    errors: {},
    token: token,
    name: name,
    image: image,
    isLoggedIn: isLoggedIn,
}

export const loginReducer = (state = intialState, action) => {
    // console.log("Reducer working", action);
    // console.log("ACTION", action);
    switch (action.type) {
        case types.LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                errors: {}
            }

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {}
            }

        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
        case types.LOGIN_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case types.LOGIN_USER:
            return {
                ...state,
                name: action.payload
            }
        case types.LOGIN_IMAGE:
            return {
                ...state,
                image: action.payload
            }
        case types.LOGIN_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            break;
    }
    return state;
}