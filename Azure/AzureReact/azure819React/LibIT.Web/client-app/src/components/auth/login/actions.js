import * as types from './types';
import LoginService from './service';
import { push } from 'connected-react-router';
import jwt_decode from 'jwt-decode';

export const loginUser = (model) => {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_STARTED });
        LoginService.loginUser(model)
            .then((response) => {
                // console.log(response);
                const token = response.data.token;
                localStorage.setItem("token", token);
                const decoded = jwt_decode(token);
                const name = decoded.name;
                console.log("NAME IN LOGIN", name);
                dispatch({ type: types.LOGIN_USER, payload: name });
                dispatch({ type: types.LOGIN_TOKEN, payload: token });
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

    }
}