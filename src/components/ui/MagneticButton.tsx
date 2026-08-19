"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRelativeMousePosition } from "@/hooks/useMousePosition";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useRelativeMousePosition(ref);
  const prefersReducedMotion = useReducedMotion();

  const isMagnetic = isInside && !prefersReducedMotion;
  
  // Calculate movement based on cursor position relative to center
  const getMove = () => {
    if (!isMagnetic || !ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max movement is 4px
    const moveX = ((x - centerX) / centerX) * 4;
    const moveY = ((y - centerY) / centerY) * 4;
    
    return { x: moveX, y: moveY };
  };

  const { x: moveX, y: moveY } = getMove();

  const content = (
    <motion.button
      ref={ref as any}
      animate={{ x: moveX, y: moveY }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden transition-colors rounded-full",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        {content}
      </Link>
    );
  }

  return content;
}
