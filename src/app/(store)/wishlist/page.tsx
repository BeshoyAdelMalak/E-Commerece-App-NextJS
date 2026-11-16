
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { updateNavbarCounts } from "@/components/lib/navbar-events";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  description?: string;
  quantity?: number;
}

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  // Get Token
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login first to access your wishlist.");
    }

    return token;
  };

  // Get Wishlist
 
const getWishlist = async () => {
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login first to access your wishlist.");
    }

    const response = await fetch(`${API_URL}/wishlist`, {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store",
    });

    const result = await response.json();

    console.log("Wishlist API response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to load wishlist.");
    }

    // Handle different possible response structures
    const products = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.data?.data)
      ? result.data.data
      : Array.isArray(result.data?.products)
      ? result.data.products
      : [];

    setWishlist(products);

  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};


  // Remove Product From Wishlist
  const removeProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to remove this product?")) {
      return;
    }

    setRemovingId(productId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to remove product.");
      }

      setWishlist((prev) => {
        const updated = prev.filter((product) => product._id !== productId);
        updateNavbarCounts({ wishlist: updated.length });
        return updated;
      });

      setSuccess("Product removed from your wishlist.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Remove failed."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Add Product To Wishlist
  const addToWishlist = async (productId: string) => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          token: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product.");
      }

      await getWishlist();
      updateNavbarCounts({
        wishlist: Array.isArray(result.data) ? result.data.length : undefined,
      });
      setSuccess("Product added to your wishlist.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  // Add Product To Cart
  
const addToCart = async (productId: string) => {
  setAddingId(productId);
  setError("");
  setSuccess("");

  try {
    const token = getToken();

    // 1. Add product to Cart
    const cartResponse = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    const cartResult = await cartResponse.json();

    if (!cartResponse.ok) {
      throw new Error(
        cartResult.message || "Failed to add product to cart."
      );
    }

    // 2. Remove product from Wishlist
    const wishlistResponse = await fetch(
      `${API_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    const wishlistResult = await wishlistResponse.json();

    if (!wishlistResponse.ok) {
      throw new Error(
        "Product added to cart, but could not be removed from wishlist: " +
        (wishlistResult.message || "Please try again.")
      );
    }

    // 3. Update Wishlist UI immediately
    setWishlist((prev) => {
      const updated = prev.filter((product) => product._id !== productId);
      // 4. Update both cart and wishlist counts in navbar
      updateNavbarCounts({
        cart:
          typeof cartResult.numOfCartItems === "number"
            ? cartResult.numOfCartItems
            : undefined,
        wishlist: updated.length,
      });
      return updated;
    });

    // 5. Success message
    setSuccess("Product added to cart and removed from wishlist!");

  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong."
    );
  } finally {
    setAddingId(null);
  }
};


  // Format Price
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(price);

  useEffect(() => {
    getWishlist();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />

        <p className="text-sm text-gray-500">
          Loading your wishlist...
        </p>
      </div>
    );
  }

  // Error State
  if (error && wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-5">
        <Heart size={55} className="text-gray-300" />

        <p className="text-red-500 text-sm text-center">
          {error}
        </p>

        <button
          onClick={getWishlist}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty Wishlist
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
        <Heart size={70} className="text-gray-300 mb-5" />

        <h2 className="text-2xl font-bold text-gray-800">
          Your Wishlist is Empty
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-sm">
          Save your favorite products here and come back to them whenever
          you want!
        </p>

        <Link
          href="/home"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-lg text-sm font-semibold transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>
            <div className="flex items-center gap-3">
              <Heart className="text-green-600" size={30} />

              <h1 className="text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              You have {wishlist.length} saved products.
            </p>
          </div>

          <button
            onClick={getWishlist}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-lg text-sm font-semibold transition"
          >
            <RefreshCw size={16} />
            Refresh Wishlist
          </button>

        </div>

        {/* Success Message */}
        {success && (
          <div
            role="status"
            className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-4"
          >
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-4"
          >
            {error}
          </div>
        )}

        {/* Wishlist Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">

              {/* Table Header */}
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Product
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Product ID
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Price
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Availability
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">

                {wishlist.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Product Image and Name */}
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-4">

                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>

                        <span className="text-sm font-semibold text-gray-800 max-w-[180px]">
                          {product.title}
                        </span>

                      </div>
                    </td>

                    {/* Product ID */}
                    <td className="py-5 px-5">
                      <span className="text-xs text-gray-500 font-mono">
                        {product._id}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-5">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    </td>

                    {/* Availability */}
                    <td className="py-5 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          (product.quantity ?? 0) > 0
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />

                        {(product.quantity ?? 0) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-3">

                        {/* Add To Cart */}
                        <button
                          onClick={() => addToCart(product._id)}
                          disabled={
                            addingId === product._id ||
                            removingId === product._id ||
                            (product.quantity ?? 0) <= 0
                          }
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingId === product._id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <ShoppingCart size={14} />
                          )}

                          {addingId === product._id
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>

                        {/* Remove From Wishlist */}
                        <button
                          onClick={() => removeProduct(product._id)}
                          disabled={
                            removingId === product._id ||
                            addingId === product._id
                          }
                          title="Remove from wishlist"
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                        >
                          {removingId === product._id ? (
                            <RefreshCw size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Wishlist Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Saved Products
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Your favorite products, all in one place.
                </p>
              </div>

              <Link
                href="/products"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
