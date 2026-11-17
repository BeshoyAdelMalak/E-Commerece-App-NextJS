import Footer from '@/components/footer';
import Navbar from "@/components/navbar";
import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="h-20 bg-gray-100" />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </main>
  );
}