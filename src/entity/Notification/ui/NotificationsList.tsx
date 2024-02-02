'use client'
import React, { useCallback } from 'react'
import { useNotify } from '../model/useNotify'
import Notification from './Notification'

export default function NotificationsList() {
    const {add, delete: remove, notifications} = useNotify()

    const generateClose = useCallback((id: number) => {
        return () => remove(id)
    }, [remove])
  return (
    <>
        {notifications.map(elem => <Notification {...elem} key={elem.id} Close={generateClose(elem.id)}/>)}
    </>
  )
}
