import axios from "axios";
import aspida from "@aspida/axios";

import { STORAGE_KEY_TOKEN } from "@/lib/constants";

import sdk from "./$api";
import env from "@/config/env";
import useAuthStore from "@/store/auth";

const http = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Accept": "application/json"
  }
});

http.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      //Server side
      return config;
    } else {
      // Client side
      const token = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === "undefined") {
      if (error?.response?.status === 401) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export const fgApi = sdk(aspida(http));
