import { TbAperture } from "react-icons/tb";

// shared layout for Login and Register pages
export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="container-x grid min-h-[80vh] items-center gap-10 py-10 lg:grid-cols-2">
      <div
        className="relative hidden overflow-hidden rounded-[2.5rem] p-12 text-white lg:block"
        style={{ backgroundImage: "linear-gradient(135deg, #6c4df6, #ff6b9a)" }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
        <div className="relative">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <TbAperture size={36} />
          </span>
          <p className="mt-8 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">Welcome to StudioSpace</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight">Your next great shoot starts with the right room.</h2>
          <p className="mt-4 max-w-md text-white/85">
            Book verified creative studios by the hour or share your own space with creators in your city.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/90">
            <li>• Clear hourly pricing with no hidden fees</li>
            <li>• Confirmed slots can never be double booked</li>
            <li>• Save your favourite studios for later</li>
          </ul>
        </div>
      </div>

      <div className="card mx-auto w-full max-w-md p-7 sm:p-9">
        <h1 className="font-display text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
