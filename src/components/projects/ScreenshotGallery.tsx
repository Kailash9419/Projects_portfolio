"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScreenshotGalleryProps {
  screenshots: string[];
  accentColor?: string;
}

export default function ScreenshotGallery({
  screenshots,
  accentColor = "#8B5CF6",
}: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
          Screenshots
        </h2>
        
        <div className="flex flex-col gap-12">
          {screenshots.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(index)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: `0 0 0 0 ${accentColor}00`,
              }}
              onHoverStart={(e) => {
                if (!shouldReduceMotion) {
                  (e.target as HTMLElement).style.boxShadow = `0 10px 40px -10px ${accentColor}40`;
                }
              }}
              onHoverEnd={(e) => {
                if (!shouldReduceMotion) {
                  (e.target as HTMLElement).style.boxShadow = `0 0 0 0 ${accentColor}00`;
                }
              }}
            >
              <Image
                src={src}
                alt={`Screenshot ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            images={screenshots}
            initialIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Simple Lightbox Component
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl aspect-video mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-bg-secondary/80 rounded-full text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              aria-label="Previous image"
            >
              &larr;
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-bg-secondary/80 rounded-full text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              aria-label="Next image"
            >
              &rarr;
            </button>
          </>
        )}
        
        {/* Close Button */}
        <button
          className="absolute -top-12 right-0 text-text-secondary hover:text-text-primary text-xl"
          onClick={onClose}
          aria-label="Close gallery"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
