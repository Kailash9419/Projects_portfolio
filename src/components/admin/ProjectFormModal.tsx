"use client";

import React, { useState, useRef } from "react";
import { Project, ProjectCategory, CATEGORIES } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<Project>) => Promise<void>;
  projectToEdit?: Project | null;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSave,
  projectToEdit,
}: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>(() =>
    projectToEdit
      ? {
          ...projectToEdit,
          screenshots: projectToEdit.screenshots || [],
          technologies: projectToEdit.technologies || [],
          features: projectToEdit.features || [],
          results: projectToEdit.results || [],
        }
      : {
          title: "",
          tagline: "",
          description: "",
          category: "Web Apps",
          year: new Date().getFullYear(),
          featured: true,
          coverImage: "",
          screenshots: [],
          technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
          problem: "",
          solution: "",
          features: [],
          results: [],
          accentColor: "#A3E635",
          liveUrl: "",
          githubUrl: "",
        }
  );

  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingScreenshot, setIsUploadingScreenshot] = useState(false);
  const [error, setError] = useState("");

  const coverFileRef = useRef<HTMLInputElement>(null);
  const screenshotFileRef = useRef<HTMLInputElement>(null);


  if (!isOpen) return null;

  // ─── Client-side image compression (Canvas API) ─────────────────────────
  // Downscales large photos and re-encodes them so uploads stay under the
  // server's 4 MB limit (Vercel caps request bodies at 4.5 MB).
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      // GIFs would lose animation; anything else unusual is left to the server check.
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        resolve(file);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);

        const MAX_W = 1920;
        const MAX_H = 1440;
        let { width, height } = img;
        const needsResize = width > MAX_W || height > MAX_H;

        // Small images are uploaded untouched.
        if (!needsResize && file.size <= 1024 * 1024) {
          resolve(file);
          return;
        }

        if (needsResize) {
          const ratio = Math.min(MAX_W / width, MAX_H / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // WebP stays WebP (keeps transparency); PNG/JPEG become JPEG.
        const mimeOut = file.type === "image/webp" ? "image/webp" : "image/jpeg";
        const extOut = mimeOut === "image/webp" ? ".webp" : ".jpg";
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
              return;
            }
            resolve(
              new File([blob], file.name.replace(/\.[^.]+$/, "") + extOut, { type: mimeOut })
            );
          },
          mimeOut,
          0.82
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });
  };

  // File Upload Helper
  const handleFileUpload = async (
    file: File
  ): Promise<string> => {
    // Check raw size before compression (< 20MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error(`"${file.name}" is larger than 20MB`);
    }

    // Compress on client before sending — keeps payload well under Vercel 4.5MB limit
    const compressed = await compressImage(file);
    if (compressed.size > 4 * 1024 * 1024) {
      throw new Error(`"${file.name}" is still over 4 MB after compression. Try a smaller image.`);
    }

    const data = new FormData();
    data.append("file", compressed);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const rawText = await res.text();
    let json: { success?: boolean; url?: string; error?: string } = {};
    try {
      json = JSON.parse(rawText);
    } catch {
      throw new Error(
        res.ok
          ? "Invalid server response while uploading image"
          : `Upload failed (${res.status}): ${rawText.slice(0, 120) || res.statusText}`
      );
    }

    if (!res.ok || !json.success || !json.url) {
      throw new Error(json.error || "Failed to upload image");
    }

    return json.url;
  };

  const handleCoverSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploadingCover(true);
    setError("");
    try {
      const url = await handleFileUpload(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (err: unknown) {
      console.error("Cover upload error:", err);
      setError(err instanceof Error ? err.message : "Cover image upload failed");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleScreenshotSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    e.target.value = "";

    setIsUploadingScreenshot(true);
    setError("");
    try {
      const uploadedUrls: string[] = [];
      for (const file of fileList) {
        const url = await handleFileUpload(file);
        uploadedUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...uploadedUrls],
      }));
    } catch (err: unknown) {
      console.error("Screenshot upload error:", err);
      setError(err instanceof Error ? err.message : "Screenshot upload failed");
    } finally {
      setIsUploadingScreenshot(false);
    }
  };

  const handleRemoveScreenshot = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: (prev.screenshots || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...current, techInput.trim()] });
    }
    setTechInput("");
  };

  const handleRemoveTech = (item: string) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter((t) => t !== item),
    });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const current = formData.features || [];
    setFormData({ ...formData, features: [...current, featureInput.trim()] });
    setFeatureInput("");
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== idx),
    });
  };

  const handleAddMetric = () => {
    if (!metricLabel.trim() || !metricValue.trim()) return;
    const current = formData.results || [];
    setFormData({
      ...formData,
      results: [...current, { label: metricLabel.trim(), value: metricValue.trim() }],
    });
    setMetricLabel("");
    setMetricValue("");
  };

  const handleRemoveMetric = (idx: number) => {
    setFormData({
      ...formData,
      results: (formData.results || []).filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploadingCover || isUploadingScreenshot) {
      setError("Please wait for image uploads to finish before saving.");
      return;
    }
    if (!formData.title?.trim() || !formData.tagline?.trim()) {
      setError("Please provide a project title and tagline.");
      return;
    }
    const normalizedLiveUrl = formData.liveUrl?.trim()
      ? /^https?:\/\//i.test(formData.liveUrl.trim())
        ? formData.liveUrl.trim()
        : `https://${formData.liveUrl.trim()}`
      : "";

    setIsSubmitting(true);
    setError("");
    try {
      await onSave({ ...formData, liveUrl: normalizedLiveUrl });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-bg-primary border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-lime/60 transition-all";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-bg-card border border-border-default rounded-2xl shadow-2xl flex flex-col overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-secondary/40">
            <div>
              <h2 className="text-xl font-bold font-display text-text-primary">
                {projectToEdit ? "Edit Project" : "Add New Project"}
              </h2>
              <p className="text-xs text-text-muted">
                Fill in the details and upload project images to showcase on your portfolio
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Row 1: Title & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mudkraft"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Tagline / Client Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pottery E-commerce & Admin CMS"
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Row 2: Category, Year, Accent Color, Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category || "Web Apps"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as ProjectCategory })
                  }
                  className={inputClasses}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year || 2024}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })
                  }
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.accentColor || "#A3E635"}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={formData.accentColor || "#A3E635"}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Featured Project?
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured ?? false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded accent-accent-lime"
                  />
                  <span className="text-xs text-text-secondary">Show on Homepage</span>
                </label>
              </div>
            </div>

            {/* DIRECT IMAGE UPLOAD SECTION */}
            <div className="p-4 rounded-xl bg-bg-primary/80 border border-border-default space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-lime font-bold block">
                🖼️ Project Media & Cover Image
              </span>

              {/* Cover Image Upload Area */}
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Cover Image (Direct Upload from Computer)
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={coverFileRef}
                  onChange={handleCoverSelect}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Image Preview Box */}
                  {formData.coverImage ? (
                    <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-border-default bg-bg-secondary group shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.coverImage}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: "" })}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-36 h-24 rounded-lg border-2 border-dashed border-border-default flex flex-col items-center justify-center text-text-muted text-xs p-2 text-center shrink-0">
                      <span>No image</span>
                    </div>
                  )}

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => coverFileRef.current?.click()}
                        disabled={isUploadingCover}
                        className="px-4 py-2 rounded-xl bg-accent-lime text-bg-primary font-bold text-xs hover:bg-accent-lime/90 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                      >
                        <span>📁</span>
                        <span>{isUploadingCover ? "Uploading..." : "Browse Cover Image"}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-muted font-mono">Or Path:</span>
                      <input
                        type="text"
                        placeholder="/projects/.../cover.svg or URL"
                        value={formData.coverImage || ""}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="flex-1 bg-bg-secondary border border-border-default rounded-lg px-3 py-1.5 text-text-primary text-xs focus:outline-none focus:border-accent-lime/60"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshots Gallery Upload Area */}
              <div className="pt-3 border-t border-border-default/60">
                <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Additional Screenshots / Gallery (Optional)
                </label>

                <input
                  type="file"
                  ref={screenshotFileRef}
                  onChange={handleScreenshotSelect}
                  multiple
                  accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
                  className="hidden"
                />

                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => screenshotFileRef.current?.click()}
                    disabled={isUploadingScreenshot}
                    className="px-3.5 py-2 rounded-xl bg-bg-card border border-border-default hover:border-accent-lime text-text-primary text-xs font-medium transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>➕</span>
                    <span>{isUploadingScreenshot ? "Uploading..." : "Browse Screenshots"}</span>
                  </button>

                  {/* Gallery Thumbnails */}
                  {(formData.screenshots || []).map((img, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-12 rounded-lg overflow-hidden border border-border-default group shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveScreenshot(i)}
                        className="absolute inset-0 bg-black/60 text-red-400 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                Overview / Description
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of what was built and what value it delivered..."
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Problem (Client Challenge)
                </label>
                <textarea
                  rows={3}
                  placeholder="What struggle was the client facing before?"
                  value={formData.problem || ""}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                  Solution (DevLabs Approach)
                </label>
                <textarea
                  rows={3}
                  placeholder="How did DevLabs solve it with tech?"
                  value={formData.solution || ""}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                Tech Stack
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Razorpay, Supabase"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 bg-bg-card border border-border-default rounded-xl text-sm hover:border-accent-lime text-text-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-secondary border border-border-default rounded-full text-xs text-text-primary"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(t)}
                      className="text-text-muted hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                Key Deliverables & Features
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. 1-Click WhatsApp Order Bot"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-bg-card border border-border-default rounded-xl text-sm hover:border-accent-lime text-text-primary"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5">
                {(formData.features || []).map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-xs px-3 py-1.5 bg-bg-secondary rounded-lg border border-border-default"
                  >
                    <span className="text-text-secondary">✦ {f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(i)}
                      className="text-text-muted hover:text-red-400 ml-2"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results / ROI Metrics */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                Results / ROI Metrics
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Metric (e.g. Online Orders)"
                  value={metricLabel}
                  onChange={(e) => setMetricLabel(e.target.value)}
                  className={inputClasses}
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 3x or +65%)"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="px-4 py-2 bg-bg-card border border-border-default rounded-xl text-sm hover:border-accent-lime text-text-primary"
                >
                  Add Metric
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.results || []).map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-accent-lime/10 border border-accent-lime/30 rounded-lg text-xs"
                  >
                    <span className="font-bold text-accent-lime">{res.value}</span>
                    <span className="text-text-secondary">{res.label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMetric(i)}
                      className="text-text-muted hover:text-red-400 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Project URL */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                Live Project URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.liveUrl || ""}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className={inputClasses}
              />
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-default bg-bg-secondary/40">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border-default text-text-secondary hover:bg-bg-primary transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || isUploadingCover || isUploadingScreenshot}
              className="px-6 py-2.5 rounded-xl bg-accent-lime text-bg-primary font-bold hover:bg-accent-lime/90 transition-all text-sm shadow-lg shadow-accent-lime/20 disabled:opacity-50"
            >
              {isUploadingCover || isUploadingScreenshot
                ? "Uploading images..."
                : isSubmitting
                ? "Saving..."
                : projectToEdit
                ? "Update Project"
                : "Publish Project"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
