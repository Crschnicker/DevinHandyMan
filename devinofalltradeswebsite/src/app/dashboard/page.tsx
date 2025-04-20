"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Dashboard } from "@/components/DashboardComponent";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container-custom py-24 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-8 bg-muted/30">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-primary mb-4">My Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            View and manage your appointments and account information
          </p>
        </div>
      </div>
      <Dashboard />
      <Footer />
    </main>
  );
}