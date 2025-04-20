"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IntegratedBookingFlow } from "@/components/IntegratedBookingFlow";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [initialService, setInitialService] = useState(null);

  useEffect(() => {
    // Get service from URL query parameters if available
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setInitialService(serviceParam);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-12 bg-muted/30">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-primary mb-6">Book Your Service</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Schedule your handyman service with instant pricing and time estimates.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <IntegratedBookingFlow initialService={initialService} />
      </div>
      
      <Footer />
    </main>
  );
}