import $axios from "axios";

import notify from "@/utils/notify";

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
    notify({ type: "negative", message: "Не удалось запросить данные" });
    console.log(err);
    return Promise.reject(err);
  },
);

export default axios;
