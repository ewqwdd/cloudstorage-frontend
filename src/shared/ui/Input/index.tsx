import React, { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  end?: ReactNode
}

export default memo(forwardRef(function Input({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        "border-2 border-cyan-800 rounded-md py-1 px-4 text-lg placeholder:text-opacity-70" +
          "text-zinc-700 focus:outline-cyan-600 relative",
        className
      )}
      ref={ref}
    />
  );
}
)
)