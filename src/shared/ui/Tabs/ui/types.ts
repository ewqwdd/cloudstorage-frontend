import { ReactNode } from "react"

export interface Tab {
    key: string | number
    label: string | ReactNode
    children: ReactNode | string
}
