
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand?: {
    _id: string;
    name: string;
  };
  category?: {
    _id: string;
    name: string;
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await response.json();

  const product = result.data;

  if (!product) {
    notFound();
  }

  return (
    <html>
        <head>
            <title>Product Details</title>
        </head>
        <body>
            
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-[1600px] px-6 pt-8 md:px-10 lg:px-16">
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <a href="/" className="text-gray-400 hover:text-purple-600">
            Home
          </a>

          <span className="text-gray-300">/</span>

          <span className="font-medium text-purple-600">
            {product.title}
          </span>
        </nav>
      </div>

      <section className="mx-auto max-w-[1600px] px-6 py-10 md:px-10 lg:px-16">
        <ProductDetailsClient product={product} />
      </section>
    </main>
    
        </body>
    </html>
  );
}
