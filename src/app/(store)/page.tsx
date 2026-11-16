
import ShopByCategory from "@/app/(store)/catagories/ShopByCategory";
import HeroSlider from "./hierslider";
import Link from "next/link";


import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
  Mail,
  Leaf,
  Tag,
  ArrowRight,
  Smartphone,
  Apple,
  Play,
  Sparkles,
  
} from "lucide-react";
import ProductsList from "./products/page";




const features = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: Truck,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: RotateCcw,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    icon: Headset,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
];

const promoBanners = [
  {
    id: 1,
    badge: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    buttonText: "Shop Now",
    theme: "green",
  },
  {
    id: 2,
    badge: "✨ New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    buttonText: "Explore Now",
    theme: "orange",
  },
];


export default function HomePage() {
  return (
    <html>
      <head>
        <title>Fresh Cart</title>

      </head>
    
    <body>
    <main className="mr-5 ml-5">
      <HeroSlider />
       <section className="w-full bg-gray-50 px-4 py-5">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex min-h-[102px] items-center gap-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Icon */}
              <div
                className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full ${feature.iconBg}`}
              >
                <Icon
                  size={27}
                  strokeWidth={2.8}
                  className={feature.iconColor}
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold leading-6 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-[14px] leading-5 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>

      <ShopByCategory />



<section className="w-full px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-[30px]">
        {promoBanners.map((banner) => {
          const isGreen = banner.theme === "green";

          return (
            <div
              key={banner.id}
              className={`relative isolate min-h-[375px] overflow-hidden rounded-[20px] px-7 py-10 text-white sm:px-10 ${
                isGreen
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                  : "bg-gradient-to-br from-orange-500 to-rose-500"
              }`}
            >
              {/* Decorative circles */}
              <div
                className={`pointer-events-none absolute -right-1 top-0 -z-10 h-[100px] w-[100px] rounded-full ${
                  isGreen ? "bg-white/10" : "bg-white/10"
                }`}
              />

              <div
                className={`pointer-events-none absolute -bottom-10 -left-10 -z-10 h-[115px] w-[115px] rounded-full bg-white/10`}
              />

              {/* Badge */}
              <div className="mb-5 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {banner.badge}
              </div>

              {/* Content */}
              <h2 className="mb-2 text-[30px] font-bold leading-tight tracking-tight sm:text-[36px]">
                {banner.title}
              </h2>

              <p className="mb-5 text-base font-medium text-white/90 sm:text-xl">
                {banner.description}
              </p>

              {/* Discount */}
              <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="text-[36px] font-extrabold leading-none sm:text-[40px]">
                  {banner.discount}
                </span>

                <span className="text-sm font-medium text-white/90 sm:text-base">
                  Use code:{" "}
                  <strong className="font-extrabold text-white">
                    {banner.code}
                  </strong>
                </span>
              </div>

              {/* Button */}
              <Link
                href="/products"
                className={`inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isGreen
                    ? "text-emerald-600 hover:bg-emerald-50"
                    : "text-orange-600 hover:bg-orange-50"
                }`}
              >
                {banner.buttonText}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </section>



<section>
  <h2 className="flex items-center gap-3 text-3xl font-bold text-[#152b43] ml-15">
          <span className="h-10 w-[7px] rounded-full bg-[#009e67]" />
          Featured  <span className="text-[#009e67]">Products</span>
  </h2>

  <ProductsList />

  <h2>
    <Link href="/products" className="flex items-center gap-2 w-fit text-center mx-auto bg-green-600 hover:bg-green-700 cursor-pointer text-white px-7 py-3 rounded-full shadow-md font-semibold">
               More Products
      </Link>
  </h2>

</section>


<section>
 <NewsletterAppPromo/>
</section>
      
    </main>
    </body>
    </html>
  );
}








export function NewsletterAppPromo(){
 
  const features = [
    { icon: Leaf, label: "Fresh Picks Weekly" },
    { icon: Truck, label: "Free Delivery Codes" },
    { icon: Tag, label: "Members-Only Deals" },
  ];
   interface NewsletterAppPromoProps {
  onSubscribe?: (email: string) => void | Promise<void>;
}
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1520px] rounded-[40px] border border-emerald-100/80 bg-gradient-to-br from-[#effdf7] via-[#fbfffd] to-[#effcf8] px-6 py-10 shadow-[0_25px_70px_rgba(16,185,129,0.07)] sm:px-10 lg:px-[70px] lg:py-[70px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.65fr_1fr] lg:gap-10">

          {/* Newsletter Section */}
          <div className="min-w-0 lg:border-r lg:border-emerald-100 lg:pr-10">

            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[20px] bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                <Mail size={27} />
              </div>

              <div>
                <p className="text-[17px] font-semibold uppercase tracking-wide text-emerald-600">
                  Newsletter
                </p>
                <p className="text-[14px] text-slate-500">
                  50,000+ subscribers
                </p>
              </div>
            </div>

            <h2 className="text-[34px] font-extrabold leading-[1.3] tracking-tight text-[#101b30] sm:text-[40px]">
              Get the Freshest Updates
              <span className="block text-emerald-600">
                Delivered Free
              </span>
            </h2>

            <p className="mt-5 text-[17px] leading-relaxed text-slate-500 sm:text-[21px]">
              Weekly recipes, seasonal offers &amp; exclusive member perks.
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-3">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Icon size={17} fill="currentColor" />
                  </span>

                  <span className="whitespace-nowrap text-sm font-medium text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Newsletter Form */}
            <form className="mt-10 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-[74px] min-w-0 flex-1 rounded-[20px] border-2 border-slate-200 bg-white px-6 text-[17px] text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="submit"
                className="flex h-[74px] shrink-0 items-center justify-center gap-3 rounded-[20px] bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-[17px] font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-10"
              >
                Subscribe
                <ArrowRight size={22} />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <Sparkles size={15} className="text-amber-400" />
              <span>Unsubscribe anytime. No spam, ever.</span>
            </div>
          </div>

          {/* Mobile App Section */}
          <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-[490px] rounded-[30px] bg-gradient-to-br from-[#111827] via-[#192535] to-[#202c3d] px-7 py-9 text-white sm:px-10 sm:py-10">

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-400">
                <Smartphone size={15} />
                MOBILE APP
              </div>

              <h3 className="mt-6 text-[25px] font-extrabold leading-tight tracking-tight sm:text-[29px]">
                Shop Faster on Our App
              </h3>

              <p className="mt-6 text-[16px] leading-relaxed text-slate-400">
                Get app-exclusive deals &amp; 15% off your first order.
              </p>

              {/* App Store */}
              <div className="mt-9 flex flex-col gap-4">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[74px] items-center gap-5 rounded-[15px] border border-white/10 bg-white/10 px-6 transition hover:bg-white/15"
                >
                  <Apple size={28} fill="white" />

                  <span className="flex flex-col">
                    <span className="text-[12px] leading-tight text-slate-400">
                      DOWNLOAD ON
                    </span>
                    <span className="text-[17px] font-bold">
                      App Store
                    </span>
                  </span>
                </a>

                {/* Google Play */}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[74px] items-center gap-5 rounded-[15px] border border-white/10 bg-white/10 px-6 transition hover:bg-white/15"
                >
                  <Play size={28} fill="white" />

                  <span className="flex flex-col">
                    <span className="text-[12px] leading-tight text-slate-400">
                      GET IT ON
                    </span>
                    <span className="text-[17px] font-bold">
                      Google Play
                    </span>
                  </span>
                </a>
              </div>

              {/* Rating */}
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <div className="text-[19px] tracking-tight text-yellow-400">
                  ★★★★★
                </div>

                <p className="text-[16px] text-slate-400">
                  4.9 · 100K+ downloads
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
