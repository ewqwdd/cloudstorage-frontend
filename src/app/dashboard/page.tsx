import { getFiles } from "@/api/files";
import HStack from "@/shared/ui/HStack";
import styles from "./dashboard.module.css";
import { RedirectType, redirect } from "next/navigation";
import { headers } from "next/headers";
import UApraser from "ua-parser-js";
import { Suspense } from "react";
import ClientWrapperAsync from "./(ui)/ClientWrapper.async";
import { Spinner } from "@/shared/ui/Spinner";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { type: string };
}) {
  const userAgent = headers().get("user-agent") || "";
  const parser = new UApraser(userAgent);
  const device = parser.getDevice().type;
  const isMobile = ["mobile", "tablet"].includes(device || "");
  try {
    const files = await getFiles(searchParams?.type);
    return (
      <Suspense
        fallback={
          <HStack className="justify-center items-center w-full h-full bg-black/20">
            <Spinner />
          </HStack>
        }
      >
        <ClientWrapperAsync files={files} isMobile={isMobile} />
      </Suspense>
    );
  } catch (err) {
    redirect("/api/auth/signin/credentials", RedirectType.replace);
  }
}
