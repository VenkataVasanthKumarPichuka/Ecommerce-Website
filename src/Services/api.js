import axios from "axios";

const API = axios.create({
  baseURL: "https://fashion-spot.onrender.com/api",
});

export default API;