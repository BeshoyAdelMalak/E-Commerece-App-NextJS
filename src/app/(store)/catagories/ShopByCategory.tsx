
"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getCategories, type Category } from "@/components/lib/api";

export default function ShopByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="bg-white px-[4%] py-8">

      <div className="mb-16 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-[#152b43]">
          <span className="h-10 w-[7px] rounded-full bg-[#009e67]" />
          Shop By <span className="text-[#009e67]">Category</span>
        </h2>

        <a
          href="/categories"
          className="hidden items-center gap-3 text-lg text-[#009e67] sm:flex"
        >
          View All Categories
          <ArrowRight size={23} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories.map((category) => (
          <a
            key={category._id}
            href={`/categories/${category.slug}`}
            className="group flex h-[188px] flex-col items-center justify-center gap-4 rounded-xl border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-gray-50">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-contain transition group-hover:scale-110"
              />
            </div>

            <h3 className="text-center text-lg font-medium text-[#172e4c]">
              {category.name}
            </h3>
          </a>
        ))}
      </div>

    </section>
  );
}
