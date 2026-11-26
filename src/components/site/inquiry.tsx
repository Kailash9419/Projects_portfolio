"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND, CONTACT } from "@/data/brand";
import { cn } from "@/lib/utils";

/* ───────────── shared open/close state so any CTA can launch the dialog ───────────── */

const InquiryContext = createContext<{ open: () => void } | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[92svh] overflow-y-auto border-line-strong bg-surface p-6 sm:max-w-lg sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent" />
          <DialogHeader className="text-left">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">{t.nav.cta}</span>
            <DialogTitle className="font-display text-5xl font-extrabold uppercase tracking-[-0.04em]">
              {t.contact.title} <span className="text-lime">{t.contact.titleAccent}</span>
            </DialogTitle>
            <DialogDescription>{t.contact.lede}</DialogDescription>
          </DialogHeader>
          <InquiryForm compact onDone={() => setTimeout(() => setIsOpen(false), 2600)} />
        </DialogContent>
      </Dialog>
    </InquiryContext.Provider>
  );
}

/* ───────────── the form itself (used inline in Contact and in the dialog) ───────────── */

type State = "idle" | "sending" | "sent" | "error";

export function InquiryForm({ compact = false, onDone }: { compact?: boolean; onDone?: () => void }) {
  const { t, language } = useLanguage();
  const [data, setData] = useState({ name: "", phone: "", projectType: "", message: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");

  const whatsappUrl = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    `Hi ${BRAND.name}! 👋\n\nName: ${data.name}\nPhone: ${data.phone}\nRequirement: ${data.projectType || "General"}\nDetails: ${data.message || "-"}`
  )}`;

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setState("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, website, language }),
        });
        if (res.ok) {
          setState("sent");
          setData({ name: "", phone: "", projectType: "", message: "" });
          onDone?.();
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    },
    [data, website, language, onDone]
  );

  if (state === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-8">
        <span className="grid size-14 place-items-center rounded-full bg-lime text-primary-foreground">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <h3 className="font-display text-3xl font-extrabold tracking-tight">{t.form.sentTitle}</h3>
        <p className="text-muted-foreground">{t.form.sentDesc}</p>
        <button type="button" onClick={() => setState("idle")} className="font-mono text-xs uppercase tracking-[0.2em] text-lime hover:underline">
          ← {t.form.submit}
        </button>
      </div>
    );
  }

  const field = "h-12 rounded-lg border-line-strong bg-ink/60 text-base placeholder:text-faint focus-visible:border-lime/60 focus-visible:ring-lime/20";

  return (
    <form onSubmit={submit} className="grid gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <div className="grid gap-2">
          <Label htmlFor={`name-${compact}`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.form.name} *
          </Label>
          <Input
            id={`name-${compact}`}
            required
            autoComplete="name"
            placeholder={t.form.namePlaceholder}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`phone-${compact}`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.form.phone} *
          </Label>
          <Input
            id={`phone-${compact}`}
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.form.type}</Label>
        <Select value={data.projectType} onValueChange={(v) => setData({ ...data, projectType: v })}>
          <SelectTrigger className={cn(field, "w-full data-[size=default]:h-12")}>
            <SelectValue placeholder={t.form.typePlaceholder} />
          </SelectTrigger>
          <SelectContent className="border-line-strong bg-raised">
            {t.form.types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`msg-${compact}`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {t.form.details}
        </Label>
        <Textarea
          id={`msg-${compact}`}
          rows={compact ? 3 : 4}
          placeholder={t.form.detailsPlaceholder}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          className={cn(field, "h-auto min-h-28 resize-none py-3")}
        />
      </div>

      {state === "error" && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-300">
          {t.form.error}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={state === "sending"}
          className="group h-14 rounded-full px-8 text-base font-semibold"
        >
          {state === "sending" ? (
            <>
              <Loader2 className="animate-spin" /> {t.form.sending}
            </>
          ) : (
            <>
              {t.form.submit}
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-whatsapp hover:underline">
          {t.form.whatsapp} →
        </a>
      </div>
    </form>
  );
}
