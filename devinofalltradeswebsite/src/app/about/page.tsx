import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";

export const metadata = {
  title: "About Us - DevinofallTrades | Professional Handyman Services",
  description: "Learn about DevinofallTrades, your reliable handyman service provider in Bradenton offering quality and professional home repair services.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-12 bg-muted/30">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-primary mb-6">About DevinofallTrades</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your trusted local handyman service in Bradenton, providing quality work and professional service.
          </p>
        </div>
      </div>
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <Footer />
    </main>
  );
}