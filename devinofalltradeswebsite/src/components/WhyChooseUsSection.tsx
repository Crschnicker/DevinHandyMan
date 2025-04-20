"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, ThumbsUp, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Shows up on time & gets it done right",
    icon: Clock,
    description: "We value your time and schedule. Our team is punctual and efficient, completing each job with precision and expertise.",
  },
  {
    title: "Offers fair, upfront pricing",
    icon: DollarSign,
    description: "No hidden fees or surprises. We provide clear, detailed quotes before starting any work, so you always know what to expect.",
  },
  {
    title: "Stands behind their work",
    icon: ThumbsUp,
    description: "We take pride in our craftsmanship and guarantee our services. If you're not satisfied, we'll make it right.",
  },
  {
    title: "Keeps your space clean",
    icon: Sparkles,
    description: "We respect your home and clean up thoroughly after every project, leaving your space better than we found it.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose DevinofallTrades
          </h2>
          <p className="text-muted-foreground text-lg">
            Choosing DevinofallTrades means hiring a pro who delivers excellence in every detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <Card key={benefit.title} className="border-primary/5 bg-card shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-start gap-4">
                <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
                  <CardContent className="px-0 pt-2">
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1769&auto=format&fit=crop"
                alt="Professional handyman service"
                className="rounded-lg shadow-lg object-cover w-full h-[300px]"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Delivering friendly, local service you can trust
              </h3>
              <p className="text-muted-foreground mb-6">
                With years of experience serving the Bradenton, Palmetto, and Sarasota areas,
                we've built a reputation for reliability, quality workmanship, and exceptional
                customer service.
              </p>
              <ul className="space-y-3">
                {["Licensed and insured", "Background-checked professionals", "Years of experience", "Satisfaction guaranteed"].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--gold))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
