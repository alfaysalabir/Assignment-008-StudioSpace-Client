"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";
import { api } from "@/lib/api";
import { timeOptions } from "@/lib/data";

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export default function BookingModal({ studio, onClose }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // load confirmed slots for the chosen date
  useEffect(() => {
    if (!date) return;
    api(`/bookings/slots?studioId=${studio._id}&date=${date}`)
      .then(setSlots)
      .catch(() => setSlots([]));
  }, [date, studio._id]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const hours = Math.max(0, (toMinutes(endTime) - toMinutes(startTime)) / 60);
  const total = hours * studio.hourlyRate;
  const clash = slots.find((s) => s.startTime < endTime && s.endTime > startTime);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (hours < 1) return setError("Minimum booking is 1 hour. End time must be after start time.");
    if (clash) return setError(`This time overlaps with a confirmed booking (${clash.startTime} - ${clash.endTime}).`);

    setLoading(true);
    try {
      await api("/bookings", {
        method: "POST",
        body: { studioId: studio._id, date, startTime, endTime, guests: Number(guests), notes },
      });
      toast.success("Booking request sent! The host will confirm soon.");
      router.push("/my-bookings");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="card max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-b-none p-6 sm:rounded-b-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Book workspace</p>
            <h3 className="text-2xl font-semibold text-ink">{studio.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted hover:bg-bg"><FiX size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="b-date">Date</label>
            <input id="b-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="input" required />
          </div>

          {slots.length > 0 && (
            <div className="rounded-xl bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
              <p className="font-semibold">Already booked on this date:</p>
              <p>{slots.map((s) => `${s.startTime} - ${s.endTime}`).join(", ")}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="b-start">Start time</label>
              <select id="b-start" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input">
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="b-end">End time</label>
              <select id="b-end" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input">
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label" htmlFor="b-guests">Guests (max {studio.maxCapacity})</label>
            <input id="b-guests" type="number" min="1" max={studio.maxCapacity} value={guests} onChange={(e) => setGuests(e.target.value)} className="input" />
          </div>

          <div>
            <label className="label" htmlFor="b-notes">Notes for the host (optional)</label>
            <textarea id="b-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What are you planning to create?" className="input" />
          </div>

          <div className="rounded-xl bg-bg p-4 text-sm">
            <div className="flex justify-between"><span className="text-muted">${studio.hourlyRate} x {hours} hr</span><span className="font-semibold text-ink">${total}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted">Security deposit (refundable)</span><span className="font-semibold text-ink">${studio.securityDeposit}</span></div>
            <div className="mt-2 flex justify-between border-t border-line pt-2 text-base"><span className="font-semibold text-ink">Studio total</span><span className="font-bold text-accent">${total}</span></div>
          </div>

          {(error || clash) && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500">
              {error || `This time overlaps with a confirmed booking (${clash.startTime} - ${clash.endTime}).`}
            </p>
          )}

          <button className="btn-primary w-full" disabled={loading}>{loading ? "Sending request..." : "Send Booking Request"}</button>
        </form>
      </div>
    </div>
  );
}
