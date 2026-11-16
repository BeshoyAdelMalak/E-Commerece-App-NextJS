
"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  Star,
  Truck,
  ShieldCheck,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // Password Strength
  const getPasswordStrength = () => {
    let score = 0;
    const password = form.password;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength();

  // Signup API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate Password
    if (form.password !== form.rePassword) {
      setError("Passwords do not match!");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Validate Terms
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            rePassword: form.rePassword,
            phone: form.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Your account has been created successfully!");

      // Redirect to login after successful signup
      setTimeout(() => {
        router.push("/login");
      }, 1500);

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

  const inputClass =
    "w-full h-[42px] rounded-md border border-gray-300 px-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <main className="min-h-screen bg-white px-5 py-8 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1170px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

        {/* LEFT SIDE */}
        <section className="pt-2">

          <h1 className="text-3xl font-bold tracking-tight text-[#243b5a]">
            Welcome to{" "}
            <span className="text-green-600">FreshCart</span>
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#243b5a]">
            Join thousands of happy customers who enjoy fresh
            groceries delivered right to their doorstep.
          </p>

          {/* FEATURES */}
          <div className="mt-6 space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Star size={19} fill="currentColor" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#243b5a]">
                  Premium Quality
                </h3>
                <p className="text-xs text-gray-600">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Truck size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#243b5a]">
                  Fast Delivery
                </h3>
                <p className="text-xs text-gray-600">
                  Same-day delivery available in most areas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#243b5a]">
                  Secure Shopping
                </h3>
                <p className="text-xs text-gray-600">
                  Your data and payments are completely secure.
                </p>
              </div>
            </div>

          </div>

          {/* TESTIMONIAL */}
          <div className="mt-8 max-w-[470px] rounded-lg border border-gray-200 p-4 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">
                👩🏻
              </div>

              <div>
                <p className="text-xs font-medium text-[#243b5a]">
                  Sarah Johnson
                </p>

                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs italic leading-[1.6] text-[#34445b]">
              "FreshCart has transformed my shopping experience.
              The quality of the products is outstanding, and the
              delivery is always on time. Highly recommend!"
            </p>

          </div>
        </section>

        {/* RIGHT SIDE - SIGNUP CARD */}
        <section className="w-full rounded-xl bg-white px-6 py-7 shadow-[0_4px_12px_rgba(0,0,0,0.10)] sm:px-8 sm:py-8">

          {/* HEADER */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#243b5a]">
              Create Your Account
            </h2>

            <p className="mt-2 text-xs text-[#34445b]">
              Start your fresh journey with us today
            </p>
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 text-xs font-medium text-gray-800 transition hover:bg-gray-50"
            >
              <span className="font-bold text-red-500">G</span>
              Google
            </button>

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 text-xs font-medium text-gray-800 transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-600">f</span>
              Facebook
            </button>

          </div>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#243b5a]">
                Name<span className="text-red-500">*</span>
              </label>

              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Ali"
                className={inputClass}
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#243b5a]">
                Email<span className="text-red-500">*</span>
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ali@example.com"
                className={inputClass}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#243b5a]">
                Password<span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`${inputClass} pr-10`}
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {/* STRENGTH INDICATOR */}
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full ${
                      strength >= level
                        ? strength <= 1
                          ? "bg-red-400"
                          : strength <= 2
                          ? "bg-yellow-400"
                          : "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-1 flex justify-between gap-2 text-[10px] text-gray-500">
                <span>
                  Must be at least 8 characters with numbers and symbols
                </span>

                <span className="shrink-0">
                  {strength > 0
                    ? ["Weak", "Fair", "Good", "Strong"][strength - 1]
                    : "Weak"}
                </span>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#243b5a]">
                Confirm Password<span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  name="rePassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.rePassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`${inputClass} pr-10`}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#243b5a]">
                Phone Number<span className="text-red-500">*</span>
              </label>

              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className={inputClass}
                required
              />
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-green-600"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-5 text-[#243b5a]"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
                <span className="text-red-500"> *</span>
              </label>
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-600"
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div
                role="status"
                className="rounded-md border border-green-200 bg-green-50 p-3 text-xs text-green-700"
              >
                {success}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-green-600 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Users size={15} />
              {loading ? "Creating Account..." : "Create My Account"}
            </button>

          </form>

          {/* SIGN IN */}
          <div className="mt-5 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-[#34445b]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-green-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}
