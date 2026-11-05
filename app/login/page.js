"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthShell from "@/components/AuthShell";
import GoogleButton from "@/components/GoogleButton";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    const { error: loginError } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (loginError) {
      const message = "Invalid email or password. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back to StudioSpace!");
    router.push(redirect);
  }

  return (
    <AuthShell title="Login to your account" subtitle="Enter your details to continue.">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input id="password" name="password" type={showPass ? "text" : "password"} placeholder="Your password" className="input pr-12" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Show or hide password">
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Password reset is coming soon.")}
            className="mt-2 text-sm font-medium text-accent hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500">{error}</p>}

        <button className="btn-primary w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleButton redirect={redirect} />

      <p className="mt-6 text-center text-sm text-muted">
        New to StudioSpace?{" "}
        <Link href="/register" className="font-semibold text-accent hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
