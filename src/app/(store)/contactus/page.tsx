
export default function ContactUs() {
  return (
    <html lang="en">
      <head>
        <title>contact us </title>
        <meta
          name="description"
          content="Contact us and get in touch with our team."
        />
      </head>

      <body className="bg-[#f8fafc] text-[#111827]">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#19b85b] to-[#36d875] text-white">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="text-xs mb-5">
              <span className="opacity-80">Home</span>
              <span className="mx-2">/</span>
              <span className="font-semibold">Contact Us</span>
            </div>

            <div className="flex items-center gap-4 pb-7">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9a6 6 0 00-12 0v5a3 3 0 003 3h1v-6H7m11-2v5a3 3 0 01-3 3h-1m4-6h2v5a3 3 0 01-3 3h-2"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Contact Us
                </h1>
                <p className="text-sm mt-1">
                  We'd love to hear from you. Get in touch with our team.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">

            {/* Left Side - Contact Information */}
            <aside className="space-y-5">

              {/* Phone */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.01l-2.2 2.19z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Phone</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Mon-Fri from 8am to 6pm
                  </p>
                  <a href="tel:+18001234567" className="text-green-600 text-sm block mt-2">
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Email</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    We'll respond within 24 hours
                  </p>
                  <a href="mailto:support@freshcart.com" className="text-green-600 text-sm block mt-2">
                    support@freshcart.com
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Office</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    123 Commerce Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h5v-2h-4V6h-2v6a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Business Hours</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Monday - Friday: 8am - 6pm<br />
                    Saturday: 9am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-sm mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { name: "Facebook", icon: "f", url: "https://facebook.com" },
                    { name: "Twitter", icon: "♥", url: "https://twitter.com" },
                    { name: "Instagram", icon: "◎", url: "https://instagram.com" },
                    { name: "LinkedIn", icon: "in", url: "https://linkedin.com" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600 transition flex items-center justify-center font-bold text-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Side */}
            <section className="space-y-5">

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a7 7 0 00-7 7v4a3 3 0 003 3h1v-6H7V9a5 5 0 0110 0v1h-2v6h1a3 3 0 003-3V9a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Send us a Message</h2>
                    <p className="text-xs text-slate-500">
                      Fill out the form and we'll get back to you
                    </p>
                  </div>
                </div>

                <form className="space-y-4">

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition bg-white"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>

              {/* Help Center */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white shadow-sm text-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 15a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm1-4h-2v-1c0-1.5 2-2 2-3.5a2 2 0 00-4 0H7a4 4 0 018 0c0 2.5-2 3-2 4.5z" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    Looking for quick answers?
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>
                  <a
                    href="/help-center"
                    className="text-green-600 text-xs font-medium inline-block mt-3 hover:text-green-700"
                  >
                    Visit Help Center →
                  </a>
                </div>
              </div>

            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
