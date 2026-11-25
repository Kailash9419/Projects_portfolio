"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

/** Cursor position relative to the element, plus the element's size. */
export type RelativeMousePosition = MousePosition & {
  width: number;
  height: number;
  isInside: boolean;
};

export function useRelativeMousePosition(
  ref: React.RefObject<HTMLElement | null>
): RelativeMousePosition {
  const [state, setState] = useState<RelativeMousePosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isInside: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isInside =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      setState({ x, y, width: rect.width, height: rect.height, isInside });
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, isInside: false }));
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return state;
}
