import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export default function LandingPageLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <TopNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}