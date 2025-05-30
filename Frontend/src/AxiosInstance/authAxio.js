import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
// const BASE_URL = "https://taskmate-2bqh.onrender.com"; 

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
