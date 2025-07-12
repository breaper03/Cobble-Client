import axios from "axios";

export const cobbleAdapter = axios.create({
  baseURL: "https://shaky-marcella-breaper03-1ab1a441.koyeb.app/",
  // baseURL: "https://cobble-server.onrender.com/",
  timeout: 3000,

});