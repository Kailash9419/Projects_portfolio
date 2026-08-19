"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/types/project";

interface ProjectSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Featured", value: "featured" },
];

export default function ProjectSort({ value, onChange }: ProjectSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = OPTIONS.find(opt => opt.value === value) || OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-48 bg-bg-card border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary hover:border-border-hover transition-colors focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet/50"
      >
        <span>Sort by: {activeOption.label}</span>
        <svg 
          className={cn("w-4 h-4 text-text-muted transition-transform duration-300", isOpen && "rotate-180")} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-full md:w-48 bg-bg-card border border-border-default rounded-lg shadow-xl z-50 overflow-hidden py-1">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors",
                value === option.value 
                  ? "text-accent-violet bg-bg-tertiary" 
                  : "text-text-primary hover:bg-bg-tertiary"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
