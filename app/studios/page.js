"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";
import StudioCard from "@/components/StudioCard";
import { SkeletonGrid } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import { categories } from "@/lib/data";

function StudiosContent() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  // when the URL category changes (Home page cards / footer links)
  useEffect(() => {
    setCategory(params.get("category") || "All");
  }, [params]);

  // small delay while typing, so we do not call the server on every key
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams({ category, sort, search });
    api(`/studios?${query.toString()}`)
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [category, sort, search]);

  function clearFilters() {
    setCategory("All");
    setSearchInput("");
    setSearch("");
    setSort("newest");
  }

  return (
    <>
      <PageHeader eyebrow="Explore studios" title="Find your creative space" text="Search by name or city, filter by category and sort by price or rating." />

      <section className="container-x py-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search studio name, city or category..."
              className="input pl-11"
            />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input lg:max-w-[220px]" aria-label="Sort studios">
            <option value="newest">Newest first</option>
            <option value="rating">Top rated</option>
            <option value="priceLow">Price: low to high</option>
            <option value="priceHigh">Price: high to low</option>
          </select>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {[{ value: "All", label: "All Studios" }, ...categories].map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                category === c.value ? "border-transparent bg-accent text-white" : "border-line bg-surface text-ink hover:border-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : studios.length === 0 ? (
          <EmptyState
            title="No studios found"
            text="We could not find a studio for that search. Try another word or clear your filters."
            buttonText="Clear filters"
            onClick={clearFilters}
          />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted">Showing {studios.length} studio{studios.length > 1 ? "s" : ""}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={String(studio._id)} studio={studio} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default function StudiosPage() {
  return (
    <Suspense fallback={null}>
      <StudiosContent />
    </Suspense>
  );
}
