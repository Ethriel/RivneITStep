import * as types from './types';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem("token");
let name = "Профіль";
if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
        name = decoded.name
    }
}

const intialState = {
    loading: false,
    errors: {},
    token: token,
    name: name
}

export const loginReducer = (state = intialState, action) => {
    // console.log("Reducer working", action);
    console.log("ACTION", action);
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
                loading: false,
                token: action.payload
            }
        case types.LOGIN_USER:
            return {
                ...state,
                loading: false,
                name: action.payload
            }
        default:
            break;
    }
    return state;
}