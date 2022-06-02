import axios from "axios";

const token = localStorage.getItem("keepitoAuthorization");
const api = axios.create({
  baseURL: "http://45.79.204.34:8080",
});

if (token) {
  api.defaults.headers.authorization = `${token}`
}

export default api;
