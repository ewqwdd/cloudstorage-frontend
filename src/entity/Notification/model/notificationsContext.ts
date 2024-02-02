'use client'

import { Notification } from "./notification.type";
import { createContext } from "react";

interface NotificationsContext {
    notifications: Notification[]
    add: (n: Omit<Notification, 'id'>) => void
    delete: (id: number) => void
}

export const notificationsContext = createContext<NotificationsContext>({
    notifications: [],
    add: (n) => {},
    delete: (id) => {}
})