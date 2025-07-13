import axios from "axios";

export const cobbleAdapter = axios.create({
  baseURL: "https://shaky-marcella-breaper03-1ab1a441.koyeb.app/",
  // baseURL: "http://localhost:3001/",
  timeout: 3000,

});