import axios from "axios";

export const baseURL = process.env.REACT_APP_PROD_URL;

export const axiosApi = axios.create({ baseURL });

export const multipartHeader = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const token = localStorage.getItem("accessToken");

if (token) {
  axiosApi.defaults.headers.common["x-access-token"] = token;
}

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error?.response?.data?.message.includes("x-access-token") ||
      error?.response?.status === 401
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
