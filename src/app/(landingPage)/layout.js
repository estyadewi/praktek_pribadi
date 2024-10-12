import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export default function LandingPageLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen overflow-hidden">
      <TopNavbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </section>
  );
}