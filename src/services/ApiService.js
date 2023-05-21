import Axios from "axios";

export const axios = Axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL: "http://localhost:8080",
});
