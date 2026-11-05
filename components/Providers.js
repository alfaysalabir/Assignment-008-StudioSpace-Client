"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function Providers({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;

  // ----- theme (Challenge 3) -----
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("studio-theme", next);
  }

  // ----- JWT cookie sync (Challenge 1) -----
  // "ready" = session is checked AND the JWT cookie is created for this user.
  // Private routes wait for "ready", so a reload never sends a logged-in user to Login.
  const [jwtFor, setJwtFor] = useState(null);
  const ready = !isPending && (!user || jwtFor === user.email);
  const loggingOut = useRef(false);

  useEffect(() => {
    if (isPending) return;
    if (user && jwtFor !== user.email) {
      fetch("/api/jwt")
        .then(() => setJwtFor(user.email))
        .catch(() => setJwtFor(user.email));
    }
    if (!user && jwtFor) {
      fetch("/api/jwt", { method: "DELETE" }).finally(() => setJwtFor(null));
    }
  }, [user, isPending, jwtFor]);

  // ----- wishlist (optional feature) -----
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    if (!ready) return;
    if (!user) {
      setWishlist([]);
      return;
    }
    api("/wishlist").then(setWishlist).catch(() => setWishlist([]));
  }, [ready, user]);

  async function toggleWishlist(studioId) {
    if (!user) {
      toast.error("Please login to save studios");
      router.push("/login");
      return;
    }
    try {
      const data = await api(`/wishlist/${studioId}`, { method: "POST" });
      setWishlist((old) => (data.saved ? [...old, studioId] : old.filter((id) => id !== studioId)));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function logout() {
    loggingOut.current = true;
    router.push("/");
    await authClient.signOut();
    await fetch("/api/jwt", { method: "DELETE" });
    toast.success("You have logged out. See you soon!");
    setTimeout(() => (loggingOut.current = false), 1500);
  }

  const value = { user, ready, theme, toggleTheme, wishlist, toggleWishlist, logout, loggingOut };

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toaster position="top-right" richColors closeButton theme={theme} />
    </AppContext.Provider>
  );
}
