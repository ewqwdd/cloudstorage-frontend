"use server";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const $apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$apiServer.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  "use server";
  let at;
  at = cookies().get("access_token");
  config.headers.Authorization =
    "Bearer " + (typeof at === "object" ? at.value : at);
  return config;
});
