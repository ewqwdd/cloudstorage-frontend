import { $api } from "@/core/$api";
import { $apiServer } from "@/core/$apiServer";
import { User } from "@/entity/User";

export const getMe = async (): Promise<User> => {
  return (await $api.get<User>("/users/me")).data;
};
export const getMeServer = async (): Promise<User> => {
  return (await $apiServer.get<User>("/users/me")).data;
};
