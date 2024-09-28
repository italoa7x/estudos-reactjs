import axios from "axios";
import { BASE_URL } from "../utils/base-url";
import { getItem } from "../utils/session-storage";
const api = axios.create();

let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const token = getItem("token");
if (token) {
  headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

api.defaults.headers = headers;
api.defaults.url = BASE_URL;

export default api;
