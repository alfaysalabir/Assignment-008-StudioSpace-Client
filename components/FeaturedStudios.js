"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "@/components/SectionTitle";
import StudioCard from "@/components/StudioCard";
import { SkeletonGrid } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // top-rated first, only 6 studios (.limit(6) on the server)
    api("/studios?sort=rating&limit=6")
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="Featured studios"
          title="Top-rated spaces ready to book"
          text="Hand-picked rooms loved by photographers, filmmakers, podcasters and musicians."
        />
        {loading ? (
          <SkeletonGrid count={6} />
        ) : studios.length === 0 ? (
          <EmptyState
            title="No studios yet"
            text="Be the first host on StudioSpace and list your creative space."
            buttonText="Host Your Space"
            href="/add-studio"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={String(studio._id)} studio={studio} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/studios" className="btn-outline">
            See all studios <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
