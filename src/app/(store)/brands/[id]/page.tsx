
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  quantity: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBrand(id: string): Promise<Brand | null> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { next: { revalidate: 3600 } }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch brand");

  const result = await res.json();
  return result.data;
}

async function getBrandProducts(id: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const result = await res.json();
  return result.data ?? [];
}

export default async function BrandDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getBrand(id),
    getBrandProducts(id),
  ]);

  if (!brand) notFound();

  return (
    <html>
        <body>

        
    <main className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <section className="bg-gradient-to-r from-[#8738fa] to-[#bd73f5]">
        <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-10 lg:px-16">

          <nav className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">
              Home
            </Link>
            <span className="text-white/50">/</span>
            <Link href="/brands" className="text-white/70 hover:text-white">
              Brands
            </Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">
              {brand.name}
            </span>
          </nav>

          <div className="flex items-center gap-5 py-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 border border-white/20">
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="h-14 w-14 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {brand.name}
              </h1>
              <p className="mt-2 text-lg text-white/85">
                Shop products from {brand.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 lg:px-16">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {brand.name} Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover all products from this brand
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
              This brand has no available products.
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
                  <h3 className="line-clamp-2 min-h-26 text-sm font-semibold text-gray-800 transition-colors group-hover:text-purple-600">
                    {product.title}
                  </h3>
                  

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {product.priceAfterDiscount ?? product.price} EGP
                      </span>

                      {product.priceAfterDiscount && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.price} EGP
                        </span>
                      )}
                    </div>
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
