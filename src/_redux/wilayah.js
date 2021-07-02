import api from "../_configs/api";

const GET_PROVINCE_LOADING = "GET_PROVINCE_LOADING";
const GET_PROVINCE_SUCCESS = "GET_PROVINCE_SUCCESS";
const GET_PROVINCE_ERROR = "GET_PROVINCE_ERROR";

const GET_KOTA_LOADING = "GET_KOTA_LOADING";
const GET_KOTA_SUCCESS = "GET_KOTA_SUCCESS";
const GET_KOTA_ERROR = "GET_KOTA_ERROR";
const GET_KOTA_RESET = "GET_KOTA_RESET";

const initState = {
    isLoadingGetProvince: false,
    province: null,
    errorGetProvince: null,

    isLoadingGetKota: false,
    kota: null,
    errorGetKota: null,
};

const wilayah = (state = initState, action) => {
    switch (action.type) {
        case GET_PROVINCE_LOADING:
            return {
                ...state,
                isLoadingGetProvince: true,
                province: null,
                errorGetProvince: null,
            };

        case GET_PROVINCE_SUCCESS:
            return {
                ...state,
                isLoadingGetProvince: false,
                province: action.payload.data,
                errorGetProvince: null,
            };

        case GET_PROVINCE_ERROR:
            return {
                ...state,
                isLoadingGetProvince: false,
                province: null,
                errorGetProvince: action.payload,
            };

        case GET_KOTA_LOADING:
            return {
                ...state,
                isLoadingGetKota: true,
                kota: null,
                errorGetKota: null,
            };

        case GET_KOTA_SUCCESS:
            return {
                ...state,
                isLoadingGetKota: false,
                kota: action.payload.data,
                errorGetKota: null,
            };

        case GET_KOTA_ERROR:
            return {
                ...state,
                isLoadingGetKota: false,
                kota: null,
                errorGetKota: action.payload,
            };
        case GET_KOTA_RESET:
            return {
                ...state,
                isLoadingGetKota: false,
                kota: null,
                errorGetKota: null,
            };
        default:
            return { ...state };
    }
};
export default wilayah;

export const getProvince = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PROVINCE_LOADING });
        const res = await api.getProvince();
        dispatch({
            type: GET_PROVINCE_SUCCESS,
            payload: { data: res.data.data },
        });
    } catch (err) {
        dispatch({ type: GET_PROVINCE_ERROR, payload: err });
    }
};

export const getKota = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_KOTA_LOADING });
        const res = await api.getKota(id);
        dispatch({
            type: GET_KOTA_SUCCESS,
            payload: { data: res.data.data },
        });
    } catch (err) {
        dispatch({ type: GET_KOTA_ERROR, payload: err });
    }
};
export const resetGetKota = () => async (dispatch) => {
    dispatch({ type: GET_KOTA_RESET });
};
