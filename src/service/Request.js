import axios from "axios";
import consts from "./consts";

const api = axios.create({
  baseURL: consts.baseUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content type, Accept"
  },
});

export default api;