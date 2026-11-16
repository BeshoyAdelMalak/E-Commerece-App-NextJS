"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  updateNavbarCounts,
  dispatchAuthChange,
  type NavbarCountsDetail,
} from "./lib/navbar-events";

export { updateNavbarCounts, dispatchAuthChange, type NavbarCountsDetail };
import {
  ShoppingCart,
  Search,
  Headset,
  Package,
  Heart,
  UserRound,
  UserRoundPlus,
  Phone,
  Mail,
  Truck,
  Gift,
  ChevronDown,
} from "lucide-react";

function decodeToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
      )
    );
  } catch {
    return null;
  }
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [counts, setCounts] = useState({
    cart: 0,
    wishlist: 0,
    orders: 0,
  });

  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const syncAuthAndCounts = useCallback(async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("userToken");

    if (!token) {
      setIsLoggedIn(false);
      setUsername("");
      setCounts({ cart: 0, wishlist: 0, orders: 0 });
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      setIsLoggedIn(false);
      setUsername("");
      setCounts({ cart: 0, wishlist: 0, orders: 0 });
      return;
    }

    const name =
      decoded.name ||
      decoded.username ||
      decoded.user?.name ||
      "My Account";
    const userId = decoded.id || decoded._id || decoded.userId || null;

    setUsername(name);
    setIsLoggedIn(true);

    try {
      const [cartRes, wishlistRes, ordersRes] = await Promise.all([
        fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          method: "GET",
          headers: { token, "Cache-Control": "no-cache" },
          cache: "no-store",
        }),
        fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
          method: "GET",
          headers: { token, "Cache-Control": "no-cache" },
          cache: "no-store",
        }),
        userId
          ? fetch(
              `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
              { cache: "no-store" }
            )
          : Promise.resolve(null),
      ]);

      let cartCount = 0;
      try {
        const cartData = await cartRes.json();
        if (cartData?.status === "success") {
          cartCount =
            cartData.numOfCartItems ??
            (Array.isArray(cartData.data?.products)
              ? cartData.data.products.length
              : 0);
        }
      } catch {
        cartCount = 0;
      }

      let wishlistCount = 0;
      let wishlistIds: string[] = [];
      try {
        const wishlistData = await wishlistRes.json();
        if (wishlistData?.status === "success") {
          wishlistCount =
            wishlistData.count ??
            (Array.isArray(wishlistData.data)
              ? wishlistData.data.length
              : 0);

          if (Array.isArray(wishlistData.data)) {
            wishlistIds = wishlistData.data.map((item: { _id?: string } | string) =>
              typeof item === "string" ? item : item._id || ""
            ).filter(Boolean);
            try {
              localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));
            } catch {}
          }
        }
      } catch {
        wishlistCount = 0;
      }

      let ordersCount = 0;
      if (ordersRes) {
        try {
          const ordersData = await ordersRes.json();
          ordersCount = Array.isArray(ordersData)
            ? ordersData.length
            : ordersData?.data?.length ?? 0;
        } catch {
          ordersCount = 0;
        }
      }

      setCounts({
        cart: cartCount,
        wishlist: wishlistCount,
        orders: ordersCount,
      });
    } catch (error) {
      console.error("Failed to fetch navbar counts:", error);
    }
  }, []);

  useEffect(() => {
    syncAuthAndCounts();

    const handleUpdateNavbarCounts = (e: Event) => {
      const customEvent = e as CustomEvent<NavbarCountsDetail>;

      if (customEvent.detail) {
        setCounts((prev) => ({
          ...prev,
          ...(typeof customEvent.detail?.cart === "number" && {
            cart: customEvent.detail.cart,
          }),
          ...(typeof customEvent.detail?.wishlist === "number" && {
            wishlist: customEvent.detail.wishlist,
          }),
          ...(typeof customEvent.detail?.orders === "number" && {
            orders: customEvent.detail.orders,
          }),
        }));
      } else {
        syncAuthAndCounts();
      }
    };

    window.addEventListener("auth-change", syncAuthAndCounts);
    window.addEventListener("updateNavbarCounts", handleUpdateNavbarCounts);
    window.addEventListener("storage", syncAuthAndCounts);

    return () => {
      window.removeEventListener("auth-change", syncAuthAndCounts);
      window.removeEventListener("updateNavbarCounts", handleUpdateNavbarCounts);
      window.removeEventListener("storage", syncAuthAndCounts);
    };
  }, [syncAuthAndCounts]);

  // Keep counts fresh when navigating between pages
  useEffect(() => {
    syncAuthAndCounts();
  }, [pathname, syncAuthAndCounts]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("wishlistIds");

    setIsLoggedIn(false);
    setUsername("");
    setCounts({ cart: 0, wishlist: 0, orders: 0 });

    dispatchAuthChange();
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[1550px] items-center justify-between px-6 py-2 text-sm text-gray-600">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-600" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:+18001234567" className="flex items-center gap-2 hover:text-green-600">
              <Phone className="h-4 w-4" />
              +1 (800) 123-4567
            </a>

            <a href="mailto:support@freshcart.com" className="flex items-center gap-2 hover:text-green-600">
              <Mail className="h-4 w-4" />
              support@freshcart.com
            </a>

            <div className="h-5 border-l border-gray-300" />

            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/login" className="flex items-center gap-2 hover:text-green-600">
                  <UserRound className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link href="/signup" className="flex items-center gap-2 hover:text-green-600">
                  <UserRoundPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-800">
                <span>Hello, {username}</span>
                <Link
                  href="/allorders"
                  className="flex items-center gap-1.5 rounded-lg text-red-500 transition hover:text-red-700"
                >
                  <Package className="h-4 w-4" />
                  <span>My Orders</span>
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-100 px-1.5 text-xs font-bold text-red-600">
                    {counts.orders}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="mx-auto flex max-w-[1550px] items-center justify-between gap-8 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <ShoppingCart className="h-9 w-9 text-green-600" />
          <span className="text-[34px] font-bold tracking-tight text-gray-800">
            FreshCart
          </span>
        </Link>

        {/* Search */}
        <div className="flex h-14 w-[415px] items-center rounded-full border border-gray-200 bg-white px-4 shadow-sm">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 whitespace-nowrap text-[18px] text-gray-800">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-green-600">
            Shop
          </Link>

          <div className="group relative">
            <Link
              href="/catagories"
              className="flex items-center gap-1 transition-colors hover:text-green-600"
            >
              Categories
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            <div className="absolute left-0 top-full z-50 hidden w-56 pt-3 group-hover:block">
              <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                <Link
                  href="/catagories"
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  All Categories
                </Link>
                <Link
                  href="/catagories/6439d2d167d9aa4ca970649f"
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Electronics
                </Link>
                <Link
                  href="/catagories/6439d58a0049ad0b52b9003f"
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Womens&apos;s Fashion
                </Link>
                <Link
                  href="/catagories/6439d5b90049ad0b52b90048"
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Men&apos;s Fashion
                </Link>
                <Link
                  href="/catagories/6439d30b67d9aa4ca97064b1"
                  className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Beauty &amp; Health
                </Link>
              </div>
            </div>
          </div>

          <Link href="/brands" className="hover:text-green-600">
            Brands
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-5">
          {/* Support */}
          <div className="flex items-center gap-3">
            <Link
              href="/contactus"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 transition hover:bg-green-100"
            >
              <Headset className="h-5 w-5 text-green-600" />
            </Link>
            <div className="leading-5">
              <p className="text-sm text-gray-500">Support</p>
              <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
            </div>
          </div>

          <div className="h-12 border-l border-gray-200" />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex items-center justify-center text-gray-600 transition hover:text-green-600"
            aria-label="Wishlist"
          >
            <Heart className="h-7 w-7" />
            <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white shadow-sm leading-none">
              {counts.wishlist}
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center text-gray-600 transition hover:text-green-600"
            aria-label="Cart"
          >
            <ShoppingCart className="h-7 w-7" />
            <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white shadow-sm leading-none">
              {counts.cart}
            </span>
          </Link>

          {/* Sign In / Logout */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 font-semibold text-white shadow-md hover:bg-green-700"
            >
              <UserRound className="h-4 w-4" /> Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-800">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}