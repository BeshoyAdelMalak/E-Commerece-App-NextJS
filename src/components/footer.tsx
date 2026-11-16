
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headset,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  SquareLetterF,
  Bird,
  Camera,
  SquarePlay,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        "All Products",
        "Categories",
        "Brands",
        "Electronics",
        "Men's Fashion",
        "Women's Fashion",
      ],
    },
    {
      title: "Account",
      links: [
        "My Account",
        "Order History",
        "Wishlist",
        "Shopping Cart",
        "Sign In",
        "Create Account",
      ],
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "Help Center",
        "Shipping Info",
        "Returns & Refunds",
        "Track Order",
      ],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
      ],
    },
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over 500 EGP",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "14-day return policy",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Contact us anytime",
    },
  ];

  return (
    <footer className="font-sans">
      {/* Benefits Section */}
      <div className="bg-[#effcf4]">
        <div className="mx-auto mr-5 ml-10 grid max-w-[1552px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-[#d9fbe7]">
                  <Icon className="h-6 w-6 text-[#16a34a]" />
                </div>

                <div>
                  <h4 className="text-base font-semibold text-[#111827]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#101827] text-white">
        <div className="mx-auto grid max-w-[1552px] grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[2.1fr_1fr_1fr_1fr_1fr] lg:gap-10 lg:px-0 lg:py-[60px]">

          {/* Brand & Contact */}
          <div>
            <div className="mb-9 mr-5 ml-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3">
              <ShoppingCart className="h-8 w-8 text-[#16a34a]" />
              <span className="text-[34px] font-bold leading-none tracking-tight text-[#263746]">
                FreshCart
              </span>
            </div>

            <p className="mb-8 mr-5 ml-5 max-w-[490px] text-base leading-7 text-[#a6b4c8]">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands
              at competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-4 text-[#a6b4c8] mr-5 ml-5">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-4 transition hover:text-white"
              >
                <Phone className="h-[18px] w-[18px] fill-[#16c66a] text-[#16c66a]" />
                <span>+1 (800) 123-4567</span>
              </a>

              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-4 transition hover:text-white"
              >
                <Mail className="h-[18px] w-[18px] fill-[#16c66a] text-[#16c66a]" />
                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-center gap-4">
                <MapPin className="h-[18px] w-[18px] fill-[#16c66a] text-[#16c66a]" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 flex gap-4 mr-5 ml-5">
              {[
                { icon: SquareLetterF, label: "Facebook" },
                { icon: Bird, label: "Twitter" },
                { icon: Camera, label: "Instagram" },
                { icon: SquarePlay, label: "YouTube" },
              ].map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#202c3d] text-[#a6b0bf] transition hover:bg-[#16a34a] hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-8 text-xl font-bold text-white">
                {column.title}
              </h3>

              <ul className="space-y-5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base text-[#a6b4c8] transition hover:pl-1 hover:text-[#16c66a]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright & Payments */}
        <div className="border-t border-[#263244]">
          <div className="mx-auto mr-5 ml-5 flex max-w-[1552px] flex-col items-center justify-between gap-4 px-6 py-7 text-[#74849c] sm:flex-row lg:px-0">
            <p className="text-sm sm:text-base">
              © 2026 FreshCart. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Visa", "Mastercard", "PayPal"].map((payment) => (
                <div
                  key={payment}
                  className="flex items-center gap-3 text-sm sm:text-base"
                >
                  <CreditCard className="h-[18px] w-[18px] fill-[#74849c] text-[#74849c]" />
                  <span>{payment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;