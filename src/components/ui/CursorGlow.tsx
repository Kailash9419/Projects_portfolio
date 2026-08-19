"use client";

import React, { useRef } from "react";
import { useRelativeMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface CursorGlowProps {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}

export default function CursorGlow({
  color = "rgba(139, 92, 246, 1)", // violet-500
  size = 300,
  opacity = 0.12,
  className,
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useRelativeMousePosition(ref);
  const isDesktop = useMediaQuery("(pointer: fine)");

  if (!isDesktop) return null;

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
    >
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-300 blur-3xl"
        style={{
          width: size,
          height: size,
          left: x - size / 2,
          top: y - size / 2,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: isInside ? opacity : 0,
        }}
      />
    </div>
  );
}
