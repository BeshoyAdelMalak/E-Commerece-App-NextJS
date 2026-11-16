

import { getAllProducts } from "@/components/lib/api";
import ProductCard from "./product-card";

export default async function ProductsList() {
  const products = await getAllProducts();
  return (
    <html>
      <body>
        <section className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              All Products
            </h2>

            <p className="mt-2 text-gray-500">
              Discover our latest products.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </section>
      </body>
    </html>
  );
}



