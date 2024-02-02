import { twMerge } from "tailwind-merge"
import FileIcon from '@/shared/icons/upload-cloud.svg'
import { ChangeEvent } from "react"

export interface UploadFileProps {
  className?: string
  progress?: number
  onSubmit?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function UploadFile({className, progress, onSubmit}: UploadFileProps) {
  
  return (
    <>
    <div className={twMerge('w-32 h-32 rounded-md bg-cyan-700 hover:bg-cyan-600 transition-all flex justify-center items-center relative', className)}>
      <input type="file" className="w-full h-full opacity-0 absolute cursor-pointer" onChange={onSubmit}/>
      <FileIcon className="text-cyan-100 w-[70%] h-[70%]" />
      <div className="h-2 rounded-md bg-cyan-500 absolute bottom-0 left-0 transition-all" style={{
      width: `${progress}%`
    }}/>
    </div>
    
    </>
  )
}
