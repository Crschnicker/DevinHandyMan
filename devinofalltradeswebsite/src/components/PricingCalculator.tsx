"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  DollarSign,
  Paintbrush,
  Wrench,
  BatteryCharging,
  Hammer,
  Armchair,
  Droplets,
  Smartphone
} from "lucide-react";

// Service pricing data
// Note: These prices are examples and should be updated with actual business rates
const servicePricing = {
  painting: {
    name: "Painting",
    icon: Paintbrush,
    basePrice: 35,
    description: "Per hour, plus materials. Includes wall preparation, taping, and cleanup.",
    optionLabel: "Square Footage",
    options: [
      { name: "Small Room (up to 150 sq ft)", multiplier: 1, price: 35, hours: 4 },
      { name: "Medium Room (151-250 sq ft)", multiplier: 1.5, price: 52.5, hours: 6 },
      { name: "Large Room (251-400 sq ft)", multiplier: 2, price: 70, hours: 8 },
      { name: "Extra Large Room (400+ sq ft)", multiplier: 2.5, price: 87.5, hours: 10 }
    ],
    addons: [
      { id: "prep", name: "Heavy Prep Work (patching, sanding)", price: 75 },
      { id: "ceiling", name: "Ceiling Painting", price: 85 },
      { id: "trim", name: "Trim/Baseboards", price: 45 }
    ]
  },
  electrical: {
    name: "Electrical",
    icon: BatteryCharging,
    basePrice: 65,
    description: "Per hour, plus parts. All work done by qualified professionals.",
    optionLabel: "Project Type",
    options: [
      { name: "Replace Light Fixture", multiplier: 1, price: 65, hours: 1 },
      { name: "Install Ceiling Fan", multiplier: 1.5, price: 97.5, hours: 1.5 },
      { name: "Replace Outlets/Switches", multiplier: 0.75, price: 48.75, hours: 0.75, perUnit: true },
      { name: "Install Dimmer Switches", multiplier: 1, price: 65, hours: 1, perUnit: true }
    ],
    addons: [
      { id: "highceiling", name: "High Ceiling Access Required", price: 35 },
      { id: "complex", name: "Complex Wiring", price: 50 }
    ]
  },
  repairs: {
    name: "General Repairs",
    icon: Wrench,
    basePrice: 45,
    description: "Per hour, plus materials. Most common household repairs.",
    optionLabel: "Repair Type",
    options: [
      { name: "Door Repair/Adjustment", multiplier: 1, price: 45, hours: 1 },
      { name: "Window Repair", multiplier: 1.25, price: 56.25, hours: 1.25 },
      { name: "Cabinet Repair", multiplier: 1.5, price: 67.5, hours: 1.5 },
      { name: "Shelf Installation", multiplier: 1, price: 45, hours: 1 }
    ],
    addons: [
      { id: "materials", name: "Materials Provided", price: 35 },
      { id: "hardware", name: "New Hardware", price: 25 }
    ]
  },
  drywall: {
    name: "Drywall",
    icon: Hammer,
    basePrice: 55,
    description: "Per hour, plus materials. Includes patching, taping, and mud work.",
    optionLabel: "Project Size",
    options: [
      { name: "Small Patch (up to 1 sq ft)", multiplier: 0.75, price: 41.25, hours: 0.75 },
      { name: "Medium Patch (1-4 sq ft)", multiplier: 1.5, price: 82.5, hours: 1.5 },
      { name: "Large Patch (4-10 sq ft)", multiplier: 2.5, price: 137.5, hours: 2.5 },
      { name: "New Drywall Installation (per 8x4 sheet)", multiplier: 3, price: 165, hours: 3, perUnit: true }
    ],
    addons: [
      { id: "texture", name: "Texture Matching", price: 45 },
      { id: "prime", name: "Prime & Paint", price: 35 }
    ]
  },
  assembly: {
    name: "Furniture Assembly",
    icon: Armchair,
    basePrice: 40,
    description: "Per hour. We assemble all types of furniture from any store.",
    optionLabel: "Item Complexity",
    options: [
      { name: "Simple Item (small shelf, side table)", multiplier: 1, price: 40, hours: 1 },
      { name: "Medium Item (desk, dining table)", multiplier: 2, price: 80, hours: 2 },
      { name: "Complex Item (large bookcase, bed frame)", multiplier: 3, price: 120, hours: 3 },
      { name: "Very Complex Item (entertainment center, large wardrobes)", multiplier: 4, price: 160, hours: 4 }
    ],
    addons: [
      { id: "disposal", name: "Packaging Disposal", price: 15 },
      { id: "wallmount", name: "Wall Mounting/Securing", price: 35 }
    ]
  },
  caulking: {
    name: "Caulking",
    icon: Droplets,
    basePrice: 40,
    description: "Per hour, plus materials. Waterproof sealing for bathrooms, kitchens, windows.",
    optionLabel: "Project Area",
    options: [
      { name: "Bathtub/Shower", multiplier: 1, price: 40, hours: 1 },
      { name: "Kitchen Countertops", multiplier: 1, price: 40, hours: 1 },
      { name: "Window Sealing (per window)", multiplier: 0.5, price: 20, hours: 0.5, perUnit: true },
      { name: "Full Bathroom Recaulking", multiplier: 2, price: 80, hours: 2 }
    ],
    addons: [
      { id: "removal", name: "Old Caulk Removal", price: 25 },
      { id: "mold", name: "Mold Treatment", price: 30 }
    ]
  },
  smartHome: {
    name: "Smart Home Setup",
    icon: Smartphone, // Need to import this from lucide-react
    basePrice: 75,
    description: "Professional setup and configuration of smart home devices",
    optionLabel: "Project Type",
    options: [
      { name: "Smart Speaker/Display Setup", multiplier: 1, price: 75, hours: 1 },
      { name: "Smart Lighting System", multiplier: 1.5, price: 112.5, hours: 1.5 },
      { name: "Smart Thermostat Installation", multiplier: 2, price: 150, hours: 2 },
      { name: "Complete Smart Home System", multiplier: 4, price: 300, hours: 4 }
    ],
    addons: [
      { id: "networking", name: "WiFi Network Optimization", price: 45 },
      { id: "training", name: "User Training Session", price: 40 },
      { id: "integration", name: "Multi-Device Integration", price: 60 }
    ]
  }
};

export function PricingCalculator({ onBookService = null }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    if (selectedService && selectedOption) {
      calculateEstimate();
    }
  }, [selectedService, selectedOption, quantity, selectedAddons]);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedOption(null);
    setQuantity(1);
    setSelectedAddons([]);
    setEstimate(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(100, value))); // Limit between 1-100
  };

  const handleAddonToggle = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateEstimate = () => {
    if (!selectedService || !selectedOption) return;

    const service = servicePricing[selectedService];
    const option = service.options.find(opt => opt.name === selectedOption);

    if (!option) return;

    // Calculate base price based on option and quantity
    let subtotal = option.perUnit ? option.price * quantity : option.price;

    // Add any selected add-ons
    let addonsTotal = 0;
    let addonsDetails = [];

    if (selectedAddons.length > 0) {
      service.addons.forEach(addon => {
        if (selectedAddons.includes(addon.id)) {
          addonsTotal += addon.price;
          addonsDetails.push({
            name: addon.name,
            price: addon.price
          });
        }
      });
    }

    // Calculate time estimate
    let timeEstimate = option.perUnit ? option.hours * quantity : option.hours;

    // Calculate total
    const total = subtotal + addonsTotal;

    setEstimate({
      service: service.name,
      option: option.name,
      quantity: quantity,
      subtotal: subtotal,
      addons: addonsDetails,
      addonsTotal: addonsTotal,
      total: total,
      timeEstimate: timeEstimate
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleBookService = () => {
    if (onBookService && selectedService) {
      onBookService(selectedService);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <Card className="border-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Estimate Your Project</CardTitle>
              <CardDescription>Choose your service and options for an instant price estimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-4">
                <Label>Select Service Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(servicePricing).map(([id, service]) => (
                    <button
                      key={id}
                      className={`p-3 rounded-lg border flex flex-col items-center text-center gap-1.5 transition-colors hover:border-primary/40 ${
                        selectedService === id ? "bg-primary/5 border-primary" : "border-border"
                      }`}
                      onClick={() => handleServiceSelect(id)}
                    >
                      <service.icon className={`h-6 w-6 ${selectedService === id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${selectedService === id ? "text-primary" : ""}`}>{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              {selectedService && (
                <div className="space-y-4">
                  <Label>{servicePricing[selectedService].optionLabel}</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {servicePricing[selectedService].options.map((option) => (
                      <button
                        key={option.name}
                        className={`p-3 rounded-lg border text-left transition-colors hover:border-primary/40 ${
                          selectedOption === option.name ? "bg-primary/5 border-primary" : "border-border"
                        }`}
                        onClick={() => handleOptionSelect(option.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${selectedOption === option.name ? "text-primary" : ""}`}>
                            {option.name}
                          </span>
                          <span className="font-semibold text-primary">
                            {formatCurrency(option.price)}
                            {option.perUnit && " each"}
                          </span>
                        </div>
                        {option.perUnit && selectedOption === option.name && (
                          <div className="mt-3 flex items-center">
                            <Label className="mr-3">Quantity:</Label>
                            <Input
                              type="number"
                              min="1"
                              max="100"
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="w-20"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {selectedService && selectedOption && (
                <div className="space-y-4">
                  <Label>Additional Options</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {servicePricing[selectedService].addons.map((addon) => (
                      <div
                        key={addon.id}
                        className={`p-3 rounded-lg border flex justify-between items-center transition-colors ${
                          selectedAddons.includes(addon.id) ? "bg-primary/5 border-primary" : "border-border"
                        }`}
                      >
                        <label htmlFor={`addon-${addon.id}`} className="flex items-center flex-1 cursor-pointer">
                          <input
                            id={`addon-${addon.id}`}
                            type="checkbox"
                            className="mr-3 h-4 w-4 accent-primary"
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => handleAddonToggle(addon.id)}
                          />
                          <span className={selectedAddons.includes(addon.id) ? "text-primary font-medium" : ""}>
                            {addon.name}
                          </span>
                        </label>
                        <span className="font-semibold text-primary">{formatCurrency(addon.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!selectedService && (
                <div className="flex items-center justify-center h-48 text-muted-foreground text-center p-6 border border-dashed rounded-lg">
                  <div>
                    <Calculator className="h-10 w-10 mx-auto mb-2 opacity-40" />
                    <p>Select a service to calculate your estimate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estimate Results */}
          <Card className="border-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Estimated Price</CardTitle>
              <CardDescription>Your project cost breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {estimate ? (
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Selected Service</div>
                    <div className="text-lg font-semibold">{estimate.service}</div>
                    <div className="text-sm text-primary">{estimate.option}</div>
                    {estimate.quantity > 1 && (
                      <div className="text-sm">Quantity: {estimate.quantity}</div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Base Price:</span>
                      <span className="font-medium">{formatCurrency(estimate.subtotal)}</span>
                    </div>

                    {estimate.addons.length > 0 && (
                      <>
                        <div className="text-muted-foreground text-sm mb-2">Add-ons:</div>
                        {estimate.addons.map((addon, idx) => (
                          <div key={idx} className="flex justify-between mb-1 pl-4">
                            <span className="text-sm">{addon.name}</span>
                            <span className="text-sm font-medium">{formatCurrency(addon.price)}</span>
                          </div>
                        ))}
                      </>
                    )}

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Estimate:</span>
                      <span className="text-primary">{formatCurrency(estimate.total)}</span>
                    </div>

                    <div className="mt-4 bg-primary/5 p-3 rounded-lg text-center">
                      <p className="text-sm">
                        Estimated Time: <span className="font-semibold">{estimate.timeEstimate} hour{estimate.timeEstimate !== 1 ? 's' : ''}</span>
                      </p>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>* This estimate is based on standard job conditions and may vary depending on actual site conditions and requirements.</p>
                      <p className="mt-1">* Material costs may be additional unless specified.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    {onBookService ? (
                      <Button className="gold-button w-full" onClick={handleBookService}>
                        Book This Service
                      </Button>
                    ) : (
                      <Link href={`/booking?service=${selectedService}`}>
                        <Button className="gold-button w-full">
                          Book This Service
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[460px] text-muted-foreground text-center p-6 border border-dashed rounded-lg">
                  <div>
                    <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-lg mb-2">Your estimate will appear here</p>
                    <p className="text-sm max-w-xs mx-auto">
                      Select a service and options on the left to see pricing details
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}