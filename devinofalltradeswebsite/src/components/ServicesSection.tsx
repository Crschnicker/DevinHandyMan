"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Paintbrush, Wrench, Droplets, BatteryCharging, Armchair, Hammer, Smartphone } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "painting",
    title: "Painting",
    description: "Fresh coats for interiors and exteriors",
    icon: Paintbrush,
    image: "/images/img1.png"
  },
  {
    id: "caulking",
    title: "Caulking",
    description: "Clean seals for bathrooms, kitchens & windows",
    icon: Droplets,
    image: "/images/img2.png"
  },
  {
    id: "drywall",
    title: "Drywall Repair",
    description: "Smooth finishes for holes or water damage",
    icon: Hammer,
    image: "/images/img3.png"
  },
  {
    id: "electrical",
    title: "Electrical",
    description: "Light fixture installs, fans, switches & more",
    icon: BatteryCharging,
    image: "/images/img4.png"
  },
  {
    id: "assembly",
    title: "Furniture Assembly",
    description: "From bookshelves to beds, we'll build it",
    icon: Armchair,
    image: "/images/img5.png"
  },
  {
    id: "repairs",
    title: "General Repairs",
    description: "Fixes for what's broken, loose, or squeaky",
    icon: Wrench,
    image: "/images/img6.png"
  },
  {
    id: "smartHome",
    title: "Smart Home Setup",
    description: "Professional setup and configuration of smart devices",
    icon: Smartphone, // Import this from lucide-react
    image: "/images/img7.png" // You'll need to add this image
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Fixes, Installs & Everything in Between
          </h2>
          <p className="text-muted-foreground text-lg">
            Professional service with fair pricing and exceptional quality. No job is too small!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-primary/5 bg-card shadow-sm hover:shadow transition-shadow overflow-hidden">
              <div className="w-full h-48 relative">
                <Image 
                  src={service.image}
                  alt={`${service.title} service`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="bg-primary/5 w-12 h-12 rounded-md flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {service.description}
                </CardDescription>
                <Link href={`/booking?service=${service.id}`}>
                  <Button className="gold-button w-full">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}