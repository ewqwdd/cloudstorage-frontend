import { getAuthSession } from "@/core/authOptions";
import { FileEntity } from "@/entity/File/types/file.type";
import axios, { AxiosError } from "axios";

export const getFiles = async (type?: string): Promise<FileEntity[]> => {
  const session = await getAuthSession();

  const { data } = await axios.get<FileEntity[]>(process.env.NEXT_PUBLIC_API_URL + "files?type=" + type, {
    headers: {
        Authorization: 'Bearer ' + session?.user.access_token
    }
  });
  
  return data;
};
interface PostFileParams {
  progressChange?: (progress: number) => void
  onError?: (err: AxiosError) => void
  onSuccess?: (res: any) => void
  token: string
}
export const postFile = async(file: File, {onError, onSuccess, progressChange, token}: PostFileParams) => {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + "files", formData, {
      onUploadProgress(progressEvent) {
        progressChange?.((progressEvent.loaded / Number(progressEvent.total))*100)
      },
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    onSuccess?.(data)
    return data
  } catch(err) {
    if (err instanceof AxiosError) {
      onError?.(err)
    }
  }
  
}
