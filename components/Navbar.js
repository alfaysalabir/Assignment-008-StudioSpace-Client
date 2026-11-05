"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiGrid, FiPlusCircle, FiList, FiCalendar, FiLogOut } from "react-icons/fi";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { useApp } from "@/components/Providers";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/add-studio", label: "Add New Studio", icon: FiPlusCircle },
  { href: "/my-listings", label: "My Studio Listings", icon: FiList },
  { href: "/my-bookings", label: "My Bookings", icon: FiCalendar },
];

function Avatar({ user }) {
  if (user.image) {
    return <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full border-2 border-accent object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
      {user.name?.[0]?.toUpperCase() || "U"}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, ready, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    // sticky floating "pill" navbar
    <header className="sticky top-0 z-50 bg-gradient-to-b from-bg via-bg/90 to-transparent px-3 pb-3 pt-3 sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-line bg-surface/90 px-4 shadow-lg shadow-accent/5 backdrop-blur sm:px-6">
        <Logo />

        {/* desktop links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(link.href) ? "bg-accent text-white shadow-md shadow-accent/30" : "text-ink hover:bg-bg hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {!ready ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-line" />
          ) : user ? (
            <div className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button onClick={() => setDropdown(!dropdown)} aria-label="Open profile menu">
                <Avatar user={user} />
              </button>
              {dropdown && (
                <div className="absolute right-0 top-full w-64 pt-3">
                  <div className="card overflow-hidden p-2 shadow-xl">
                    <div className="border-b border-line px-3 py-3">
                      <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    {menu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-bg hover:text-accent"
                      >
                        <item.icon size={16} /> {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setDropdown(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn-outline">Login</Link>
              <Link href="/register" className="btn-primary !py-2.5">Register</Link>
            </div>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-ink lg:hidden" aria-label="Open menu">
            {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="card mx-auto mt-2 max-w-7xl p-3 shadow-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${isActive(link.href) ? "bg-accent text-white" : "text-ink hover:bg-bg"}`}
              >
                {link.label}
              </Link>
            ))}
            {ready && !user && (
              <div className="mt-2 flex gap-3">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline flex-1">Login</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
