import axios from "axios";

export const api = axios.create({
  baseURL: "http://0.0.0.0:8080",
});

api.interceptors.request.use(
  (config) => {
    // take token from env
    const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
