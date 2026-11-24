"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectFormModal from "@/components/admin/ProjectFormModal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [status, setStatus] = useState<{ configured: boolean; storage: string } | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth on load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (cancelled) return;
        setStatus({ configured: data.configured, storage: data.storage });
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) fetchProjects();
      } catch {
        if (!cancelled) setIsAuthenticated(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Login failed. Check server connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    const isEdit = !!editingProject?.id;
    const url = isEdit ? `/api/projects/${editingProject.id}` : "/api/projects";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to save project");
    }

    showToast(isEdit ? "Project updated successfully!" : "New project added successfully!");
    fetchProjects();
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
        );
        showToast("Featured status updated!");
      }
    } catch {
      showToast("Failed to toggle featured status");
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast("Project deleted successfully");
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Failed to delete project");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-muted">
        Checking authentication...
      </div>
    );
  }

  // 1. Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-bg-card border border-border-default rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-lime to-accent-cyan" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-secondary text-xs text-accent-lime font-mono mb-3">
              🔒 DEVLABS ADMIN
            </div>
            <h1 className="text-2xl font-bold font-display text-text-primary">
              Studio Project Manager
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Enter admin password to manage your portfolio projects
            </p>
          </div>

          {status && !status.configured && (
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
              Admin login is disabled until <code>ADMIN_PASSWORD</code> and{" "}
              <code>ADMIN_SESSION_SECRET</code> (32+ characters) are set in the environment.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-lime transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-accent-lime text-bg-primary font-bold rounded-xl hover:bg-accent-lime/90 transition-all text-sm shadow-lg shadow-accent-lime/20 disabled:opacity-50"
            >
              {isLoggingIn ? "Verifying..." : "Access Dashboard →"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-default text-center">
            <Link
              href="/"
              className="text-xs text-text-muted hover:text-accent-lime transition-colors"
            >
              ← Back to DevLabs Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  const featuredCount = projects.filter((p) => p.featured).length;
  const categoriesCount = new Set(projects.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-accent-lime text-bg-primary font-semibold shadow-2xl flex items-center gap-2 text-sm"
          >
            <span>✓</span> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {status?.storage === "none" && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
          Changes can&apos;t be saved yet: connect a Vercel Blob store to this project so{" "}
          <code>BLOB_READ_WRITE_TOKEN</code> is set, then redeploy.
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border-default mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-xs font-mono">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-text-muted">
              {status?.storage === "blob"
                ? "Cloud storage connected"
                : status?.storage === "local"
                  ? "Local file storage (development)"
                  : "Storage not configured"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-text-primary">
            Project Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/work"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-border-default text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors text-sm"
          >
            View Live Portfolio ↗
          </Link>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-accent-lime text-bg-primary font-bold hover:bg-accent-lime/90 transition-all text-sm shadow-lg shadow-accent-lime/20 flex items-center gap-2"
          >
            <span>+</span> Add New Project
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-border-default text-text-muted hover:text-red-400 hover:border-red-500/30 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-bg-card border border-border-default rounded-2xl p-6">
          <span className="text-xs font-mono uppercase text-text-muted block mb-1">
            Total Projects
          </span>
          <span className="text-3xl font-bold font-display text-text-primary">
            {projects.length}
          </span>
        </div>
        <div className="bg-bg-card border border-border-default rounded-2xl p-6">
          <span className="text-xs font-mono uppercase text-text-muted block mb-1">
            Featured on Homepage
          </span>
          <span className="text-3xl font-bold font-display text-accent-lime">
            {featuredCount}
          </span>
        </div>
        <div className="bg-bg-card border border-border-default rounded-2xl p-6">
          <span className="text-xs font-mono uppercase text-text-muted block mb-1">
            Active Categories
          </span>
          <span className="text-3xl font-bold font-display text-accent-cyan">
            {categoriesCount}
          </span>
        </div>
      </div>

      {/* Projects List / Table */}
      <div className="bg-bg-card border border-border-default rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-border-default bg-bg-secondary/30 flex items-center justify-between">
          <h2 className="text-base font-semibold text-text-primary font-display">
            All Projects ({projects.length})
          </h2>
          <span className="text-xs text-text-muted">
            Drag, edit or toggle featured status directly
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-text-muted">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            No projects added yet. Click &quot;Add New Project&quot; above to create one!
          </div>
        ) : (
          <div className="divide-y divide-border-default">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-bg-card-hover/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Accent Color Dot */}
                  <div
                    className="w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 shadow-sm"
                    style={{ backgroundColor: project.accentColor || "#A3E635" }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-text-primary font-display">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-bg-secondary border border-border-default text-text-muted">
                        {project.category}
                      </span>
                      <span className="text-xs text-text-muted font-mono">{project.year}</span>
                      {project.featured && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-1 max-w-xl">
                      {project.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono text-text-muted bg-bg-primary px-2 py-0.5 rounded border border-border-default"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] text-text-muted">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {/* Toggle Featured Button */}
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    title="Toggle Homepage Featured"
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      project.featured
                        ? "bg-accent-lime/15 border-accent-lime/40 text-accent-lime hover:bg-accent-lime/25"
                        : "border-border-default text-text-muted hover:text-text-primary hover:bg-bg-primary"
                    }`}
                  >
                    {project.featured ? "★ Featured" : "☆ Feature"}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-border-default bg-bg-primary text-text-secondary hover:text-text-primary hover:border-accent-lime/50 text-xs transition-colors"
                  >
                    Edit
                  </button>

                  {/* View Details Page */}
                  <Link
                    href={`/work/${project.slug}`}
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-lg border border-border-default bg-bg-primary text-text-muted hover:text-accent-cyan hover:border-accent-cyan/50 text-xs transition-colors"
                  >
                    Preview ↗
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="px-3 py-1.5 rounded-lg border border-transparent text-text-muted hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Form Modal (Add / Edit) */}
      <ProjectFormModal
        key={isModalOpen ? editingProject?.id ?? "new" : "closed"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        projectToEdit={editingProject}
      />
    </div>
  );
}
