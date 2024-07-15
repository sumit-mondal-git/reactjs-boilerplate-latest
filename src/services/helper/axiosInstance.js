import axios from "axios";
import packageJson from "../../../package.json";
const baseURL = "https://farmerbazar.in/api/rnv1/"; //process.env.REACT_APP_API_URL;
const apiVersion = packageJson.version;

let accessToken = "";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "",
    // version: `${apiVersion}`,
  },
});
axiosInstance.interceptors.request.use(
  async (request) => {
    // request.headers.Authorization = accessToken || "";
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    return Promise.reject(error);
  }
);
export default axiosInstance;
