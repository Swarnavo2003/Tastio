import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});
