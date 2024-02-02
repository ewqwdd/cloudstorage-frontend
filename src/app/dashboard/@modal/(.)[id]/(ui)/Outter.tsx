"use client";
import VStack from "@/shared/ui/VStack";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface OutterProps {
  children: ReactNode;
}

export default function Outter({ children }: OutterProps) {
  const router = useRouter();
  const back = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <VStack
      onClick={back}
      className="justify-center top-0 left-0 items-center absolute w-full h-full bg-black/40"
    >
      {children}
    </VStack>
  );
}
