
"use client";

import Link  from "next/link" 
import { useEffect, useState } from "react";
import Image from "next/image";
import { updateNavbarCounts } from "@/components/lib/navbar-events";
import {
  ShoppingCart,
  Trash2,
  RefreshCw,
  Plus,
  Minus,
  X,
  ShoppingBasket,
} from "lucide-react";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

interface CartData {
  _id: string;
  products: CartItem[];
  totalCartPrice: number;
}

const API_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(price);

  // Get Token
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login first to access your cart.");
    }

    return token;
  };

  // Get Cart
  const getCart = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          token: getToken(),
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load cart.");
      }

      setCart(result.data);
      updateNavbarCounts({
        cart:
          typeof result.numOfCartItems === "number"
            ? result.numOfCartItems
            : result.data?.products?.length ?? 0,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (
    productId: string,
    newCount: number
  ) => {
    if (newCount < 1) return;

    setUpdatingId(productId);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: {
          token: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: newCount,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update quantity.");
      }

      if (typeof result.numOfCartItems === "number") {
        updateNavbarCounts({ cart: result.numOfCartItems });
      }

      await getCart();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Update failed."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Remove Product
  const removeProduct = async (productId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmed) return;

    setRemovingId(productId);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: {
          token: getToken(),
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not remove product.");
      }

      if (typeof result.numOfCartItems === "number") {
        updateNavbarCounts({ cart: result.numOfCartItems });
      }

      await getCart();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Remove failed."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Clear Entire Cart
  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your entire cart?")) {
      return;
    }

    setClearing(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          token: getToken(),
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not clear cart.");
      }

      updateNavbarCounts({ cart: 0 });

      await getCart();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Clear cart failed."
      );
    } finally {
      setClearing(false);
    }
  };

  // Calculate Total
  const totalPrice =
    cart?.products?.reduce(
      (total, item) => total + item.price * item.count,
      0
    ) ?? 0;

  useEffect(() => {
    getCart();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />
        <p className="text-sm text-gray-500">
          Loading your cart...
        </p>
      </div>
    );
  }

  // Error
  if (error && !cart) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-red-500 text-sm text-center">{error}</p>

        <button
          onClick={getCart}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty Cart
  if (!cart?.products?.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
        <ShoppingCart size={65} className="text-gray-300 mb-5" />

        <h2 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Looks like you haven't added anything to your cart yet.
        </p>

        <a
          href="/home"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-lg text-sm font-semibold"
        >
          Continue Shopping
        </a>
      </div>
    );
  }
   
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              You have {cart.products.length} products in your cart.
            </p>
          </div>

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            disabled={clearing}
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-lg text-sm font-semibold transition disabled:opacity-50"
          >
            <Trash2 size={16} />
            {clearing ? "Clearing..." : "Clear Cart"}
          </button>
        </div>

        {/* Action Error */}
        {error && (
          <div
            role="alert"
            className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-4"
          >
            {error}
          </div>
        )}

        {/* Cart Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">

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
                    Quantity
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Subtotal
                  </th>

                  <th className="py-4 px-5 text-xs font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {cart.products.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Product */}
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-4">

                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>

                        <span className="text-sm font-semibold text-gray-800 max-w-[180px]">
                          {item.product.title}
                        </span>
                      </div>
                    </td>

                    {/* Product ID */}
                    <td className="py-5 px-5">
                      <span className="text-xs text-gray-500 font-mono">
                        {item.product._id}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-5">
                      <span className="text-sm text-gray-700">
                        {formatPrice(item.price)}
                      </span>
                    </td>

                    {/* Quantity Controls */}
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.count - 1)
                          }
                          disabled={
                            item.count <= 1 ||
                            updatingId === item.product._id
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-7 text-center text-sm font-semibold text-gray-800">
                          {updatingId === item.product._id
                            ? "..."
                            : item.count}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.count + 1)
                          }
                          disabled={updatingId === item.product._id}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>

                      </div>
                    </td>

                    {/* Subtotal */}
                    <td className="py-5 px-5">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(item.price * item.count)}
                      </span>
                    </td>

                    {/* Remove */}
                    <td className="py-5 px-5">
                      <button
                        onClick={() => removeProduct(item.product._id)}
                        disabled={removingId === item.product._id}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 disabled:opacity-50 text-xs font-semibold transition"
                      >
                        {removingId === item.product._id ? (
                          <RefreshCw size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}

                        Remove
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  Total ({cart.products.length} products)
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">
                  Total Amount
                </p>

                <h2 className="text-2xl font-bold text-green-600">
                  {formatPrice(totalPrice)}
                </h2>
              </div>

            </div>
          </div>
        </div>

        {/* Refresh */}
        <div className="flex justify-end mt-5 p-5">
          <button
            onClick={getCart}
            disabled={loading}
            className="flex items-center p-2 gap-3 text-sm text-green-600 hover:cursor-pointer hover:text-green-800 font-semibold transition disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh Cart
          </button>
          <button className="flex items-center p-2 gap-3 text-sm text-green-600 hover:cursor-pointer hover:text-green-800 font-semibold transition disabled:opacity-50">
            <Link href='/products' className="flex items-center gap-1">
            <ShoppingCart />
            Continue Shopping
            </Link>
          </button>
          <button className="flex rounded-xl p-2 items-center gap-3 text-sm bg-green-600 text-indigo-50 hover:text-green-800 font-semibold transition disabled:opacity-50">
            <Link href='cart/checkout' className="flex items-center gap-1">
            <ShoppingBasket />
             Proceed to CheckOut
            </Link>
          </button>
        </div>

      </div>
    </main>
  );
}
