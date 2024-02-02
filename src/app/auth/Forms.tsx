"use client";

import { LoginFormAsync } from "@/components/LoginForm";
import { RegisterFormAsync } from "@/components/RegisterForm";
import HStack from "@/shared/ui/HStack";
import { Spinner } from "@/shared/ui/Spinner";
import Tabs from "@/shared/ui/Tabs/ui/Tabs";
import { Suspense, useState } from "react";

const fallback = (
  <div className="flex items-center justify-center w-full h-48">
    <Spinner />
  </div>
);

export default function Forms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Tabs
        className="self-center"
        tabs={[
          {
            children: (
              <Suspense fallback={fallback}>
                <RegisterFormAsync setIsLoading={setIsLoading}/>
              </Suspense>
            ),
            key: 1,
            label: "Register",
          },
          {
            children: (
              <Suspense fallback={fallback}>
                <LoginFormAsync setIsLoading={setIsLoading}/>
              </Suspense>
            ),
            key: 2,
            label: "Login",
          },
        ]}
      />
      {isLoading ? (
        <HStack className="absolute w-full h-full top-0 left-0 z-20 bg-black/20 justify-center items-center">
          <Spinner />
        </HStack>
      ) : null}
    </>
  );
}
