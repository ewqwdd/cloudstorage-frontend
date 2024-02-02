import { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface VStackProps<T extends ElementType> {
  className?: string;
  as?: T;
  children: ReactNode;
}

export default function VStack<T extends ElementType = 'div'>({
  children,
  as,
  className,
  ...props
}: VStackProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof VStackProps<T>>) {
  const Component = as || "div";
  return (
    <Component className={twMerge("flex flex-col ", className)} {...props}>
      {children}
    </Component>
  );
}
