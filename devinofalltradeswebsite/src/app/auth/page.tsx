"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginRegisterForm } from "@/components/AuthComponents";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirect to dashboard or requested page if already authenticated
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container-custom py-24 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading...</p>
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
          <h1 className="text-4xl font-bold text-primary mb-4">Account Access</h1>
          <p className="text-lg text-muted-foreground">
            Log in to your account or create a new one to manage your services
          </p>
        </div>
      </div>
      <div className="container-custom py-12">
        <LoginRegisterForm />
      </div>
      <Footer />
    </main>
  );
}