"use client";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ redirect = "/" }) {
  async function handleGoogle() {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-line bg-surface py-3 text-sm font-semibold text-ink transition hover:border-accent"
    >
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
}
