"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "t1",
    name: "Sarah",
    location: "Bradenton",
    rating: 5,
    text: "Devin's attention to detail is unmatched. My walls look brand new!",
  },
  {
    id: "t2",
    name: "Michael",
    location: "Bradenton",
    rating: 5,
    text: "He knocked out my to-do list in one visit—lifesaver.",
  },
  {
    id: "t3",
    name: "Jennifer",
    location: "Bradenton",
    rating: 5,
    text: "Professional, neat, and super efficient. Highly recommend.",
  },
  {
    id: "t4",
    name: "Robert",
    location: "Bradenton",
    rating: 5,
    text: "On time, fair pricing, and quality craftsmanship. Will call again!",
  },
  {
    id: "t5",
    name: "Elizabeth",
    location: "Bradenton",
    rating: 5,
    text: "Finally found a reliable handyman who takes pride in their work.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What People Are Saying
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our customers have to say about our service.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-primary/5 h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={`star-${testimonial.id}-${i}`} className="h-4 w-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-lg italic">"{testimonial.text}"</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}