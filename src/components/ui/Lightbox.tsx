"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="absolute top-6 left-6 z-50 text-white/70 text-sm font-medium font-body tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>

          <div 
            className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-12"
            onClick={onClose}
          >
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1536px) 100vw, 1536px"
                priority
              />
            </motion.div>
          </div>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div className="w-full p-6 flex items-center justify-center gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative w-16 h-12 flex-shrink-0 rounded overflow-hidden transition-all duration-200 opacity-50 hover:opacity-100",
                  currentIndex === idx && "ring-2 ring-white opacity-100"
                )}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
