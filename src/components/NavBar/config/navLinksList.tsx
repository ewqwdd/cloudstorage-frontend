import HStack from "@/shared/ui/HStack";
import { NavLink } from "./NavLink.type";
import CloudIcon from '@/shared/icons/cloud.svg'

export const navLinksList: NavLink[] = [
    {
        children: <HStack className='text-xl font-semibold gap-2' as={'span'}><CloudIcon className="h-7 w-7" /> SuperCloud</HStack>,
        href: '/'
    },
    {
        children: 'Dashboard',
        href: '/dashboard'
    }
]