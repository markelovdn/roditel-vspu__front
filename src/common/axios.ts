import $axios from "axios";

const checkEnv = (envValue: string): string => {
  return envValue || "/";
};

const checkToken = (token: string): string => {
  return `Bearer ${token}` || "";
};

const apiUrl = `${checkEnv(import.meta.env.VITE_BASE_URL)}`;

const axios = $axios.create();

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      baseURL: apiUrl,
      headers: {
        Authorization: `${checkToken(localStorage.token)}`,
      },
    };
  },
  async (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

export default axios;
