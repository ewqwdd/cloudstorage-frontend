'use client'
import { ReactNode, memo, useCallback, useState } from "react";
import { notificationsContext } from "./notificationsContext";
import { Notification } from "./notification.type";
interface NotificationsProviderProps {
  children: ReactNode;
}

export default memo(function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const add = useCallback((n: Omit<Notification, 'id'>) => {
        setNotifications(prev => {
            return [{...n, id: prev.length}, ...prev]
        })
    }, [])
    const remove = useCallback((id: number) => {
        setNotifications(prev => {
            const index = prev.findIndex(elem => elem.id === id)
            if (index===-1) return prev
            const upd = [...prev]
            upd.splice(index, 1)
            return upd
        })
    }, [])

  return <notificationsContext.Provider value={{
    notifications,
    add,
    delete: remove
  }}>
    {children}
  </notificationsContext.Provider>;
});
