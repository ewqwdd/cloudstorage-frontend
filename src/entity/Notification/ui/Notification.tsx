"use client";

import { DragEvent, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./Notification.module.css";
import VStack from "@/shared/ui/VStack";
import { Notification, NotificationVariant } from "../model/notification.type";
import XIcon from "@/shared/icons/x.svg";

interface NotificationProps extends Notification {
  Close: () => void;
}

const wrapper: Record<NotificationVariant, string> = {
  default: "text-zinc-700 [&>h1]:text-zinc-800 border border-zinc-400",
  error: "bg-red-900 text-zinc-100 [&>h1]:text-zinc-300 border border-red-950",
  warning:
    "bg-yellow-300 text-zinc-700 [&>h1]:text-zinc-800 border border-yellow-700",
};

export default function Notification({
  Close,
  children,
  id,
  autoClose = true,
  label,
  timeToClose = 10000,
  variant = "default",
}: NotificationProps) {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const closeWithAnimation = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      Close?.();
      setIsClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(closeWithAnimation, timeToClose);
    return () => {
      clearTimeout(timeout);
    };
  }, [closeWithAnimation, timeToClose]);
  return (
    <VStack
      className={[
        "p-4 rounded-lg relative",
        styles.notification,
        isClosing ? styles.closing : "",
        wrapper[variant],
      ].join(" ")}
    >
      <XIcon onClick={closeWithAnimation} className="h-6 w-6 absolute right-1 top-1 text-zinc-400 hover:text-zinc-500 cursor-pointer transition-all" />
      {label ? <h3 className="text-xl font-semibold">{label}</h3> : null}
      {children}
    </VStack>
  );
}
