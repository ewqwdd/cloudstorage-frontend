import { useContext } from "react";
import { notificationsContext } from "./notificationsContext";

export const useNotify = () => useContext(notificationsContext)