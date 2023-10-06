import $axios from "axios";

const checkEnv = (envValue: string): string => {
  return envValue || "/";
};

function getAuthHeader() {
  const getToken = localStorage.getItem("token");
  if (getToken) {
    return { Authorization: `Bearer ${getToken}` };
  } else {
    return {};
  }
}

const apiUrl = `${checkEnv(import.meta.env.VITE_BASE_URL)}`;

const axios = $axios.create();

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      baseURL: apiUrl,
      headers: { ...config.headers, ...getAuthHeader },
    };
  },
  async (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

export default axios;
