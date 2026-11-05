"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthShell from "@/components/AuthShell";
import GoogleButton from "@/components/GoogleButton";
import { authClient } from "@/lib/auth-client";

// password rules: uppercase + lowercase + at least 6 characters
function checkPassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const image = form.photo.value.trim();
    const password = form.password.value;

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    const problem = checkPassword(password);
    setPassError(problem);
    if (problem) {
      toast.error(problem);
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
    });
    setLoading(false);

    if (signUpError) {
      const message = signUpError.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Account created! Please login to continue.");
    router.push("/login");
  }

  return (
    <AuthShell title="Create your account" subtitle="Join StudioSpace as a creator or a host.">
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your full name" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="photo">Photo URL</label>
          <input id="photo" name="photo" type="url" placeholder="https://example.com/photo.jpg" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Min 6 characters"
              className="input pr-12"
              onChange={(e) => setPassError(e.target.value ? checkPassword(e.target.value) : "")}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Show or hide password">
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {passError ? (
            <p className="mt-2 text-sm font-medium text-red-500">{passError}</p>
          ) : (
            <p className="mt-2 text-xs text-muted">Use an uppercase letter, a lowercase letter and at least 6 characters.</p>
          )}
        </div>

        {error && <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500">{error}</p>}

        <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account..." : "Register"}</button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleButton redirect="/" />

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent hover:underline">Login</Link>
      </p>
    </AuthShell>
  );
}
