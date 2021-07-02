import api from "../_configs/api";

const POST_REGISTER_LOADING = "POST_REGISTER_LOADING";
const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
const POST_REGISTER_ERROR = "POST_REGISTER_ERROR";
const POST_REGISTER_RESET = "POST_REGISTER_RESET";

const POST_LOGIN_LOADING = "POST_LOGIN_LOADING";
const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
const POST_LOGIN_RESET = "POST_LOGIN_RESET";

const initState = {
    isLoadingPostRegister: false,
    register: null,
    errorPostRegister: null,

    isLoadingPostLogin: false,
    auth: null,
    errorPostLogin: null,
};

const auth = (state = initState, action) => {
    switch (action.type) {
        case POST_REGISTER_LOADING:
            return {
                ...state,
                isLoadingPostRegister: true,
                register: null,
                errorPostRegister: null,
            };

        case POST_REGISTER_SUCCESS:
            return {
                ...state,
                isLoadingPostRegister: false,
                register: action.payload.data,
                errorPostRegister: null,
            };

        case POST_REGISTER_ERROR:
            return {
                ...state,
                isLoadingPostRegister: false,
                register: null,
                errorPostRegister: action.payload,
            };
        case POST_REGISTER_RESET:
            return {
                ...state,
                isLoadingPostRegister: false,
                register: null,
                errorPostRegister: null,
            };

        case POST_LOGIN_LOADING:
            return {
                ...state,
                isLoadingPostLogin: true,
                auth: null,
                errorPostLogin: null,
            };

        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                isLoadingPostLogin: false,
                auth: action.payload.data,
                errorPostLogin: null,
            };

        case POST_LOGIN_ERROR:
            return {
                ...state,
                isLoadingPostLogin: false,
                auth: null,
                errorPostLogin: action.payload,
            };
        case POST_LOGIN_RESET:
            return {
                ...state,
                isLoadingPostLogin: false,
                auth: null,
                errorPostLogin: null,
            };
        default:
            return { ...state };
    }
};
export default auth;

export const postRegister = (form) => async (dispatch) => {
    try {
        dispatch({ type: POST_REGISTER_LOADING });
        await api.postRegister(form);
        dispatch({
            type: POST_REGISTER_SUCCESS,
            payload: { data: true },
        });
    } catch (err) {
        dispatch({ type: POST_REGISTER_ERROR, payload: err });
    }
};

export const resetPostRegister = () => async (dispatch) => {
    dispatch({ type: POST_REGISTER_RESET });
};

export const postLogin = (form) => async (dispatch) => {
    try {
        dispatch({ type: POST_LOGIN_LOADING });
        const res = await api.postLogin(form);
        dispatch({
            type: POST_LOGIN_SUCCESS,
            payload: { data: res.data.data },
        });
    } catch (err) {
        dispatch({ type: POST_LOGIN_ERROR, payload: err });
    }
};

export const resetPostLogin = () => async (dispatch) => {
    dispatch({ type: POST_LOGIN_RESET });
};
