'use client'
import HStack from "@/shared/ui/HStack";
import { navLinksList } from "../config/navLinksList";
import NavLink from "./NavLink";
import LogoutBtn from "./LogoutBtn";
import { useScreen } from "@/shared/hooks/useScreen";
import { Suspense, memo } from "react";
import NavbarMobileAsync from "./Navbar.mobile.async";

export default memo(function Navbar() {
  const {width} = useScreen()
  if (width <= 640) return (
    <Suspense fallback={<div className="bg-cyan-950 flex h-12 w-full" />}>
      <NavbarMobileAsync />
    </Suspense>
  )
  return (
    <HStack className="bg-cyan-950 flex h-12 md:h-20 shadow-lg relative z-40">
        {navLinksList.map((elem, index) => <NavLink key={index} {...elem} />)}
        <LogoutBtn />
    </HStack>
  )
}
)