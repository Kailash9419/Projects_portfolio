import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  from = "from-[#A3E635]",
  to = "to-[#22D3EE]",
  className,
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r py-1 leading-snug",
        from,
        to,
        animate ? "animate-gradient bg-[length:200%_auto]" : "",
        className
      )}
    >
      {children}
    </span>
  );
}
