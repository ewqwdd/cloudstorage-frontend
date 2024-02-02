import { useContext } from "react";
import { gestureSpringContext } from "./ui/GestureSpringProvider";

export const useGestureSpringProvider = () => useContext(gestureSpringContext)