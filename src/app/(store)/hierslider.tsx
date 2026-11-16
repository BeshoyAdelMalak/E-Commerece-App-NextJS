
"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    image:
      "https://images.openai.com/static-rsc-4/4IDQazF2MCgqAx3mRSKXlp910kZS5NIXo9dJK_0cg_r3iXhAaFgV5_h2j7STnsbj2dm9qhHsbAJveoDEYfqaYecx6QGGNaw3bzb1quffH1qud3T0MqMp88Zeb7iwVqZPOrXFO6mZP1kJufZZbmwdVwX2s66QrAbxn7MY5P3Ssru8xbu5D21kGctu2i0W1KoE?purpose=fullsize",
    button: "Shop Now",
    secondary: "View Deals",
  },
  {
    title: "Premium Quality",
    subtitle: "Fresh from farm to your table ",
    image:
      "https://images.openai.com/static-rsc-4/4IDQazF2MCgqAx3mRSKXlp910kZS5NIXo9dJK_0cg_r3iXhAaFgV5_h2j7STnsbj2dm9qhHsbAJveoDEYfqaYecx6QGGNaw3bzb1quffH1qud3T0MqMp88Zeb7iwVqZPOrXFO6mZP1kJufZZbmwdVwX2s66QrAbxn7MY5P3Ssru8xbu5D21kGctu2i0W1KoE?purpose=fullsize",
    button: "Shop Now",
    secondary: "Learn More",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available ",
    image:
      "https://images.openai.com/static-rsc-4/4IDQazF2MCgqAx3mRSKXlp910kZS5NIXo9dJK_0cg_r3iXhAaFgV5_h2j7STnsbj2dm9qhHsbAJveoDEYfqaYecx6QGGNaw3bzb1quffH1qud3T0MqMp88Zeb7iwVqZPOrXFO6mZP1kJufZZbmwdVwX2s66QrAbxn7MY5P3Ssru8xbu5D21kGctu2i0W1KoE?purpose=fullsize",
    button: "Order Now",
    secondary: "Delivery Info",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % slides.length);
  //   }, 25000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <section className="relative h-[380px] w-full overflow-hidden bg-green-700 md:h-[420px]">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 via-green-600/75 to-green-700/50" />

          {/* Content */}
          <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-6 md:px-12 lg:px-16 ml-10">
            <div className="max-w-[500px] text-white">
              <h1 className="mb-5 text-3xl font-bold leading-tight md:text-4xl lg:text-[40px]">
                {slide.title}
              </h1>

              <p className="mb-6 text-base font-medium md:text-xl">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/products"
                  className="rounded-xl bg-white px-8 py-3.5 font-semibold text-green-600 transition hover:bg-green-50"
                >
                  {slide.button}
                </a>

                <a
                  href="/deals"
                  className="rounded-xl border-2 border-white/60 px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-green-600"
                >
                  {slide.secondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-600 shadow-lg transition hover:scale-110 hover:bg-white md:left-5 md:h-[60px] md:w-[60px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-600 shadow-lg transition hover:scale-110 hover:bg-white md:right-5 md:h-[60px] md:w-[60px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            className={`h-3.5 rounded-full transition-all duration-300 ${
              current === index
                ? "w-10 bg-white"
                : "w-3.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}