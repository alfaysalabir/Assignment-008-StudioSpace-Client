import Link from "next/link";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      {/* simple studio illustration: light stand + clapperboard */}
      <svg viewBox="0 0 320 220" className="h-56 w-auto" role="img" aria-label="Empty studio illustration">
        <ellipse cx="160" cy="200" rx="130" ry="12" fill="currentColor" className="text-line" />
        <g stroke="#6c4df6" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M70 200 L90 120 L110 200" />
          <path d="M90 120 V40" />
        </g>
        <circle cx="90" cy="34" r="22" fill="#6c4df6" />
        <circle cx="90" cy="34" r="10" fill="#ffe3ee" />
        <path d="M60 20 L30 8 M60 34 L24 34 M60 48 L30 60" stroke="#6c4df6" strokeWidth="3" strokeLinecap="round" />
        <g transform="rotate(-8 215 120)">
          <rect x="165" y="105" width="110" height="70" rx="6" fill="#1b1537" />
          <rect x="165" y="80" width="110" height="24" rx="4" fill="#2a2150" />
          <path d="M175 80 L195 104 M200 80 L220 104 M225 80 L245 104 M250 80 L270 104" stroke="#6c4df6" strokeWidth="7" />
          <text x="220" y="148" textAnchor="middle" fontSize="26" fontWeight="700" fill="#6c4df6">404</text>
        </g>
      </svg>

      <h1 className="mt-6 font-display text-4xl font-semibold text-ink md:text-5xl">Cut! This scene is missing</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for has left the set. Let&apos;s get you back to the studio.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <FiHome /> Return to Home
      </Link>
    </section>
  );
}
