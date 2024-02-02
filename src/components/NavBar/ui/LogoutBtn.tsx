"use client";

import Button from "@/shared/ui/Button";
import HStack from "@/shared/ui/HStack";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface LogoutBtnProps {
  className?: string
}

export default function LogoutBtn({className}: LogoutBtnProps) {
  const session = useSession();
  const logoutFunc = useCallback(() => {
    signOut({
      callbackUrl: "/",
    });
  }, []);
  const login = useCallback(() => {
    signIn("credentials", {
      redirect: true,
    });
  }, []);
  if (session.data?.user.profile)
    return (
      <HStack className={twMerge("ml-auto self-center gap-2 ", className)}>
        <span className="text-slate-300 font-medium self-center">
          {session.data?.user.profile.email}
        </span>
        <Button className="bg-red-900 text-zinc-200" onClick={logoutFunc}>
          Logout
        </Button>
      </HStack>
    );

  return (
    <Button className="ml-auto self-center" onClick={login}>
      Login
    </Button>
  );
}
