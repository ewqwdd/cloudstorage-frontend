"use client";
import { postFile } from "@/api/files";
import UploadFile from "@/components/UploadFile";
import { useNotify } from "@/entity/Notification";
import VStack from "@/shared/ui/VStack";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, memo, useCallback, useState } from "react";

export default memo(function UploadFileSidebar() {
  const session = useSession();
  const { add } = useNotify();
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);
  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const at = session.data?.user.access_token;
      if (!at) return;
      const file = e.target.files?.[0];
      if (!file) return;
      postFile(file, {
        progressChange(progress) {
          setProgress(progress);
        },
        async onError(err) {
          if (err.response?.status === 401) {
            signIn();
            add({
              variant: "error",
              label: "Error",
              children: "Something went wrong, try again.",
            });
          }
          add({
            variant: "error",
            label: "Error",
            children: "Something went wrong.",
          });
        },
        token: at,
        onSuccess: () => {
          add({
            label: "Success",
            children: "Successfuly added.",
          });
          setProgress(0);
          router.refresh();
        },
      });
    },
    [session, add, router]
  );

  return (
    <VStack className="gap-2 mt-8 mb-2 self-center">
      <h4 className="text-cyan-50/80 text-lg font-medium text-center">
        Upload file:
      </h4>
      <UploadFile progress={progress} onSubmit={onSubmit} />
    </VStack>
  );
}
)