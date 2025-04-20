"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                DevinofallTrades
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-white/80 max-w-md">
              Professional handyman services for Bradenton.
              From small repairs to larger projects, we handle it all with quality and care.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/" aria-label="Twitter" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-white/80 hover:text-white transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-white/80 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/80">
                8051 North Tamiami Trail, STE B3, Bradenton, FL 34243
              </li>
              <li>
                <a href="tel:9412144257" className="text-white/80 hover:text-white transition-colors">
                  (941) 214-4257
                </a>
              </li>
              <li>
                <a href="mailto:info@devinofalltrades.com" className="text-white/80 hover:text-white transition-colors">
                  info@devinofalltrades.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">
            &copy; {new Date().getFullYear()} DevinofallTrades. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}