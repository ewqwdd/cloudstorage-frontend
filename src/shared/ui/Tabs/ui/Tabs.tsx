"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "./types";
import { twMerge } from "tailwind-merge";

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export default function Tabs({ tabs, className }: TabsProps) {
  const label = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  const [cords, setCords] = useState<{width: number, left: number}>()
  const generateChangeTab = useCallback(
    (index: number) => () => {
      setCurrent(index);
    },
    []
  );
  useEffect(() => {
    const node = label.current?.childNodes[current] as HTMLButtonElement
    if (!node) return 
    setCords({
        left: node.offsetLeft,
        width: node.offsetWidth
    })
    
  }, [current])
  return (
    <>
    <div
      ref={label}
      className={twMerge("flex gap-8 font-medium text-lg relative pb-2 [&>button]:rounded-sm [&>button]:p-2", className)}
    >
      {tabs.map((elem, index) => (
        <button
          key={elem.key}
          onClick={generateChangeTab(index)}
          className={
            current === index
              ? "text-cyan-600"
              : "text-zinc-800 hover:bg-zinc-100 transition-colors"
          }
        >
          {elem.label}
        </button>
      ))}
    <div className="absolute h-1 rounded bg-cyan-600 transition-all bottom-0" style={{
        left: cords?.left,
        width: cords?.width
    }}/>
    </div>
    {tabs[current].children}
    </>
  );
}
