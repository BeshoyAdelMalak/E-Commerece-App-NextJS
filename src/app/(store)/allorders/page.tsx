"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  CheckCircle2,
  Clock,
  Truck,
  ShoppingBag,
  ArrowLeft,
  Calendar,
  Loader2,
  ReceiptText,
} from "lucide-react";

interface OrderItem {
  count: number;
  _id: string;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category?: {
      name: string;
    };
  };
}

interface Order {
  _id: string;
  id: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  shippingAddress?: {
    details: string;
    phone: string;
    city: string;
  };
  cartItems: OrderItem[];
}

// Helper to extract the logged-in user's ID from their JWT token
function getUserIdFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.id || null;
  } catch {
    return null;
  }
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUserOrders() {
      const token =
        localStorage.getItem("token") || localStorage.getItem("userToken");

      // 1. Auth guard: redirect to login if not logged in
      if (!token) {
        router.replace("/login");
        return;
      }

      const userId = getUserIdFromToken(token);
      if (!userId) {
        router.replace("/login");
        return;
      }

      try {
        // 2. Fetch logged-in user's orders
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
            method: "GET",
            headers: {
              token: token,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to load your orders.");
        }

        const data: Order[] = await res.json();

        // Sort newest orders first
        const sortedOrders = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not load your orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserOrders();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#fafbfc] text-gray-800">
      <div className="mx-auto max-w-[950px] px-4 pb-12 pt-4">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[10px] text-gray-500">
          <Link href="/" className="hover:text-gray-800">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-[32px] w-[32px] items-center justify-center rounded-lg bg-[#159c48] text-white shadow-md">
                <Package size={18} />
              </div>

              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                My Orders
              </h1>
            </div>

            <p className="mt-1 text-[11px] text-gray-500">
              Track and review your past purchases
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1 text-[11px] font-medium text-[#0ca34a] hover:text-green-700"
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 shadow-sm">
            <Loader2 size={28} className="animate-spin text-[#16a34a]" />
            <p className="mt-2 text-xs text-gray-500">Loading your orders...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-xs font-semibold text-red-700">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#16a34a]">
              <ShoppingBag size={22} />
            </div>
            <h2 className="mt-3 text-sm font-bold text-gray-900">
              No orders yet
            </h2>
            <p className="mt-1 max-w-xs text-[11px] text-gray-500">
              Looks like you haven&apos;t placed any orders yet. Start exploring
              our products!
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#16a34a] px-4 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <section
                key={order._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Order Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-400">
                        Order ID
                      </p>
                      <p className="flex items-center gap-1 text-xs font-bold text-gray-900">
                        <ReceiptText size={13} className="text-[#16a34a]" />#
                        {order.id}
                      </p>
                    </div>

                    <div className="h-6 border-l border-gray-200" />

                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-400">
                        Date Placed
                      </p>
                      <p className="flex items-center gap-1 text-[11px] font-medium text-gray-700">
                        <Calendar size={12} className="text-gray-400" />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="h-6 border-l border-gray-200" />

                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-400">
                        Payment
                      </p>
                      <p className="flex items-center gap-1 text-[11px] font-medium capitalize text-gray-700">
                        {order.paymentMethodType === "card" ? (
                          <CreditCard size={12} className="text-blue-600" />
                        ) : (
                          <Banknote size={12} className="text-green-600" />
                        )}
                        {order.paymentMethodType === "card"
                          ? "Online Card"
                          : "Cash on Delivery"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        order.isPaid
                          ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                          : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
                      }`}
                    >
                      {order.isPaid ? (
                        <>
                          <CheckCircle2 size={11} /> Paid
                        </>
                      ) : (
                        <>
                          <Clock size={11} /> Unpaid
                        </>
                      )}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        order.isDelivered
                          ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"
                          : "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20"
                      }`}
                    >
                      <Truck size={11} />
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-100 px-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="flex h-12 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-1">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-gray-900">
                          {item.product.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-gray-500">
                          Qty: {item.count} × {item.price} EGP
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">
                          {item.price * item.count} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer (Shipping Address & Total) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-[#fafbfc] px-4 py-3">
                  {order.shippingAddress ? (
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-[#16a34a]" />
                        {order.shippingAddress.city} —{" "}
                        {order.shippingAddress.details}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={11} className="text-gray-400" />
                        {order.shippingAddress.phone}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400">
                      Standard Delivery
                    </span>
                  )}

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-gray-500">
                      Total Paid:
                    </span>
                    <span className="text-sm font-extrabold text-[#16a34a]">
                      {order.totalOrderPrice}{" "}
                      <span className="text-[10px] font-normal text-gray-500">
                        EGP
                      </span>
                    </span>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}