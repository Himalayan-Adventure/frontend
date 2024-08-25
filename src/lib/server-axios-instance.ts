/**
 * Reusable axios instance with cookie attached on headers
 */
import { cookies } from "next/headers";
import axios from "axios";

import "server-only";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const cookieStore = cookies();
//     // TODO:- Update the key to the actual key where the token is stored
//     const token = cookieStore.get("jwt");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token.value}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// No need to use response interceptor as we are not handling any error globally (for now)