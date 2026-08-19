"use client";

import { cn } from "@/lib/utils";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className={cn(
          "w-full bg-bg-card border border-border-default rounded-lg pl-10 pr-10 py-3 text-text-primary placeholder:text-text-muted outline-none transition-all duration-300",
          "focus:border-accent-violet focus:ring-1 focus:ring-accent-violet/50"
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
