import axios from "axios";

export const cobbleAdapter = axios.create({
  baseURL: "https://cobble-server.onrender.com/",
  timeout: 3000,

});