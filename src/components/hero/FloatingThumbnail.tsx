"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FloatingThumbnailProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
}

export default function FloatingThumbnail({ project, className, style }: FloatingThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Create SVG placeholder matching accent color
  const color = project.accentColor || "#8B5CF6";
  const placeholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="${encodeURIComponent(color)}" opacity="0.2"/></svg>`;

  return (
    <div
      className={cn(
        "hidden lg:block absolute z-10 transition-transform duration-300",
        !shouldReduceMotion && "animate-float",
        className
      )}
      style={style}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative w-[120px] h-[80px] rounded-lg overflow-hidden transition-all duration-300 ease-out shadow-lg"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            boxShadow: isHovered ? `0 0 20px ${color}66` : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            borderColor: isHovered ? color : "transparent",
            borderWidth: "1px",
            borderStyle: "solid"
          }}
        >
          <Image
            src={project.coverImage || placeholder}
            alt={project.title}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>

        {/* Tooltip */}
        <div
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-bg-tertiary border border-border-default text-text-primary text-xs px-2 py-1 rounded transition-opacity duration-200 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {project.title}
        </div>
      </Link>
    </div>
  );
}
