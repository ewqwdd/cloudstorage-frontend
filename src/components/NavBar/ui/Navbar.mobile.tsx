"use client";

import HStack from "@/shared/ui/HStack";
import { navLinksList } from "../config/navLinksList";
import NavLink from "./NavLink";
import VStack from "@/shared/ui/VStack";
import { memo, useCallback, useRef, useState } from "react";
import MenuIcon from "@/shared/icons/menu.svg";
import LogoutBtn from "./LogoutBtn";
import { MouseEvent as MouseEventDiv } from "react";

export default memo(function NavbarMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const clickOutside = useCallback((e: MouseEvent) => {
    
      setIsOpen(false);
    
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev === false) window.addEventListener("click", clickOutside);
      else window.removeEventListener("click", clickOutside);

      return !prev;
    });
  }, [clickOutside]);
  const stopPropagation = useCallback((e: MouseEventDiv) => e.stopPropagation(), [])
  return (
    <div className="flex flex-col" ref={navRef} onClick={stopPropagation}>
      <HStack className="bg-cyan-950 flex h-12 md:h-20 shadow-lg relative z-40 justify-between">
        <NavLink {...navLinksList[0]} />
        <MenuIcon
          className="h-full aspect-square text-slate-100 cursor-pointer hover:bg-slate-100/5 transition-colors"
          onClick={toggle}
        />
      </HStack>
      <VStack
        className="bg-cyan-900 w-full absolute z-50 transition-all md:top-20 top-12 overflow-hidden"
        style={{
          height: isOpen ? 36 * navLinksList.length : 0,
        }}
      >
        {navLinksList.slice(1).map((elem, index) => (
          <NavLink key={index} {...elem} className="h-9" />
        ))}
        <LogoutBtn className="gap-5 ml-0 self-start px-4" />
      </VStack>
    </div>
  );
});
