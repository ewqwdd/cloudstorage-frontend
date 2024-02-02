import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  NotificationsList,
  NotificationsProvider,
} from "@/entity/Notification";
import VStack from "@/shared/ui/VStack";
import { Navbar } from "@/components/NavBar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUPERCLOUD",
  description: "Simple file storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className + " overflow-x-clip"}>
          <Navbar />
          {children}
          <VStack className="fixed right-2 bottom-2 gap-4">
            <NotificationsList />
          </VStack>
          
        </body>
      </Providers>
    </html>
  );
}
