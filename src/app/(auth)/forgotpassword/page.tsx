
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Mail,
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-[385px] bg-white rounded-xl shadow-lg px-7 sm:px-8 py-8">

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-[22px] font-bold tracking-tight">
            <span className="text-green-600">Fresh</span>
            <span className="text-slate-900">Cart</span>
          </h1>

          <div className="flex justify-center mt-6">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <LockKeyhole size={25} className="text-green-600" />
            </div>
          </div>

          <h2 className="mt-5 text-[19px] font-bold text-slate-900">
            Forgot Password?
          </h2>

          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            No worries! Enter your email address and
            we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success Message */}
        {submitted ? (
          <div className="mt-7 text-center">
            <div className="flex justify-center">
              <CheckCircle2
                size={38}
                className="text-green-600"
              />
            </div>

            <h3 className="mt-4 text-[15px] font-bold text-slate-900">
              Check Your Email!
            </h3>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              If an account exists for{" "}
              <span className="font-semibold text-slate-700">
                {email}
              </span>
              , you'll receive instructions to reset your password.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setError("");
              }}
              className="mt-5 text-[11px] font-semibold text-green-600 hover:text-green-700"
            >
              Try another email
            </button>
          </div>
        ) : (

          /* Forgot Password Form */
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
              <label className="block text-[10px] font-medium text-slate-800 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={13}
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
                  placeholder="Enter your registered email"
                  className="w-full h-[38px] pl-9 pr-3 border border-slate-200 rounded-lg text-[11px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition"
                />
              </div>
            </div>

            {/* API Error */}
            {error && (
              <p
                role="alert"
                className="text-[11px] text-red-500 bg-red-50 rounded-lg p-3"
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[38px] rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white text-[11px] font-bold shadow-md transition-all active:scale-[0.99]"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <div className="border-t border-slate-100 mt-7 pt-5">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-600 hover:text-green-600 transition"
          >
            <ArrowLeft size={13} />
            Back to Sign In
          </Link>
        </div>

        {/* Security Footer */}
        <div className="flex justify-center items-center gap-2 mt-6 text-[9px] text-slate-500">
          <ShieldCheck
            size={12}
            className="text-green-600"
          />
          Your information is safe and secure
        </div>

      </div>
    </main>
  );
}
