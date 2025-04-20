"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  // State for auth management without context
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null
  });
  
  // Try to get stored user from localStorage on client
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('devinUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: true,
            user
          });
        }
      }
    } catch (error) {
      console.error("Error initializing auth state:", error);
    }
  }, []);

  const menuItems = [
    { name: "Services", href: "/" },
    { name: "Book Now", href: "/booking" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('devinUser');
    }
    setIsOpen(false);
    router.push("/");
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    router.push("/auth");
  };

  const handleDashboardClick = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">
                DevinofallTrades
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <div className="flex flex-col items-end">
              <p className="text-xs text-muted-foreground">
                Serving Bradenton
              </p>
              <a href="tel:9412144257" className="text-sm font-bold text-primary flex items-center gap-1">
                <Phone className="h-3 w-3" />
                (941) 214-4257
              </a>
            </div>
            
            {authState.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
            
            <Link href="/booking">
              <Button className="gold-button">
                Book a Service
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Auth Links for Mobile */}
                  {authState.isAuthenticated ? (
                    <>
                      <button
                        className="text-lg font-medium flex items-center gap-2"
                        onClick={handleDashboardClick}
                      >
                        <User className="h-5 w-5" />
                        My Dashboard
                      </button>
                      <button
                        className="text-lg font-medium flex items-center gap-2 text-red-600"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-lg font-medium flex items-center gap-2"
                      onClick={handleLoginClick}
                    >
                      <User className="h-5 w-5" />
                      Login / Register
                    </button>
                  )}
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-xs text-muted-foreground">
                      Serving Bradenton
                    </p>
                    <a href="tel:9412144257" className="text-lg font-bold text-primary flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      (941) 214-4257
                    </a>
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      <Button className="gold-button mt-4 w-full">
                        Book a Service
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}