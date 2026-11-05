"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/components/Providers";
import PageLoader from "@/components/PageLoader";

// Waits for the session check, so reloading a private page keeps the user logged in
export default function PrivateRoute({ children }) {
  const { user, ready, loggingOut } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !user && !loggingOut.current) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, pathname, router, loggingOut]);

  if (!ready || !user) return <PageLoader text="Checking your account..." />;
  return children;
}
