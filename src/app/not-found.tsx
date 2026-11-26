import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative grid min-h-svh place-items-center overflow-hidden px-4">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">Error 404</p>
        <h1 className="text-outline-lime mt-4 font-display text-[38vw] font-extrabold leading-[0.8] tracking-[-0.06em] sm:text-[22rem]">
          404
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
          This page doesn&apos;t exist, or it moved. Let&apos;s get you back.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-lime px-8 font-semibold text-primary-foreground transition-colors hover:bg-lime-deep"
        >
          <ArrowLeft className="size-5" /> Back home
        </Link>
      </div>
    </section>
  );
}
