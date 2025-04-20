"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Reach out today for a free estimate!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/5 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <select id="service" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Select a service</option>
                    <option value="painting">Painting</option>
                    <option value="caulking">Caulking</option>
                    <option value="drywall">Drywall Repair</option>
                    <option value="electrical">Electrical</option>
                    <option value="assembly">Furniture Assembly</option>
                    <option value="repairs">General Repairs</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please describe your project..." className="min-h-[120px]" />
                </div>
                <Button className="gold-button w-full" size="lg">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border-primary/5 bg-card shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Address</h3>
                      <p className="text-muted-foreground">
                        8051 North Tamiami Trail, STE B3, Sarasota, FL 34243
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Phone</h3>
                      <a
                        href="tel:9412144257"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (941) 214-4257
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Email</h3>
                      <a
                        href="mailto:info@devinofalltrades.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@devinofalltrades.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 3:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex-grow h-[250px] rounded-lg overflow-hidden shadow-lg border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.50394844228!2d-82.69929687500001!3d27.371961299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c340111d8da00d%3A0x8efddbb6df0e3312!2sSarasota%2C%20FL!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
