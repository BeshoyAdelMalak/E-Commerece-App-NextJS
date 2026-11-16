"use client";

import { useEffect, useState } from "react";
import { Layers3 } from "lucide-react";
import { getCategories, type Category } from "@/components/lib/api";

export default function() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

    return(
        <html>
        <body>
            

<section className="bg-white px-[4%] py-8">

      <div className="mb-16 flex items-center justify-between w-full">
         <div className="w-full bg-gradient-to-r from-[#16b653] to-[#20c968] px-8 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-base">
          <span className="text-white/75">Home</span>
          <span className="text-white/50">/</span>
          <span className="font-semibold text-white">Categories</span>
        </div>

        {/* Header Content */}
        <div className="flex items-center gap-6">
          {/* Icon */}
          <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-[22px] border border-white/20 bg-white/20 shadow-lg">
            <Layers3 className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              All Categories
            </h1>

            <p className="mt-1 text-lg text-white/90 md:text-xl">
              Browse our wide range of product categories
            </p>
          </div>
        </div>
      </div>
    </div>


      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <a
            key={category._id}
            href={`/catagories/${category._id}`}
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

            </body>
            </html>
    )
}


