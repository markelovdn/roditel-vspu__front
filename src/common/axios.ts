import $axios from "axios";

const checkEnv = (envValue: string): string => {
  return envValue || "/";
};

const apiUrl = `${checkEnv(import.meta.env.VITE_BASE_URL)}`;

const axios = $axios.create();

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      baseURL: apiUrl,
    };
  },
  async (err) => Promise.reject(err),
);

export default axios;
