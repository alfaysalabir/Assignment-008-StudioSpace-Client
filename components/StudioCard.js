"use client";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";
import { useApp } from "@/components/Providers";

// New card: photo inside a padded rounded frame, floating badges, soft price row
export default function StudioCard({ studio }) {
  const { wishlist, toggleWishlist } = useApp();
  const id = String(studio._id);
  const saved = wishlist.includes(id);

  return (
    <article className="card group flex h-full flex-col p-3 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/15">
      <div className="relative h-56 overflow-hidden rounded-2xl">
        <SafeImage src={studio.image} alt={studio.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-bold text-accent shadow">
          {studio.category}
        </span>
        <button
          onClick={() => toggleWishlist(id)}
          aria-label={saved ? "Remove from saved studios" : "Save this studio"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/95 text-red-500 shadow transition hover:scale-110"
        >
          {saved ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </button>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-surface/95 px-2.5 py-1 text-xs font-bold text-ink shadow">
          <FaStar className="text-amber-400" size={12} />
          {studio.rating > 0 ? studio.rating.toFixed(1) : "New"}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="line-clamp-1 text-xl font-bold text-ink">{studio.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <FiMapPin className="shrink-0 text-accent" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="rounded-full bg-accent/10 px-4 py-2 text-lg font-bold text-accent">
            ${studio.hourlyRate}
            <span className="text-xs font-semibold text-muted"> / hr</span>
          </p>
          <Link href={`/studios/${id}`} className="btn-primary !px-5 !py-2.5">
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
