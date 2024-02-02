import { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HStackProps<T extends ElementType> {
  className?: string;
  as?: T;
  children: ReactNode;
}

export default function HStack<T extends ElementType = 'div'>({
  children,
  as,
  className,
  ...props
}: HStackProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof HStackProps<T>>) {
  const Component = as || "div";
  return (
    <Component className={twMerge("flex flex-row ", className)} {...props}>
      {children}
    </Component>
  );
}
