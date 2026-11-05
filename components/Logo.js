import Link from "next/link";
import LogoMark from "@/components/LogoMark";

// Logo = mark + two-line wordmark (name + small tagline)
// onDark = true  -> white text (used in the dark footer)
export default function Logo({ onDark = false }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="StudioSpace home">
      <LogoMark size={42} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${onDark ? "text-white" : "text-ink"}`}>
          Studio
          <span className="bg-gradient-to-r from-[#8b70ff] to-[#ff6b9a] bg-clip-text text-transparent">Space</span>
        </span>
        <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] ${onDark ? "text-white/60" : "text-muted"}`}>
          Creative Spaces
        </span>
      </span>
    </Link>
  );
}