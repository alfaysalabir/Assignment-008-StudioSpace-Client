import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HostBanner() {
  return (
    <section className="pb-20">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:py-20"
          style={{ backgroundImage: "linear-gradient(135deg, #6c4df6, #ff6b9a)" }}
        >
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/15" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              Got an empty room? Share your studio and start earning
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Listing takes only a few minutes. Set your price, add your gear and let creators find you.
            </p>
            <Link href="/add-studio" className="btn-light mt-8">
              Add New Studio <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
