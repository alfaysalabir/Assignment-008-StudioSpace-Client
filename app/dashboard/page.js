"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiCalendar, FiHeart, FiInbox, FiLayers } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import PageHeader from "@/components/PageHeader";
import StudioCard from "@/components/StudioCard";
import EmptyState from "@/components/EmptyState";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function Dashboard() {
  const { user } = useApp();
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([api("/studios/my"), api("/bookings/my"), api("/bookings/requests"), api("/wishlist/studios")])
      .then(([listings, bookings, requests, saved]) => setData({ listings, bookings, requests, saved }))
      .catch((error) => toast.error(error.message));
  }, []);

  const stats = [
    { label: "My listings", value: data?.listings.length, icon: FiLayers, href: "/my-listings" },
    { label: "My bookings", value: data?.bookings.length, icon: FiCalendar, href: "/my-bookings" },
    { label: "Pending requests", value: data?.requests.filter((r) => r.status === "Pending").length, icon: FiInbox, href: "/my-bookings" },
    { label: "Saved studios", value: data?.saved.length, icon: FiHeart, href: "#saved" },
  ];

  return (
    <>
      <PageHeader eyebrow="Dashboard" title={`Hello, ${user.name.split(" ")[0]}`} text="Here is a quick look at everything happening on your account." />
      <section className="container-x py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="card flex h-full flex-col items-center p-6 text-center transition hover:-translate-y-1 hover:border-accent">
              <s.icon size={26} className="text-accent" />
              <p className="mt-3 font-display text-4xl font-semibold text-ink">{data ? s.value : "-"}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/add-studio" className="btn-primary">Add New Studio</Link>
          <Link href="/studios" className="btn-outline">Explore Studios</Link>
        </div>

        <h2 id="saved" className="mt-14 text-3xl font-semibold text-ink">Saved studios</h2>
        <div className="mt-6">
          {!data ? (
            <div className="h-40 animate-pulse rounded-2xl bg-line/50" />
          ) : data.saved.length === 0 ? (
            <EmptyState title="Nothing saved yet" text="Tap the heart on any studio to keep it here for later." buttonText="Explore Studios" href="/studios" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.saved.map((studio) => (
                <StudioCard key={String(studio._id)} studio={studio} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}
