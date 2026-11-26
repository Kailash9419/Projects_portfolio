export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-ink">
      <div className="flex flex-col items-center gap-5">
        <span className="relative block h-px w-40 overflow-hidden bg-line-strong">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[marquee_1.1s_linear_infinite] bg-lime" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Loading</span>
      </div>
    </div>
  );
}
