"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import type { Product } from "@/app/(store)/types/product";
import {
  updateNavbarCounts,
  type NavbarCountsDetail,
} from "@/components/lib/navbar-events";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const API_URL = "https://ecommerce.routemisr.com/api/v1";

  // Check wishlist state from cache and sync on events
  useEffect(() => {
    try {
      const savedIds = JSON.parse(
        localStorage.getItem("wishlistIds") || "[]"
      );
      if (Array.isArray(savedIds) && savedIds.includes(product._id)) {
        setIsInWishlist(true);
      }
    } catch {}

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<NavbarCountsDetail>;
      if (customEvent.detail?.wishlistIds) {
        setIsInWishlist(customEvent.detail.wishlistIds.includes(product._id));
      } else {
        try {
          const savedIds = JSON.parse(
            localStorage.getItem("wishlistIds") || "[]"
          );
          if (Array.isArray(savedIds)) {
            setIsInWishlist(savedIds.includes(product._id));
          }
        } catch {}
      }
    };

    window.addEventListener("updateNavbarCounts", handleUpdate);
    window.addEventListener("auth-change", handleUpdate);

    return () => {
      window.removeEventListener("updateNavbarCounts", handleUpdate);
      window.removeEventListener("auth-change", handleUpdate);
    };
  }, [product._id]);

  // Toggle Wishlist (Add or Remove)
  const handleToggleWishlist = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("userToken");

    if (!token) {
      alert("Please login first to use your wishlist!");
      return;
    }

    setLoadingWishlist(true);
    const willBeFavorite = !isInWishlist;

    try {
      const response = await fetch(
        willBeFavorite
          ? `${API_URL}/wishlist`
          : `${API_URL}/wishlist/${product._id}`,
        {
          method: willBeFavorite ? "POST" : "DELETE",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          ...(willBeFavorite
            ? { body: JSON.stringify({ productId: product._id }) }
            : {}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update wishlist");
      }

      setIsInWishlist(willBeFavorite);

      // Extract updated IDs from API response
      let updatedIds: string[] = [];
      if (Array.isArray(data.data)) {
        updatedIds = data.data
          .map((item: { _id?: string } | string) =>
            typeof item === "string" ? item : item._id || ""
          )
          .filter(Boolean);
      } else {
        try {
          const currentIds: string[] = JSON.parse(
            localStorage.getItem("wishlistIds") || "[]"
          );
          updatedIds = willBeFavorite
            ? [...currentIds, product._id]
            : currentIds.filter((id) => id !== product._id);
        } catch {
          updatedIds = [];
        }
      }

      try {
        localStorage.setItem("wishlistIds", JSON.stringify(updatedIds));
      } catch {}

      updateNavbarCounts({
        wishlist: updatedIds.length,
        wishlistIds: updatedIds,
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoadingWishlist(false);
    }
  };

  // Add to Cart API
  const addToCart = async (productId: string) => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("userToken");

    if (!token) {
      throw new Error("Please login first to add items to your cart!");
    }

    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to cart");
    }

    return data;
  };

  // Cart Button Handler
  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const data = await addToCart(product._id);
      updateNavbarCounts({
        cart:
          typeof data?.numOfCartItems === "number"
            ? data.numOfCartItems
            : undefined,
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}

        {/* Wishlist Button - Highlighted when item is in wishlist */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          disabled={loadingWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          title={isInWishlist ? "In Wishlist (click to remove)" : "Add to Wishlist"}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-200 active:scale-90 ${
            isInWishlist
              ? "bg-red-50 text-red-500 border border-red-200 ring-2 ring-red-200/60 hover:bg-red-100"
              : "bg-white text-gray-400 border border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
          } ${loadingWishlist ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <Heart
            size={19}
            className={`transition-all duration-200 ${
              isInWishlist ? "fill-red-500 text-red-500 scale-110" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="space-y-3 p-4">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.category?.name}
        </p>

        {/* Title */}
        <Link href={`/products/${product._id}`}>
          <h3 className="line-clamp-1 font-semibold text-gray-900 transition hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star size={16} color="#F59E0B" />
          <span className="font-medium">{product.ratingsAverage}</span>
          <span className="text-gray-400">({product.ratingsQuantity})</span>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="font-bold text-gray-900">
                EGP {product.priceAfterDiscount!.toFixed(2)}
              </span>

              <span className="text-sm text-gray-400 line-through">
                EGP {product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900">
              EGP {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={addingToCart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
        >
          <ShoppingCart size={18} />
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
