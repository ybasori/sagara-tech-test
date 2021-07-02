import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://yusuf-tes-soal-3.herokuapp.com/api/v1",
    timeout: 3000,
});

const api = {
    getProvince: () => instance.get(`/wilayah`),
    getKota: (id) => instance.get(`/wilayah/${id}`),
    postRegister: (form) => instance.post(`/auth/register`, form),
    postLogin: (form) => instance.post(`/auth/login`, form),
};

export default api;
