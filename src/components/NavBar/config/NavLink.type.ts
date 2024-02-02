import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface NavLink extends LinkProps{
    children: string | ReactNode
    className?: string
}