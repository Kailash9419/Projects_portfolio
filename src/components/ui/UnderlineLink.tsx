import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UnderlineLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function UnderlineLink({ href, children, className, external }: UnderlineLinkProps) {
  const content = (
    <span className="relative inline-block pb-0.5 group">
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-text-primary transition-all duration-300 ease-out group-hover:w-full"></span>
    </span>
  );

  const baseClasses = cn(
    "text-text-secondary hover:text-text-primary transition-colors font-medium",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
