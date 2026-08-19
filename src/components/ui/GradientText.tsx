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
  from = "from-violet-500",
  to = "to-cyan-400",
  className,
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
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
