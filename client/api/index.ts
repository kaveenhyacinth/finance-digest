import axios from "axios";
import aspida from "@aspida/axios";

import { STORAGE_KEY_TOKEN } from "@/lib/constants";

import sdk from "./$api";
import env from "@/config/env";

const http = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
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

// http.interceptors.response.use();

export const fgApi = sdk(aspida(http));
