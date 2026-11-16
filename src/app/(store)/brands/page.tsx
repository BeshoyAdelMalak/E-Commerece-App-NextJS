
import Link from "next/link";
import { Tags } from "lucide-react"

interface Brand {
  _id: string;
  name: string;
  image: string;
}

interface BrandsResponse {
  results?: number;
  data?: Brand[];
}

async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const result: BrandsResponse = await response.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Brands API Error:", error);
    return [];
  }
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#8738fa] to-[#bd73f5]">
        <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-10 lg:px-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="text-white/70 transition hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/50">/</span>

            <span className="font-medium text-white">
              Brands
            </span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-6 pb-12">
            <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-[22px] border border-white/20 bg-white/20 shadow-lg">
              <Tags width="42" height="42"/>
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Top Brands
              </h1>

              <p className="mt-2 text-lg text-white/85 md:text-xl">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 lg:px-16">
        {brands.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No brands found
            </h2>
            <p className="mt-2 text-gray-500">
              Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {brands.map((brand) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="group flex min-h-[308px] flex-col items-center rounded-[21px] border border-gray-100 bg-white px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
              >
                {/* Brand Image Container */}
                <div className="flex h-[187px] w-full items-center justify-center rounded-2xl bg-[#f8f9fa] p-5 transition-colors duration-300 group-hover:bg-purple-50">
                  <div className="flex h-[105px] w-full items-center justify-center bg-white p-3">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Brand Name */}
                <h2 className="mt-4 text-center text-base font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                  {brand.name}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
