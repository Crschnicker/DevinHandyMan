"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Paintbrush,
  Wrench,
  Zap,
  Hammer,
  Armchair,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 z-0" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              Your Go-To Handyman in Bradenton
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              From repairs to upgrades, we handle the to-do list so you don't have to.
              Fast, friendly, and always professional.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-primary/20 text-primary flex items-center gap-1">
                <Paintbrush className="h-3 w-3" /> Painting
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-primary/20 text-primary flex items-center gap-1">
                <Zap className="h-3 w-3" /> Electrical
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-primary/20 text-primary flex items-center gap-1">
                <Wrench className="h-3 w-3" /> Repairs
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-primary/20 text-primary flex items-center gap-1">
                <Hammer className="h-3 w-3" /> Drywall
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-primary/20 text-primary flex items-center gap-1">
                <Armchair className="h-3 w-3" /> Assembly
              </Badge>
            </div>

            <div className="mt-8">
              <Link href="/booking">
                <Button className="gold-button" size="lg">
                  Book a Service
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
            <div className="relative rounded-lg overflow-hidden shadow-2xl border">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1769&auto=format&fit=crop"
                alt="Professional handyman working"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}