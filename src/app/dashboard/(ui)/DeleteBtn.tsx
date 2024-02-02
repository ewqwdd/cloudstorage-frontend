"use client";
import TrashIcon from "@/shared/icons/trash.svg";
import Button from "@/shared/ui/Button";
import HStack from "@/shared/ui/HStack";
import { Spinner } from "@/shared/ui/Spinner";
import { memo, useCallback, useState } from "react";

interface DeleteBtnProps {
  deleteSelected?: () => Promise<void>;
}

export default memo(function DeleteBtn({ deleteSelected }: DeleteBtnProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteWithLoading = useCallback(async () => {
    setIsLoading(true);
    await deleteSelected?.();
    setIsLoading(false);
  }, [deleteSelected]);

  return (
    <HStack
     as={Button}
      className="bg-red-800 hover:bg-red-700 disabled:text-opacity-70 self-center mt-4"
      onClick={deleteWithLoading}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner className="border-zinc-100 !w-6 !h-6" />
      ) : (
        <TrashIcon className="w-6 h-6" />
      )}
      {"\u00A0"}
      Delete selected
    </HStack>
  );
      })
