import axios from "axios";

export const pokeAdapter = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 1000,
});
