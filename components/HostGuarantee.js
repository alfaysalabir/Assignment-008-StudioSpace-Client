import { FiCheckCircle, FiHeadphones, FiShield, FiTool } from "react-icons/fi";
import SectionTitle from "@/components/SectionTitle";
import { guarantees } from "@/lib/data";

const icons = [FiShield, FiCheckCircle, FiTool, FiHeadphones];

export default function HostGuarantee() {
  return (
    <section className="px-3 py-20 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1b1537] px-5 py-16 sm:px-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-accent2/20 blur-3xl" />
        <div className="relative">
          <SectionTitle
            light
            eyebrow="Host guarantee & creator support"
            title="Create with confidence"
            text="We protect both sides of every booking so you can focus on the work."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => {
              const Icon = icons[i];
              return (
                <div key={g.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:border-accent2/60">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundImage: "linear-gradient(135deg, #6c4df6, #ff6b9a)" }}
                  >
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{g.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
