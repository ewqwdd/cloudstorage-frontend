import VStack from "@/shared/ui/VStack";
import React from "react";
import Forms from "./Forms";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Login",
};

export default function Auth() {
  return (
    <main>
      <VStack className="max-w-xl shadow-md rounded-lg px-6 md:px-12 py-8 mx-auto mt-10">
        <Forms />
      </VStack>
    </main>
  );
}
