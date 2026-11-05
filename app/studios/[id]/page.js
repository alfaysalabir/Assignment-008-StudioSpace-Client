"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { FiCheck, FiCalendar, FiMapPin, FiShield, FiUsers } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";
import StarRating from "@/components/StarRating";
import BookingModal from "@/components/BookingModal";
import PageLoader from "@/components/PageLoader";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, wishlist, toggleWishlist } = useApp();

  const [studio, setStudio] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  // review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  function loadStudio() {
    return api(`/studios/${id}`)
      .then(setStudio)
      .catch((error) => {
        setNotFound(true);
        toast.error(error.message);
      });
  }

  useEffect(() => {
    loadStudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleBookClick() {
    if (!user) {
      toast.error("Please login to book a studio");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${id}`)}`);
      return;
    }
    if (user.email === studio.ownerEmail) {
      toast.error("You cannot book your own studio");
      return;
    }
    setShowBooking(true);
  }

  async function handleReview(e) {
    e.preventDefault();
    if (comment.trim().length < 5) return toast.error("Please write a short comment");
    setSending(true);
    try {
      await api(`/studios/${id}/reviews`, { method: "POST", body: { rating, comment } });
      toast.success("Thanks for your review!");
      setComment("");
      await loadStudio();
    } catch (error) {
      toast.error(error.message);
    }
    setSending(false);
  }

  if (notFound) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="text-4xl font-semibold text-ink">Studio not found</h1>
        <p className="mt-3 text-muted">This studio may have been removed by its host.</p>
        <Link href="/studios" className="btn-primary mt-6">Back to Explore Studios</Link>
      </section>
    );
  }
  if (!studio) return <PageLoader text="Opening the studio..." />;

  const images = [studio.image, ...(studio.gallery || [])].filter(Boolean);
  const saved = wishlist.includes(String(studio._id));
  const alreadyReviewed = user && (studio.reviews || []).some((r) => r.userEmail === user.email);
  const canReview = user && user.email !== studio.ownerEmail && !alreadyReviewed;

  return (
    <section className="container-x py-10">
      <div className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">Home</Link> / <Link href="/studios" className="hover:text-accent">Studios</Link> / <span className="text-ink">{studio.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* LEFT */}
        <div className="min-w-0">
          {/* gallery carousel */}
          <div className="overflow-hidden rounded-2xl">
            <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="h-[260px] sm:h-[420px]">
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <SafeImage src={src} alt={`${studio.title} photo ${i + 1}`} className="h-full w-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{studio.category}</span>
              <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{studio.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-muted"><FiMapPin className="text-accent" /> {studio.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-bold text-ink shadow-sm ring-1 ring-line">
                <FaStar className="text-amber-400" /> {studio.rating > 0 ? studio.rating.toFixed(1) : "New"}
                <span className="font-medium text-muted">({studio.reviewCount || 0})</span>
              </span>
              <button onClick={() => toggleWishlist(String(studio._id))} aria-label="Save studio" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-red-500 shadow-sm ring-1 ring-line">
                {saved ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>

          {/* specs */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: FiUsers, label: "Max capacity", value: `${studio.maxCapacity} people` },
              { icon: FiShield, label: "Security deposit", value: `$${studio.securityDeposit}` },
              { icon: FiCalendar, label: "Hourly rate", value: `$${studio.hourlyRate}` },
              { icon: FiMapPin, label: "Category", value: studio.category },
            ].map((spec) => (
              <div key={spec.label} className="card flex h-full flex-col items-center p-4 text-center">
                <spec.icon className="text-accent" size={22} />
                <p className="mt-2 text-xs text-muted">{spec.label}</p>
                <p className="mt-0.5 text-sm font-bold text-ink">{spec.value}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-ink">About this space</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{studio.overview}</p>

          <h2 className="mt-10 text-2xl font-semibold text-ink">Amenities</h2>
          {studio.amenities?.length ? (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {studio.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-ink">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent"><FiCheck size={14} /></span>
                  {a}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">The host has not listed amenities yet.</p>
          )}

          {/* host */}
          <h2 className="mt-10 text-2xl font-semibold text-ink">Your host</h2>
          <div className="card mt-4 flex items-center gap-4 p-5">
            {studio.ownerPhoto ? (
              <img src={studio.ownerPhoto} alt={studio.ownerName} referrerPolicy="no-referrer" className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">{studio.ownerName?.[0]?.toUpperCase()}</span>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-ink">{studio.ownerName}</p>
              <p className="truncate text-sm text-muted">{studio.ownerEmail}</p>
            </div>
          </div>

          {/* reviews */}
          <h2 className="mt-10 text-2xl font-semibold text-ink">Reviews ({studio.reviewCount || 0})</h2>
          <div className="mt-4 space-y-4">
            {(studio.reviews || []).length === 0 && <p className="text-muted">No reviews yet. Be the first to share your experience.</p>}
            {(studio.reviews || []).map((r, i) => (
              <div key={r._id || i} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink">{r.userName}</p>
                  <StarRating value={r.rating} size={14} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.comment}</p>
              </div>
            ))}
          </div>

          {canReview && (
            <form onSubmit={handleReview} className="card mt-6 space-y-4 p-5">
              <h3 className="text-lg font-semibold text-ink">Write a review</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                    <FaStar size={26} className={n <= rating ? "text-amber-400" : "text-line"} />
                  </button>
                ))}
              </div>
              <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was your session?" className="input" />
              <button className="btn-primary" disabled={sending}>{sending ? "Sending..." : "Post Review"}</button>
            </form>
          )}
        </div>

        {/* RIGHT - sticky booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="text-3xl font-bold text-ink">
              ${studio.hourlyRate}<span className="text-base font-medium text-muted"> / hour</span>
            </p>
            <p className="mt-1 text-sm text-muted">Refundable security deposit: ${studio.securityDeposit}</p>
            <ul className="mt-5 space-y-2 text-sm text-ink">
              <li className="flex items-center gap-2"><FiCheck className="text-accent" /> Instant booking request</li>
              <li className="flex items-center gap-2"><FiCheck className="text-accent" /> Free cancellation while Pending</li>
              <li className="flex items-center gap-2"><FiCheck className="text-accent" /> No double bookings</li>
            </ul>
            <button onClick={handleBookClick} className="btn-primary mt-6 w-full">Book Workspace Now</button>
          </div>
        </aside>
      </div>

      {showBooking && <BookingModal studio={studio} onClose={() => setShowBooking(false)} />}
    </section>
  );
}
