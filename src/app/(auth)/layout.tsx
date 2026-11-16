import Footer from '@/components/footer';
import Navbar from "@/components/navbar";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}