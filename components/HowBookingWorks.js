import { FiClock, FiFilm, FiSearch, FiZap } from "react-icons/fi";
import SectionTitle from "@/components/SectionTitle";
import { bookingSteps } from "@/lib/data";

const icons = [FiSearch, FiClock, FiZap, FiFilm];

export default function HowBookingWorks() {
  return (
    <section className="bg-surface py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="How booking works"
          title="From idea to shoot day in four steps"
          text="No emails back and forth. Pick a space, pick your hours, and get creating."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={step.title} className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg p-7">
                <span className="absolute -right-1 -top-3 font-display text-8xl font-bold text-accent/10">{i + 1}</span>
                <span
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-accent/25"
                  style={{ backgroundImage: "linear-gradient(135deg, #6c4df6, #ff6b9a)" }}
                >
                  <Icon size={26} />
                </span>
                <h3 className="relative mt-6 text-xl font-bold text-ink">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
