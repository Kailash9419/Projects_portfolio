"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TechBadgeProps {
  name: string;
  accentColor?: string;
}

export default function TechBadge({
  name,
  accentColor = "#8B5CF6",
}: TechBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className="px-3 py-1.5 rounded-full text-sm bg-bg-card text-text-secondary border border-border-default cursor-pointer inline-flex transition-colors duration-300"
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              borderColor: accentColor,
              color: "#F5F7FA", // text-text-primary
              backgroundColor: `${accentColor}10`, // subtle background glow
              boxShadow: `0 0 10px ${accentColor}20`,
            }
      }
    >
      {name}
    </motion.span>
  );
}
