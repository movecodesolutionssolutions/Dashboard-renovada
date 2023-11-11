import axios from "axios";

export const api = new axios.create({
  baseURL: "https://api-renovada-production.up.railway.app",
});
