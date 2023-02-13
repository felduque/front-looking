import axios from "axios";
const BASE_URL = "https://front-looking.vercel.app";

export default axios.create({
  baseURL: BASE_URL,
});
