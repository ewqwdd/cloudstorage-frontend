'use client'
import { NotificationsProvider } from "@/entity/Notification";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  mobile?: boolean
}

export default function Providers({ children, mobile }: ProvidersProps) {
  return (
    <SessionProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </SessionProvider>
  );
}
