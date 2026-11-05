"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiEdit2, FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import PageHeader from "@/components/PageHeader";
import SafeImage from "@/components/SafeImage";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";

function MyListings() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api("/studios/my")
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function confirmDelete() {
    setDeleting(true);
    try {
      await api(`/studios/${toDelete._id}`, { method: "DELETE" });
      setStudios((old) => old.filter((s) => s._id !== toDelete._id));
      toast.success("Studio deleted successfully");
      setToDelete(null);
    } catch (error) {
      toast.error(error.message);
    }
    setDeleting(false);
  }

  return (
    <>
      <PageHeader eyebrow="Host dashboard" title="My studio listings" text="Update or remove the spaces you have listed." />
      <section className="container-x py-12">
        {loading ? (
          <ListSkeleton />
        ) : studios.length === 0 ? (
          <EmptyState title="You have no listings yet" text="Add your first studio and start welcoming creators." buttonText="Add New Studio" href="/add-studio" />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted">{studios.length} listing{studios.length > 1 ? "s" : ""}</p>
              <Link href="/add-studio" className="btn-primary !py-2.5"><FiPlus /> Add New Studio</Link>
            </div>
            <div className="space-y-4">
              {studios.map((studio) => (
                <div key={studio._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <SafeImage src={studio.image} alt={studio.title} className="h-40 w-full rounded-xl object-cover sm:h-24 sm:w-36" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">{studio.category}</span>
                    <h3 className="truncate text-xl font-semibold text-ink">{studio.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><FiMapPin /> {studio.location}</p>
                    <p className="mt-1 text-sm font-bold text-ink">${studio.hourlyRate} / hr</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/studios/edit/${studio._id}`} className="btn-outline"><FiEdit2 /> Update</Link>
                    <button onClick={() => setToDelete(studio)} className="btn-danger"><FiTrash2 /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <ConfirmModal
        open={!!toDelete}
        title="Delete this studio?"
        text={toDelete ? `"${toDelete.title}" will be removed forever. Open bookings for it will be cancelled.` : ""}
        confirmText="Yes, delete"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListings />
    </PrivateRoute>
  );
}
