"use client";
import { FileEntity } from "@/entity/File/types/file.type";
import VStack from "@/shared/ui/VStack";
import Sidebar from "./Sidebar";
import FileList from "./FileList";
import { useCallback, useState } from "react";
import { useNotify } from "@/entity/Notification";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SidebarMobile from "./Sidebar.mobile";

interface ClientWrapperProps {
  files: FileEntity[];
  isMobile?: boolean;
}

export default function ClientWrapper({ files, isMobile }: ClientWrapperProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const { add } = useNotify();

  const deleteFiles = useCallback(async () => {
    if (!selected.length) {
      return add({
        variant: "warning",
        label: "Error",
        children: "You haven't selected files",
      });
    }
    if (!session.data?.user.access_token) {
      add({
        variant: "warning",
        label: "Error",
        children: "Something went wrong, try again.",
      });
      return signIn();
    }
    const ids = selected.map((elem) => files[elem].id);
    try {
      const { data } = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + "files",
        {
          data: {
            ids,
          },
          headers: {
            Authorization: "Bearer " + session.data?.user.access_token,
          },
        }
      );
      router.refresh();
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          signIn();
          add({
            variant: "warning",
            label: "Error",
            children: "Something went wrong, try again.",
          });
        }
        add({
          variant: "warning",
          label: "Error",
          children: "Something went wrong.",
        });
      }
    } finally {
      setSelected([])
    }
  }, [files, selected, add, session, router]);
  const setLoading = useCallback((val: boolean) => {
    setIsLoading(val);
  }, []);

  return (
    <>
      {isMobile ? (
        <SidebarMobile setIsLoading={setLoading} deleteFiles={deleteFiles} />
      ) : (
        <Sidebar setIsLoading={setLoading} deleteFiles={deleteFiles} />
      )}

      <FileList
        isMobile={isMobile}
        files={files}
        selected={selected}
        setSelected={setSelected}
        isLoading={isLoading}
      />
    </>
  );
}
