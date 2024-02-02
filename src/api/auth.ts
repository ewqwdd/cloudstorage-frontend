import { LoginFormDTO, LoginResponseDTO } from "./dto/auth.dto";
import { $api } from "@/core/$api";
import Cookies from "js-cookie";

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await $api.post<LoginResponseDTO>("/auth/local/login", values)).data;
};

export const register = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await $api.post<LoginResponseDTO>("/auth/local/register", values)).data;
};

export const clientLogout = () => {
  Cookies.remove('refresh_token')
  Cookies.remove('access_token')
}