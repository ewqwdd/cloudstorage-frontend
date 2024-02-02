'use client'

import { Switch } from "@/shared/ui/Switch"
import UploadFileSidebar from "./UploadFileSidebar"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { memo, useCallback, useEffect, useState } from "react"
import DeleteBtn from "./DeleteBtn"
import VStack from "@/shared/ui/VStack"

export const types = [
  "Image",
  "Deleted",
  "All"
]

export const typeMap: Record<typeof types[number], string> = {
  'Image': 'image',
  'Deleted': 'trash',
  'All': 'all'
}

export const findKey = (qry: string | null) => {
  if (!qry) return
  return Object.entries(typeMap).findLast(([key, value]) => value === qry)?.[0]
}

export interface SidebarProps {
  setIsLoading?: (value: boolean) => void
  deleteFiles?: () => Promise<void>
}

export default memo(function Sidebar({setIsLoading, deleteFiles}: SidebarProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading?.(false)
  }, [searchParams, setIsLoading])

  const onValueChange = useCallback((type: typeof types[number]) => {
    const upd = typeMap[type] || 'all'
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('type', upd)
    setIsLoading?.(true)
    router.push(pathname + '?' + current.toString())
  }, [pathname, router, searchParams, setIsLoading])

  return (
    <VStack className="w-80 bg-cyan-950/95 text-slate-100 pt-2">
        <Switch className='w-full [&>button]:basis-1/3' current={findKey(searchParams.get('type')) ?? 'All'} values={types} onValueChange={onValueChange}/>
        <UploadFileSidebar />
        <DeleteBtn deleteSelected={deleteFiles}/>
    </VStack>
  )
})