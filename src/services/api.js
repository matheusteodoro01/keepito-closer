import axios from "axios";

const token = localStorage.getItem("keepitoAuthorization");
const api = axios.create({
  baseURL: "https://jornda-user-service.herokuapp.com/",
});

if (token) {
  api.defaults.headers.authorization = `${token}`
}
api.version = "/v1/";
export default api;
