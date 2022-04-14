import axios from 'axios';

const token = localStorage.getItem('Authorization');
const api = axios.create({

    baseURL: 'https://jornada-back.herokuapp.com'
})

if (token) {
    api.defaults.headers['Authorization'] = `${token}`
}

api.interceptors.request.use(config => {
    //console.log(config)

    return config
})

api.version = "/v1/"

export default api;
