"use client";
import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import HowBookingWorks from "@/components/HowBookingWorks";
import { faqs } from "@/lib/data";

export default function HowItWorksPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHeader eyebrow="How it works" title="Booking a studio made simple" text="Whether you create or host, StudioSpace keeps every step clear and fair." />
      <HowBookingWorks />

      <section className="bg-surface py-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <div className="card h-full p-8">
            <p className="eyebrow">For creators</p>
            <h3 className="text-2xl font-semibold text-ink">Book with confidence</h3>
            <ul className="mt-4 space-y-2 text-muted">
              <li>• Browse and filter studios without an account</li>
              <li>• See confirmed slots before choosing your time</li>
              <li>• Track every request in My Bookings</li>
              <li>• Download a PDF invoice after confirmation</li>
            </ul>
          </div>
          <div className="card h-full p-8">
            <p className="eyebrow">For hosts</p>
            <h3 className="text-2xl font-semibold text-ink">Earn from your space</h3>
            <ul className="mt-4 space-y-2 text-muted">
              <li>• List your studio in a few minutes</li>
              <li>• Set your own hourly rate and deposit</li>
              <li>• Confirm or decline each booking request</li>
              <li>• Confirmed slots are protected from clashes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Questions" title="Frequently asked questions" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="card overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-ink">
                  {f.q}
                  <FiChevronDown className={`shrink-0 transition ${open === i ? "rotate-180 text-accent" : ""}`} />
                </button>
                {open === i && <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/studios" className="btn-primary">Explore Studios</Link>
          </div>
        </div>
      </section>
    </>
  );
}
