import { getMeServer } from "@/api/user"

export const getUser = async() => {
    const user = await getMeServer()
    return user
}
