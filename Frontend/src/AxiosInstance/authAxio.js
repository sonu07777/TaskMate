import axios from "axios";

// const BASE_URL = "http://localhost:5020";
const BASE_URL = "https://taskmate-2bqh.onrender.com";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
