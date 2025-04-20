"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone } from "lucide-react";

const areas = [
  {
    name: "Bradenton",
    description: "Local help for home & condo fixes",
  },
  {
    name: "Palmetto",
    description: "Dependable services just around the corner",
  },
  {
    name: "Sarasota",
    description: "Quality repairs, upgrades & installs",
  }
];

export function ServiceAreasSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Where We Work
            </h2>
            <p className="text-muted-foreground mb-8">
              Providing professional handyman services throughout Florida's Gulf Coast region.
              Not listed? Just ask—we probably serve your area!
            </p>

            <div className="space-y-4">
              {areas.map((area) => (
                <div key={area.name} className="flex items-start gap-3 border-b border-primary/10 pb-4">
                  <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{area.name}</h3>
                    <p className="text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="gold-button" size="lg">
                Check Availability
              </Button>
              <a href="tel:9412144257" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">(941) 214-4257</span>
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.50394844228!2d-82.69929687500001!3d27.371961299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c340111d8da00d%3A0x8efddbb6df0e3312!2sSarasota%2C%20FL!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Areas Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
