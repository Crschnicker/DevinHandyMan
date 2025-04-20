import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCalculator } from "@/components/PricingCalculator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pricing - DevinofallTrades | Professional Handyman Services",
  description: "Calculate fair and transparent prices for your handyman projects with DevinofallTrades in Bradenton.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-12 bg-muted/30">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-primary mb-6">Pricing Calculator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get an instant estimate for your handyman project. Actual prices may vary based on project specifics.
          </p>
        </div>
      </div>
      <PricingCalculator />
      <div className="py-12 bg-muted">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Ready to Book Your Service?</h2>
          <p className="text-muted-foreground mb-6">
            Schedule an appointment with us today and get your project started.
          </p>
          <Link href="/booking">
            <Button className="gold-button" size="lg">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}