
"use client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ShieldCheck,
  Headset,
  Shield,
  Users,
  Star,
} from "lucide-react";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dispatchAuthChange } from "@/components/lib/navbar-events";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Save authentication token
      localStorage.setItem("token", data.token);

      // Save user information if returned by API
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Notify navbar to refresh counts
      dispatchAuthChange();

      // Redirect after successful login
      router.push("/");
      router.refresh();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-[1120px] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Section */}
        <section className="flex flex-col items-center text-center">
          <div className="w-full max-w-[385px] h-[240px] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
              alt="Fresh vegetables and fruits in a shopping cart"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="mt-3 text-[20px] leading-[23px] font-bold text-slate-900">
            FreshCart - Your One-Stop Shop for Fresh
            <br className="hidden sm:block" /> Products
          </h1>

          <p className="mt-3 max-w-[390px] text-[12px] leading-5 text-slate-600">
            Join thousands of happy customers who trust FreshCart
            for their daily grocery needs
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Truck size={12} className="text-green-600" />
              Free Delivery
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-green-600" />
              Secure Payment
            </div>

            <div className="flex items-center gap-1.5">
              <Headset size={12} className="text-green-600" />
              24/7 Support
            </div>
          </div>
        </section>

        {/* Right Section - Login Card */}
        <section className="w-full max-w-[385px] mx-auto bg-white rounded-xl shadow-lg px-7 sm:px-8 py-7">

          {/* Logo */}
          <div className="text-center">
            <h2 className="text-[20px] font-bold tracking-tight">
              <span className="text-green-600">Fresh</span>
              <span className="text-slate-900">Cart</span>
            </h2>

            <h3 className="mt-2 text-[16px] font-bold text-slate-900">
              Welcome Back!
            </h3>

            <p className="mt-1 text-[10px] text-slate-500">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-5 space-y-2">
            <button
              type="button"
              className="w-full h-[33px] flex items-center justify-center gap-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 hover:bg-slate-50 transition"
            >
              <span className="text-red-500 font-bold text-sm">G</span>
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full h-[33px] flex items-center justify-center gap-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 hover:bg-slate-50 transition"
            >
              <span className="flex items-center justify-center w-3 h-3 rounded-full bg-blue-600 text-white text-[9px] font-bold">
                f
              </span>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-slate-200" />

            <span className="text-[9px] text-slate-500 whitespace-nowrap">
              OR CONTINUE WITH EMAIL
            </span>

            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Email */}
            <div>
              <label className="block text-[10px] font-medium text-slate-800 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  className="w-full h-[33px] pl-8 pr-3 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-medium text-slate-800">
                  Password
                </label>

                <Link
                  href="/forgotpassword"
                  className="text-[9px] text-green-600 hover:text-green-700"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full h-[33px] pl-8 pr-9 border border-slate-200 rounded-lg text-[10px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-[11px] h-[11px] accent-green-600 cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-[9px] text-slate-600 cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            {/* API Error */}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-600 text-[10px] rounded-lg p-3"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[33px] rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white text-[11px] font-bold shadow-md transition-all duration-200 active:scale-[0.99]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Register */}
          <div className="border-t border-slate-100 mt-5 pt-4 text-center">
            <p className="text-[10px] text-slate-600">
              New to FreshCart?{" "}
              <Link
                href="/signup"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Create an account
              </Link>
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center flex-wrap gap-3 mt-4 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <Shield size={10} />
                SSL Secured
              </span>

              <span className="flex items-center gap-1">
                <Users size={10} />
                50K+ Users
              </span>

              <span className="flex items-center gap-1">
                <Star size={10} className="fill-slate-500" />
                4.9 Rating
              </span>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
