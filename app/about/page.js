import Link from "next/link";
import { FiHeart, FiUsers, FiZap } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";

const values = [
  { icon: FiUsers, title: "Community first", text: "We grow when creators and studio owners grow together." },
  { icon: FiZap, title: "Simple and fast", text: "Clear prices, clear slots and a booking flow that takes a minute." },
  { icon: FiHeart, title: "Made for makers", text: "Every feature is built around real shoots, sessions and workshops." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="We believe great work needs great rooms" text="StudioSpace connects creators with spaces they could never afford to own." />

      <section className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="section-title">A marketplace built by people who love to create</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Photographers, filmmakers, podcasters and musicians often lose days searching for a space that fits their budget. At the same time, many studios sit empty between projects.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            StudioSpace brings both sides together. Hosts list their rooms, creators book by the hour, and everyone sees honest pricing and real availability.
          </p>
          <Link href="/studios" className="btn-primary mt-6">Explore Studios</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["5", "Studio categories"],
            ["1 hr", "Minimum booking"],
            ["0", "Double bookings"],
            ["24/7", "Host support"],
          ].map(([n, label]) => (
            <div key={label} className="card flex h-full flex-col items-center justify-center p-8 text-center">
              <p className="font-display text-4xl font-semibold text-accent">{n}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionTitle eyebrow="What we value" title="The ideas behind StudioSpace" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card flex h-full flex-col items-center p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bg text-accent"><v.icon size={28} /></span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
