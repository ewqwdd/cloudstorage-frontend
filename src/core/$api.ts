import axios from "axios";
import Cookies from "js-cookie";
import { generateRequest, generateResponse } from "./generateApi";

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$api.interceptors.request.use(generateRequest(Cookies));

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  generateResponse(Cookies, $api)
);
