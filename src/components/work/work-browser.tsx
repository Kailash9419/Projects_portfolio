"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reveal, SectionLabel, SplitHeading } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, type Project, type ProjectCategory, type SortOption } from "@/types/project";
import { cn } from "@/lib/utils";

export function WorkBrowser({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const w = t.workPage;
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of projects) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return [p.title, p.tagline, p.description, p.category, ...p.technologies, ...(p.features || [])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    return [...list].sort((a, b) => {
      if (sort === "newest") return b.year - a.year;
      if (sort === "oldest") return a.year - b.year;
      return Number(b.featured) - Number(a.featured) || b.year - a.year;
    });
  }, [projects, category, query, sort]);

  const filters: (ProjectCategory | "All")[] = ["All", ...CATEGORIES.filter((c) => counts[c])];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
      <SectionLabel index="—">{t.work.label}</SectionLabel>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
        <SplitHeading as="h1" immediate className="font-display text-7xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] sm:text-9xl lg:col-span-8 xl:text-[11rem]">
          {w.title} <span className="text-outline-lime">{w.titleAccent}</span>
        </SplitHeading>
      </div>

      {/* controls */}
      <div className="sticky top-16 z-30 -mx-4 mt-14 border-y border-line bg-ink/80 px-4 py-4 backdrop-blur-xl sm:top-[72px] sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
            {filters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "h-9 rounded-full border px-4 text-sm transition-colors",
                  category === c ? "border-lime bg-lime text-ink" : "border-line-strong text-muted-foreground hover:text-fg"
                )}
              >
                {c === "All" ? w.all : c}
                <span className="ml-1.5 font-mono text-[10px] opacity-60">{c === "All" ? projects.length : counts[c]}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 lg:w-72 lg:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={w.search}
                aria-label={w.search}
                className="h-10 rounded-full border-line-strong bg-surface pl-9"
              />
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="h-10 w-36 rounded-full border-line-strong bg-surface" aria-label="Sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-line-strong bg-raised">
                <SelectItem value="featured">{w.sort.featured}</SelectItem>
                <SelectItem value="newest">{w.sort.newest}</SelectItem>
                <SelectItem value="oldest">{w.sort.oldest}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
        {visible.length} / {projects.length}
      </p>

      {visible.length === 0 ? (
        <p className="py-32 text-center text-lg text-muted-foreground">{w.empty}</p>
      ) : (
        <Reveal key={`${category}-${sort}-${visible.length}`} className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2" stagger={0.08}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} className={i % 2 === 1 ? "sm:mt-24" : undefined} />
          ))}
        </Reveal>
      )}
    </div>
  );
}
