import axios from 'axios';
import { serverUrl } from '../../../config';
import { push } from 'connected-react-router';
import jwt_decode from 'jwt-decode';
import * as types from './types';
import setAxiosToken from './set-axios-token';

export default class LoginService {
    static loginUser(model, dispatch) {
        dispatch({ type: types.LOGIN_STARTED });
        axios.post(`${serverUrl}api/Account/login`, model)
            .then((response) => {
                // console.log(response);
                const token = response.data.token;
                localStorage.setItem("token", token);
                setAxiosToken(token);
                const decoded = jwt_decode(token);
                const image = decoded.image;
                const name = decoded.name;

                dispatch({ type: types.LOGIN_USER, payload: name });
                dispatch({ type: types.LOGIN_TOKEN, payload: token });
                dispatch({ type: types.LOGIN_IMAGE, payload: image });
                dispatch({ type: types.LOGIN_IS_LOGGED_IN, payload: true });
                dispatch({ type: types.LOGIN_SUCCESS });
                dispatch(push('/'));

            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.LOGIN_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    };

    static logOutUser(dispatch) {
        dispatch({ type: types.LOGIN_STARTED });

        localStorage.removeItem("token");
        dispatch({ type: types.LOGIN_IS_LOGGED_IN, payload: false });
        dispatch({ type: types.LOGIN_USER, payload: undefined });
        dispatch({ type: types.LOGIN_TOKEN, payload: undefined });
        dispatch({ type: types.LOGIN_IMAGE, payload: undefined });
        dispatch({ type: types.LOGIN_SUCCESS });
        dispatch(push('/'));
    }
}
