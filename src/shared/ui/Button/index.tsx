import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps<T extends React.ElementType> {
  className?: string;
  as?: T;
  children: ReactNode;
}

export default function Button<T extends React.ElementType = "button">({
  children,
  as,
  className,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as || "button";
  return (
    <Component
      style={{
        transition: "0.1s ease-in-out",
      }}
      className={twMerge(
        "px-6 py-2 rounded-md bg-cyan-700 text-slate-100 disabled:text-slate-300 active:scale-95 active:shadow-none text-base transition-shadow hover:shadow-sm shadow-slate-100 ",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
