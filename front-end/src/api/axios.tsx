import axios from "axios";
import { API_CONNECTION_STRING } from '../../next.config'

const api = axios.create({
  baseURL: API_CONNECTION_STRING,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;