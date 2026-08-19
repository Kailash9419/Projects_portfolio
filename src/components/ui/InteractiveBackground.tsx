"use client";

import React, { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function InteractiveBackground() {
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine)");
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const showGlow = isDesktop && !prefersReducedMotion;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 2px at 10px 10px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      ></div>
      {showGlow && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.07), transparent 40%)`
          }}
        />
      )}
    </div>
  );
}
