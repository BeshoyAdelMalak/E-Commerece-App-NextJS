
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCategory(id: string): Promise<Category | null> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const result = await response.json();

  return result.data ?? null;
}

async function getCategoryProducts(id: string): Promise<Product[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const result = await response.json();

  return result.data ?? [];
}

export default async function CategoryDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [category, products] = await Promise.all([
    getCategory(id),
    getCategoryProducts(id),
  ]);

  if (!category) {
    notFound();
  }

  return (

    <html><body>
    <main className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <section className="bg-gradient-to-r from-[#8738fa] to-[#bd73f5]">
        <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-10 lg:px-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="text-white/70 transition hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/50">/</span>

            <Link
              href="/catagories"
              className="text-white/70 transition hover:text-white"
            >
              Categories
            </Link>

            <span className="text-white/50">/</span>

            <span className="font-medium text-white">
              {category.name}
            </span>
          </nav>

          {/* Category Heading */}
          <div className="flex items-center gap-5 py-10">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/20 shadow-lg">
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                className="h-14 w-14 rounded-lg object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white md:text-5xl">
                {category.name}
              </h1>

              <p className="mt-2 text-lg text-white/85">
                Explore products in {category.name}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 lg:px-16">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category.name} Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Discover our latest collection
            </p>
          </div>

          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            {products.length} Products
          </span>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              No products found
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no products in this category.
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {products.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gray-50 p-4">

                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                  />

                </div>

                {/* Product Info */}
                <div className="p-4">

                  <h3 className="line-clamp-2 min-h-12 text-sm font-semibold text-gray-800 transition-colors group-hover:text-purple-600">
                    {product.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <span className="font-bold text-gray-900">
                      {product.priceAfterDiscount ?? product.price} EGP
                    </span>

                    {product.priceAfterDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                    )}

                  </div>

                  <div className="mt-3 flex items-center gap-1 text-sm text-yellow-500">
                    <span>★</span>

                    <span className="font-medium text-gray-600">
                      {product.ratingsAverage}
                    </span>
                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </section>
    </main>
    </body>
    </html>
  );
}
