"use client";
import Image from "next/image";
import { type FileEntity } from "../types/file.type";
import FileIcon from "@/shared/icons/file.svg";
import { twMerge } from "tailwind-merge";
import VStack from "@/shared/ui/VStack";
import HStack from "@/shared/ui/HStack";
import { MouseEvent, memo, useCallback } from "react";
import DeletedIcon from "@/shared/icons/image-off.svg";
import { useRouter } from "next/navigation";

interface FileProps {
  file: FileEntity;
  className?: string;
  isActive?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  deleted?: boolean;
}

export default memo(
  function FileComp({
    file,
    className,
    isActive,
    onClick,
    deleted,
  }: FileProps) {
    let fileHeader;
    const router = useRouter();
    const openPic = useCallback(() => {
      router.push(`/dashboard/${file.filename}`);
    }, [router, file]);
    if (deleted) {
      fileHeader = <DeletedIcon className="aspect-square object-contain" />;
    } else if (file.mimetype.includes("image")) {
      fileHeader = (
        <img
          src={process.env.NEXT_PUBLIC_API_URL + "uploads/" + file.filename}
          alt={"img"}
          loading="lazy"
          className="object-cover absolute"
        />
      );
    } else {
      fileHeader = <FileIcon className="aspect-square object-contain" />;
    }
    return (
      <VStack
        onDoubleClick={deleted ? undefined : openPic}
        onClick={onClick}
        className={twMerge("overflow-hidden p-3 select-none", className)}
        style={{
          overflow: isActive ? "visible" : "hidden",
          background: `rgba(63, 63, 70, ${isActive ? 0.2 : 0.02})`,
          outline: isActive ? "1px dotted rgba(63, 63, 70, 0.4)" : "",
        }}
      >
        <HStack className="relative h-[70%] items-center justify-center pointer-events-none overflow-hidden">
          {fileHeader}
        </HStack>
        <div className="h-[20%] relative">
          <span className="absolute left-0 top-0 p-1 text-zinc-700 break-words text-wrap w-full text-center">
            {file.originalName}
          </span>
        </div>
      </VStack>
    );
  },
  (prevProps, newProps) =>
    newProps.file.id === prevProps.file.id &&
    prevProps.onClick === newProps.onClick &&
    prevProps.deleted === newProps.deleted &&
    prevProps.className === newProps.className &&
    prevProps.isActive === newProps.isActive
);
