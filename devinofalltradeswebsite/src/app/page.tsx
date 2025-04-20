"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/lib/AuthContext";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During server rendering, show a simplified version
  if (!isMounted) {
    return (
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    );
  }

  // Once client-side rendering is active, include the AuthProvider
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </AuthProvider>
  );
}