import Link from 'next/link'
import React from 'react'
import { NavLink } from '../config/NavLink.type'
import { twMerge } from 'tailwind-merge'

export default function NavLink({className, ...props}: NavLink) {
  return (
    <Link className={twMerge('px-4 hover:bg-slate-100/5 transition text-slate-200 text-lg font-medium flex items-center ', className)} {...props} />
  )
}
