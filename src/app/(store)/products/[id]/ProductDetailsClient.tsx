
"use client";

import Image from "next/image";
import { useState } from "react";
import { updateNavbarCounts } from "@/components/lib/navbar-events";

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand?: { name: string };
  category?: { name: string };
}

interface Props {
  product: Product;
}

type Tab = "description" | "reviews" | "shipping" | "returns";

export default function ProductDetailsClient({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [selectedImage, setSelectedImage] = useState(product.imageCover);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");

  const images = [
    product.imageCover,
    ...(product.images || []).filter(
      (image) => image !== product.imageCover
    ),
  ];

  const discount =
    product.priceAfterDiscount &&
    product.priceAfterDiscount < product.price
      ? Math.round(
          ((product.price - product.priceAfterDiscount) /
            product.price) *
            100
        )
      : 0;

  async function handleAddToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to add items to your cart.");
      return;
    }

    setCartLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "POST",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add to cart");
      }

      setMessage("Added to your cart successfully!");
      updateNavbarCounts({
        cart:
          typeof result.numOfCartItems === "number"
            ? result.numOfCartItems
            : undefined,
      });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setCartLoading(false);
    }
  }

  async function toggleWishlist() {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to use your wishlist.");
      return;
    }

    setWishlistLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        isFavorite
          ? `https://ecommerce.routemisr.com/api/v1/wishlist/${product._id}`
          : "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            token,
            "Content-Type": "application/json",
          },
          ...(isFavorite
            ? {}
            : {
                body: JSON.stringify({
                  productId: product._id,
                }),
              }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Wishlist request failed");
      }

      setIsFavorite(!isFavorite);
      setMessage(
        isFavorite
          ? "Removed from your wishlist!"
          : "Added to your wishlist!"
      );
      updateNavbarCounts({
        wishlist: Array.isArray(result.data) ? result.data.length : undefined,
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setWishlistLoading(false);
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "Product Details" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping" },
    { id: "returns", label: "Returns" },
  ];

  return (
    <div className="space-y-10">

      {/* Main Product */}
      <div className="grid grid-cols-1 gap-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-2">

        {/* Images */}
        <div>
          <div className="relative flex h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 md:h-[480px]">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />

            {discount > 0 && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                -{discount}% OFF
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 overflow-hidden rounded-xl border-2 bg-gray-50 transition ${
                  selectedImage === image
                    ? "border-purple-600"
                    : "border-gray-100 hover:border-purple-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="flex flex-col justify-center">

          {product.category && (
            <span className="w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              {product.category.name}
            </span>
          )}

          <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xl text-yellow-500">★</span>
            <span className="font-bold text-gray-800">
              {product.ratingsAverage}
            </span>
            <span className="text-sm text-gray-400">
              ({product.ratingsQuantity} Reviews)
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              {product.sold} Sold
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-purple-600">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>

            {discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {product.price} EGP
                </span>
                <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-bold text-red-500">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <div className="mt-7 space-y-4 border-t border-gray-100 pt-6">
            {product.brand && (
              <div className="flex justify-between">
                <span className="text-gray-500">Brand</span>
                <span className="font-semibold text-gray-900">
                  {product.brand.name}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500">Availability</span>
              <span className={`font-semibold ${
                product.quantity > 0 ? "text-green-600" : "text-red-500"
              }`}>
                {product.quantity > 0
                  ? `In Stock (${product.quantity})`
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0 || cartLoading}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#8738fa] to-[#bd73f5] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-50"
            >
              {cartLoading ? "Adding..." : "Add To Cart"}
            </button>

            <button
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              className={`flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 font-semibold transition ${
                isFavorite
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-500"
              }`}
            >
              <span className="text-xl">
                {isFavorite ? "♥" : "♡"}
              </span>
              {wishlistLoading
                ? "Please wait..."
                : isFavorite
                  ? "Wishlisted"
                  : "Add to Wishlist"}
            </button>
          </div>

          {message && (
            <p className="mt-4 rounded-xl bg-purple-50 p-3 text-sm text-purple-700">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Details Tabs */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

        <div className="flex overflow-x-auto border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-5 text-sm font-semibold transition md:px-8 ${
                activeTab === tab.id
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              {tab.label}
              {tab.id === "reviews" && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {product.ratingsQuantity}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10">

          {/* Description */}
          {activeTab === "description" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Product Description
              </h2>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
                {product.description}
              </p>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
                {product.title}
              </p>


              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="mt-2 font-semibold text-gray-900">
                    {product.brand?.name || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-2 font-semibold text-gray-900">
                    {product.category?.name || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Customer Reviews
              </h2>

              <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-purple-50 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-5xl font-bold text-purple-600">
                    {product.ratingsAverage}
                    <span className="text-xl">/5</span>
                  </p>
                  <p className="mt-2 text-yellow-500">★★★★★</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Based on {product.ratingsQuantity} reviews
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-gray-500">
                Individual customer reviews are not loaded in this
                version. The rating summary above comes from the
                product API. Connect the reviews endpoint to display
                customer names, comments, and individual ratings.
              </p>
            </div>
          )}

          {/* Shipping */}
          {activeTab === "shipping" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Information
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Home Delivery
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      Delivery options and estimated arrival times
                      will be confirmed during checkout based on your
                      shipping address.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Order Tracking
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      Track your order after it has been confirmed
                      and dispatched.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Returns */}
          {activeTab === "returns" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Returns & Refunds
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                  <span className="text-2xl">↩️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Return Policy
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      Please contact customer support to confirm
                      eligibility and the applicable return period
                      before sending an item back.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl bg-gray-50 p-5">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Refund Information
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      Refund methods and processing times depend on
                      the order and payment method.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
