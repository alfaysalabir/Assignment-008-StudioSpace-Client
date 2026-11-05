"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCalendar, FiClock, FiDownload, FiUsers } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import PageHeader from "@/components/PageHeader";
import SafeImage from "@/components/SafeImage";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { downloadInvoice } from "@/lib/invoice";

const badgeColors = {
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Confirmed: "bg-green-500/15 text-green-600 dark:text-green-400",
  Completed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

function StatusBadge({ status }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeColors[status]}`}>{status}</span>;
}

function MyBookings() {
  const [tab, setTab] = useState("mine");
  const [mine, setMine] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toCancel, setToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  async function loadAll() {
    try {
      const [a, b] = await Promise.all([api("/bookings/my"), api("/bookings/requests")]);
      setMine(a);
      setRequests(b);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function confirmCancel() {
    setCancelling(true);
    try {
      await api(`/bookings/${toCancel._id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      setToCancel(null);
      await loadAll();
    } catch (error) {
      toast.error(error.message);
    }
    setCancelling(false);
  }

  async function hostAction(id, status) {
    try {
      const data = await api(`/bookings/${id}/status`, { method: "PATCH", body: { status } });
      toast.success(data.message);
      await loadAll();
    } catch (error) {
      toast.error(error.message); // shows the double-booking message too
    }
  }

  function BookingCard({ b, host }) {
    return (
      <div className="card flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <SafeImage src={b.studioImage} alt={b.studioTitle} className="h-40 w-full rounded-xl object-cover md:h-28 md:w-40" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="truncate text-xl font-semibold text-ink">{b.studioTitle}</h3>
            <StatusBadge status={b.status} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <span className="flex items-center gap-1.5"><FiCalendar /> {b.date}</span>
            <span className="flex items-center gap-1.5"><FiClock /> {b.startTime} - {b.endTime}</span>
            <span className="flex items-center gap-1.5"><FiUsers /> {b.guests} guest{b.guests > 1 ? "s" : ""}</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {host ? `Requested by ${b.userName} (${b.userEmail})` : `Host: ${b.hostName}`}
          </p>
          <p className="mt-1 text-sm font-bold text-ink">Total: ${b.totalPrice}</p>
        </div>

        <div className="flex flex-wrap gap-2 md:flex-col">
          {!host && b.status === "Pending" && (
            <button onClick={() => setToCancel(b)} className="btn-danger">Cancel Booking</button>
          )}
          {!host && (b.status === "Confirmed" || b.status === "Completed") && (
            <button onClick={() => downloadInvoice(b)} className="btn-outline"><FiDownload /> Invoice PDF</button>
          )}
          {host && b.status === "Pending" && (
            <>
              <button onClick={() => hostAction(b._id, "Confirmed")} className="btn-primary !py-2.5">Confirm</button>
              <button onClick={() => hostAction(b._id, "Cancelled")} className="btn-outline">Decline</button>
            </>
          )}
          {host && b.status === "Confirmed" && (
            <button onClick={() => hostAction(b._id, "Completed")} className="btn-primary !py-2.5">Mark Completed</button>
          )}
        </div>
      </div>
    );
  }

  const list = tab === "mine" ? mine : requests;

  return (
    <>
      <PageHeader eyebrow="Reservations" title="My bookings" text="Track your reservations and manage requests for your own studios." />
      <section className="container-x py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <button onClick={() => setTab("mine")} className={`rounded-full border px-5 py-2 text-sm font-semibold ${tab === "mine" ? "border-transparent bg-accent text-white" : "border-line bg-surface text-ink"}`}>
            My Reservations ({mine.length})
          </button>
          <button onClick={() => setTab("requests")} className={`rounded-full border px-5 py-2 text-sm font-semibold ${tab === "requests" ? "border-transparent bg-accent text-white" : "border-line bg-surface text-ink"}`}>
            Requests For My Studios ({requests.length})
          </button>
        </div>

        {loading ? (
          <ListSkeleton />
        ) : list.length === 0 ? (
          tab === "mine" ? (
            <EmptyState title="No bookings yet" text="You have not booked any studio. Find a space and book your first session." buttonText="Explore Studios" href="/studios" />
          ) : (
            <EmptyState title="No requests yet" text="When creators book your studios, their requests will show up here." buttonText="Add New Studio" href="/add-studio" />
          )
        ) : (
          <div className="space-y-4">
            {list.map((b) => (
              <BookingCard key={b._id} b={b} host={tab === "requests"} />
            ))}
          </div>
        )}
      </section>

      <ConfirmModal
        open={!!toCancel}
        title="Cancel this booking?"
        text={toCancel ? `Your request for "${toCancel.studioTitle}" on ${toCancel.date} will be cancelled.` : ""}
        confirmText="Yes, cancel"
        loading={cancelling}
        onConfirm={confirmCancel}
        onCancel={() => !cancelling && setToCancel(null)}
      />
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookings />
    </PrivateRoute>
  );
}
