"use client";
import Link from "next/link";
import { toast } from "sonner";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import Logo from "@/components/Logo";
import { categories } from "@/lib/data";

function FooterTitle({ children }) {
  return (
    <div className="mb-5">
      <h4 className="text-lg font-semibold text-white">{children}</h4>
      <span className="mt-2 block h-1 w-10 rounded-full bg-gradient-to-r from-accent to-accent2" />
    </div>
  );
}

export default function Footer() {
  function handleSubscribe(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return toast.error("Please enter your email address");
    toast.success("Thanks for subscribing to StudioSpace news!");
    e.target.reset();
  }

  return (
    <footer className="mt-10 bg-[#1b1537] text-white/75">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo onDark />
          <p className="mt-5 text-sm leading-relaxed">
            Our mission is simple: help every creator find a great space to work, and help every studio owner share it.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaXTwitter, label: "X" },
              { icon: FaYoutube, label: "YouTube" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gradient-to-br hover:from-accent hover:to-accent2 hover:text-white">
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <FooterTitle>Quick Links</FooterTitle>
          <ul className="space-y-3 text-sm">
            {[
              ["/", "Home"],
              ["/studios", "Explore Studios"],
              ["/how-it-works", "How It Works"],
              ["/about", "About Us"],
              ["/add-studio", "Host Your Space"],
            ].map(([href, label]) => (
              <li key={href}><Link href={href} className="transition hover:text-accent2">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <FooterTitle>Popular Categories</FooterTitle>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.value}>
                <Link href={`/studios?category=${encodeURIComponent(c.value)}`} className="transition hover:text-accent2">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterTitle>Newsletter</FooterTitle>
          <p className="text-sm">Get new studio drops and creator tips every month.</p>
          <form onSubmit={handleSubscribe} className="mt-4 flex items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15">
            <input name="email" type="email" placeholder="Your email..." className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/50" />
            <button className="btn-primary !h-10 !w-10 !p-0" aria-label="Subscribe"><FiSend size={16} /></button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-center text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>By using this website you agree to our Terms of Use and Privacy Policy.</p>
        </div>
      </div>
    </footer>
  );
}
