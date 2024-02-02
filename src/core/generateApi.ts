import { LoginResponseDTO } from "@/api/dto/auth.dto";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

export const generateResponse = (cookiesInstance: any, api: AxiosInstance) => {
  return async (error: any) => {
    try {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          const originalReq = error.config;
          const rt = cookiesInstance.get("refresh_token");
          if (!rt) return Promise.reject(error);
          const extractedToken = typeof rt === "object" ? rt.value : rt;
          const {
            data: { access_token, refresh_token },
            status
          } = await axios.post<LoginResponseDTO>(
            process.env.NEXT_PUBLIC_API_URL + "auth/refresh",
            {},
            {
              headers: {
                Authorization: "Bearer " + extractedToken,
              },
            }
          )
          console.log(access_token, refresh_token, status)
          try {
            cookiesInstance.set("access_token", access_token, { secure: true });
            cookiesInstance.set("refresh_token", refresh_token, {
              secure: true,
              expires: 30,
            });
          } catch(err) {
            console.log(err)
          }
          
          return originalReq && api.request(originalReq);
        }
      }
      return Promise.reject(error);
    } catch(err) {
      console.log(err)
    }
    };
};

export const generateRequest =
  (cookiesInstance: any) => (config: InternalAxiosRequestConfig) => {
    let at;
    at = cookiesInstance.get("access_token");
    config.headers.Authorization =
      "Bearer " + (typeof at === "object" ? at.value : at);
    return config;
  };
