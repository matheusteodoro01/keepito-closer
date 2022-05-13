import axios from "axios";

const token = localStorage.getItem("Authorization");
const api = axios.create({
  baseURL: "http://45.79.204.34:8080",
});

if (token) {
  api.defaults.headers["Authorization"] = `${token}`;
}

api.interceptors.request.use((config) => {
  //console.log(config)

  return config;
});

api.version = "/v1/";

export default api;
