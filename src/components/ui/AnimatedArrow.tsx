"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedArrowProps {
  className?: string;
  direction?: "right" | "left" | "up" | "down";
}

export default function AnimatedArrow({ className, direction = "right" }: AnimatedArrowProps) {
  const prefersReducedMotion = useReducedMotion();

  const getHoverAnimation = () => {
    if (prefersReducedMotion) return {};
    switch (direction) {
      case "right": return { x: 4 };
      case "left": return { x: -4 };
      case "up": return { y: -4 };
      case "down": return { y: 4 };
      default: return { x: 4 };
    }
  };

  const getRotation = () => {
    switch (direction) {
      case "right": return 0;
      case "down": return 90;
      case "left": return 180;
      case "up": return -90;
      default: return 0;
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block", className)}
      style={{ rotate: getRotation() }}
      whileHover={getHoverAnimation()}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </motion.svg>
  );
}
