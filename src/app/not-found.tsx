import Link from "next/link";
import GradientText from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="font-display text-8xl md:text-9xl font-black">
          <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
            404
          </GradientText>
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent-lime text-bg-primary font-semibold rounded-full hover:bg-accent-lime/90 transition-colors duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
