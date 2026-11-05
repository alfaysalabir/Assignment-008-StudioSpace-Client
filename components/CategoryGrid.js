import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionTitle from "@/components/SectionTitle";
import { categories } from "@/lib/data";

// each category gets its own soft color
const tints = [
  "bg-violet-500/10 text-violet-500",
  "bg-pink-500/10 text-pink-500",
  "bg-amber-500/15 text-amber-500",
  "bg-sky-500/10 text-sky-500",
  "bg-emerald-500/10 text-emerald-500",
];

export default function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow="Browse by category"
          title="Whatever you create, there is a room for it"
          text="Choose a category and we will show you only the matching studios."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Link
              key={c.value}
              href={`/studios?category=${encodeURIComponent(c.value)}`}
              className="card group relative flex h-full flex-col p-6 transition hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tints[i % tints.length]}`}>
                <c.icon size={26} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{c.label}</h3>
              <p className="mt-2 text-sm text-muted">{c.text}</p>
              <FiArrowUpRight className="absolute right-5 top-5 text-muted transition group-hover:text-accent" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
