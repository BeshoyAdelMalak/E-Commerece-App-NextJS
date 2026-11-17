export interface NavbarCountsDetail {
  cart?: number;
  wishlist?: number;
  orders?: number;
  wishlistIds?: string[];
}

/**
 * Dispatches an event to update cart/wishlist/orders count in the navbar instantly.
 * If specific counts are provided, the navbar UI updates immediately.
 * If detail is omitted, the navbar re-fetches the latest counts from the server.
 */
export function updateNavbarCounts(detail?: NavbarCountsDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<NavbarCountsDetail>("updateNavbarCounts", {
        detail,
      })
    );
  }
}

/**
 * Dispatches auth-change event when user signs in or logs out.
 */
export function dispatchAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-change"));
    window.dispatchEvent(new Event("updateNavbarCounts"));
  }
}

