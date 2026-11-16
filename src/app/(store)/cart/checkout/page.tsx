"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateNavbarCounts } from "@/components/lib/navbar-events";
import {
  ArrowLeft,
  ReceiptText,
  Home,
  LockKeyhole,
  Info,
  Building2,
  MapPin,
  Phone,
  CreditCard,
  Check,
  Truck,
  ShieldCheck,
  Banknote,
  ShoppingBag,
  Loader2,
} from "lucide-react";

interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

export default function CheckoutPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [cartId, setCartId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    city: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    city: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const token =
          localStorage.getItem("token") || localStorage.getItem("userToken");

        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          method: "GET",
          headers: {
            token: token,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          setProducts(data.data.products);
          setSubtotal(data.data.totalCartPrice);
          setCartId(data.data._id);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePlaceOrder = async () => {
    const newErrors = {
      city: formData.city.trim() ? "" : "City is required",
      address: formData.address.trim() ? "" : "Street address is required",
      phone: /^01[0-9]{9}$/.test(formData.phone)
        ? ""
        : "Enter a valid Egyptian phone number",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    const token =
      localStorage.getItem("token") || localStorage.getItem("userToken");

    if (!token || !cartId) {
      alert("Missing session or cart. Please refresh and try again.");
      return;
    }

    const shippingPayload = {
      shippingAddress: {
        details: formData.address,
        phone: formData.phone,
        city: formData.city,
      },
    };

    setIsSubmitting(true);

    try {
      if (paymentMethod === "cod") {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify(shippingPayload),
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          setProducts([]);
          setSubtotal(0);
          updateNavbarCounts({ cart: 0 });
          router.push("/allorders");
        } else {
          alert(data.message || "Failed to place order. Please try again.");
        }
      } else if (paymentMethod === "online") {
        const baseUrl = window.location.origin;

        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify(shippingPayload),
          }
        );

        const data = await res.json();

        if (data.status === "success" && data.session?.url) {
          window.location.href = data.session.url;
        } else {
          alert(data.message || "Failed to initiate Stripe checkout.");
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Something went wrong while placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafbfc] text-gray-800">
      <div className="mx-auto max-w-[950px] px-4 pb-10 pt-1">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[10px] text-gray-500">
          <span>Home</span>
          <span>/</span>
          <span>Cart</span>
          <span>/</span>
          <span className="text-gray-900">Checkout</span>
        </div>

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#159c48] text-white shadow-md">
                <ReceiptText size={19} />
              </div>

              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                Complete Your Order
              </h1>
            </div>

            <p className="mt-1 text-[11px] text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-1 text-[11px] font-medium text-[#0ca34a] hover:text-green-700"
          >
            <ArrowLeft size={13} />
            Back to Cart
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[2fr_0.97fr]">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Shipping Address */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#16a34a] to-[#137d3b] px-4 py-3 text-white">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Home size={14} fill="white" />
                  Shipping Address
                </div>

                <p className="mt-1 text-[9px]">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="space-y-3.5 p-4">
                {/* Information */}
                <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Info size={12} />
                  </div>

                  <div>
                    <p className="text-[9px] font-medium text-blue-700">
                      Delivery Information
                    </p>
                    <p className="mt-0.5 text-[8px] text-blue-600">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    City <span className="text-red-500">*</span>
                  </label>

                  <div className="flex h-[35px] items-center gap-2 rounded-lg border border-gray-200 px-2.5 focus-within:border-green-500">
                    <Building2 size={14} className="text-gray-500" />

                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className="h-full w-full bg-transparent text-[10px] outline-none placeholder:text-gray-400"
                    />
                  </div>

                  {errors.city && (
                    <p className="mt-1 text-[9px] text-red-500">{errors.city}</p>
                  )}
                </div>

                {/* Street Address */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <div className="flex min-h-[65px] items-start gap-2 rounded-lg border border-gray-200 px-2.5 py-2 focus-within:border-green-500">
                    <MapPin size={14} className="mt-1 text-gray-500" />

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street name, building number, floor, apartment..."
                      className="min-h-[48px] w-full resize-none bg-transparent text-[10px] outline-none placeholder:text-gray-400"
                    />
                  </div>

                  {errors.address && (
                    <p className="mt-1 text-[9px] text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex h-[35px] items-center gap-2 rounded-lg border border-gray-200 px-2.5 focus-within:border-green-500">
                    <Phone size={14} className="text-gray-500" />

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      type="tel"
                      maxLength={11}
                      className="h-full w-full bg-transparent text-[10px] outline-none placeholder:text-gray-400"
                    />

                    <span className="whitespace-nowrap text-[8px] text-gray-400">
                      Egyptian numbers only
                    </span>
                  </div>

                  {errors.phone && (
                    <p className="mt-1 text-[9px] text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#16a34a] to-[#137d3b] px-4 py-3 text-white">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <CreditCard size={14} />
                  Payment Method
                </div>
                <p className="mt-1 text-[9px]">Choose how you&apos;d like to pay</p>
              </div>

              <div className="space-y-2.5 p-4">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-2.5 rounded-lg border p-3 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div
                    className={`flex h-[35px] w-[35px] items-center justify-center rounded-lg ${
                      paymentMethod === "cod"
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Banknote size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-bold">Cash on Delivery</p>
                    <p className="mt-0.5 text-[9px] text-gray-500">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>

                  <div
                    className={`flex h-[17px] w-[17px] items-center justify-center rounded-full ${
                      paymentMethod === "cod"
                        ? "bg-green-600 text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && <Check size={11} />}
                  </div>
                </button>

                {/* Pay Online */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`flex w-full items-center gap-2.5 rounded-lg border p-3 text-left transition ${
                    paymentMethod === "online"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div
                    className={`flex h-[35px] w-[35px] items-center justify-center rounded-lg ${
                      paymentMethod === "online"
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <CreditCard size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-bold">Pay Online</p>
                    <p className="mt-0.5 text-[9px] text-gray-500">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="rounded-sm bg-blue-700 px-1 text-[7px] font-bold text-white">
                        VISA
                      </span>
                      <span className="text-[10px] font-bold text-red-500">
                        ●
                      </span>
                      <span className="rounded-sm bg-blue-600 px-1 text-[7px] font-bold text-white">
                        AMEX
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex h-[17px] w-[17px] items-center justify-center rounded-full ${
                      paymentMethod === "online"
                        ? "bg-green-600 text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {paymentMethod === "online" && <Check size={11} />}
                  </div>
                </button>

                {/* Security */}
                <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-medium text-green-800">
                      Secure & Encrypted
                    </p>
                    <p className="mt-0.5 text-[8px] text-green-600">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:sticky md:top-5">
            <div className="bg-gradient-to-r from-[#16a34a] to-[#137d3b] px-4 py-3 text-white">
              <div className="flex items-center gap-2 text-xs font-bold">
                <LockKeyhole size={13} />
                Order Summary
              </div>
              <p className="mt-1 text-[9px]">{products.length} items</p>
            </div>

            <div className="p-3">
              {/* Products */}
              <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
                {isLoading ? (
                  <div className="flex items-center justify-center py-6 text-green-600">
                    <Loader2 size={20} className="animate-spin" />
                  </div>
                ) : products.length === 0 ? (
                  <p className="py-6 text-center text-[10px] text-gray-500">
                    Your cart is empty.
                  </p>
                ) : (
                  products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-2 rounded-lg bg-gray-50 p-2"
                    >
                      <div className="flex h-[43px] w-[35px] shrink-0 items-center justify-center rounded-md border border-gray-100 bg-white">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="h-full w-full rounded-md object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9px] font-medium text-gray-800">
                          {item.product.title}
                        </p>
                        <p className="mt-0.5 text-[8px] text-gray-500">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>

                      <span className="text-[9px] font-bold">
                        {item.price * item.count}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Price */}
              <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{subtotal} EGP</span>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Truck size={12} /> Shipping
                  </span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-[11px] font-bold">Total</span>
                  <span className="text-sm font-extrabold text-green-600">
                    {subtotal}
                    <span className="ml-1 text-[9px] font-normal text-gray-500">
                      EGP
                    </span>
                  </span>
                </div>
              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || isSubmitting || products.length === 0}
                className="mt-4 flex h-[36px] w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-[10px] font-bold text-white shadow-md transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={12} />
                    {paymentMethod === "online"
                      ? "Proceed to Payment"
                      : "Place Order"}
                  </>
                )}
              </button>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-center gap-2 border-t border-gray-100 pt-2.5">
                <div className="flex items-center gap-1 text-[8px] text-gray-500">
                  <ShieldCheck size={10} className="text-green-500" />
                  Secure
                </div>

                <div className="h-3 border-l border-gray-200" />

                <div className="flex items-center gap-1 text-[8px] text-gray-500">
                  <Truck size={10} className="text-blue-500" />
                  Fast Delivery
                </div>

                <div className="h-3 border-l border-gray-200" />

                <div className="flex items-center gap-1 text-[8px] text-gray-500">
                  <ShoppingBag size={10} className="text-orange-500" />
                  Easy Returns
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}