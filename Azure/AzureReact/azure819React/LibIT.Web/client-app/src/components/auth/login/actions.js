import LoginService from './service';

export const loginUser = (model) => {
    return (dispatch) => {
        LoginService.loginUser(model, dispatch)
    }
};

export const logOutUser = () => {
    return (dispatch) => {
        LoginService.logOutUser(dispatch);
    }
}