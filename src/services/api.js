import axios from "axios";

const token = localStorage.getItem("keepitoAuthorization");
const api = axios.create({
  baseURL: "https://jornada-back.herokuapp.com",
});

if (token) {
  api.defaults.headers.authorization = `${token}`
}
api.version = "/v1/";
export default api;
