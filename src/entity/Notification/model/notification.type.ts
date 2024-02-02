import { ReactNode } from "react"
export type NotificationVariant = 'error' | 'default' | 'warning'

export interface Notification {
    id: number
    label?: string
    children?: ReactNode | string 
    variant?: NotificationVariant
    autoClose?: boolean
    timeToClose?: number
}