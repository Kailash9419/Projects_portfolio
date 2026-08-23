"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function InteractiveBackground() {
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine)");
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Smooth spring-based cursor following
  const springX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const springY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  if (!mounted) return null;

  const showGlow = isDesktop && !prefersReducedMotion;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 1.5px at 10px 10px, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Primary cursor glow - lime green */}
      {showGlow && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(163, 230, 53, 0.06), transparent 40%)`
          }}
        />
      )}

      {/* Secondary ambient glow - cyan */}
      {showGlow && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(900px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.03), transparent 50%)`
          }}
        />
      )}

      {/* Top-right ambient orb */}
      <div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #A3E635, transparent 70%)',
        }}
      />

      {/* Bottom-left ambient orb */}
      <div 
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #22D3EE, transparent 70%)',
        }}
      />
    </div>
  );
}
