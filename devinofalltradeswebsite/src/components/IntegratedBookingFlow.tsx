"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/AuthContext";
import { AuthRequiredModal } from "@/components/AuthComponents";
import {
  CalendarDays,
  CheckCircle,
  Armchair,
  Paintbrush,
  Wrench,
  Hammer,
  BatteryCharging,
  Droplets,
  DollarSign,
  Clock,
  Video,
  Upload,
  Smartphone,
  Image as ImageIcon
} from "lucide-react";

// Service types and pricing data
const serviceTypes = [
  {
    id: "painting",
    name: "Painting",
    icon: Paintbrush,
    basePrice: 35,
    description: "Fresh coats for interiors and exteriors",
    pricingDescription: "Per hour, plus materials. Includes wall preparation, taping, and cleanup.",
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
  {
    id: "electrical",
    name: "Electrical",
    icon: BatteryCharging,
    basePrice: 65,
    description: "Light fixture installs, fans, switches & more",
    pricingDescription: "Per hour, plus parts. All work done by qualified professionals.",
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
  {
    id: "repairs",
    name: "General Repairs",
    icon: Wrench,
    basePrice: 45,
    description: "Fixes for what's broken, loose, or squeaky",
    pricingDescription: "Per hour, plus materials. Most common household repairs.",
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
  {
    id: "drywall",
    name: "Drywall",
    icon: Hammer,
    basePrice: 55,
    description: "Smooth finishes for holes or water damage",
    pricingDescription: "Per hour, plus materials. Includes patching, taping, and mud work.",
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
  {
    id: "assembly",
    name: "Furniture Assembly",
    icon: Armchair,
    basePrice: 40,
    description: "From bookshelves to beds, we'll build it",
    pricingDescription: "Per hour. We assemble all types of furniture from any store.",
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
  {
    id: "caulking",
    name: "Caulking",
    icon: Droplets,
    basePrice: 40,
    description: "Clean seals for bathrooms, kitchens & windows",
    pricingDescription: "Per hour, plus materials. Waterproof sealing for bathrooms, kitchens, windows.",
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
  {
    id: "smartHome",
    name: "Smart Home Setup",
    icon: Smartphone,
    basePrice: 75,
    description: "Professional setup and configuration of smart home devices",
    pricingDescription: "Per hour, plus parts. Setup, configuration, and personalized training.",
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
];

// Available time slots
const availableTimeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM"
];

// Day names for the calendar
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generate dates for the next 14 days
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays (can be adjusted based on business availability)
    if (date.getDay() !== 0) {
      dates.push({
        date: date,
        disabled: false,
        formattedDate: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        }),
        dayName: dayNames[date.getDay()]
      });
    }
  }

  return dates;
};

// Format currency helper function
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export function IntegratedBookingFlow({ initialService = null }) {
  // Auth state
  const { user, isAuthenticated, addAppointment } = useAuth();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Booking state
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedServiceOption, setSelectedServiceOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  
  // Video upload state
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isCapturingVideo, setIsCapturingVideo] = useState(false);
  
  // Pricing calculations
  const [estimate, setEstimate] = useState(null);
  
  const availableDates = generateAvailableDates();
  
  // Set initial service if provided
  useEffect(() => {
    if (initialService && serviceTypes.some(service => service.id === initialService)) {
      setSelectedServiceId(initialService);
    }
  }, [initialService]);
  
  // Calculate estimate whenever service selections change
  useEffect(() => {
    if (selectedServiceId && selectedServiceOption) {
      calculateEstimate();
    }
  }, [selectedServiceId, selectedServiceOption, quantity, selectedAddons]);

  // Prefill form data from user info if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedServiceId(serviceId);
    setSelectedServiceOption(null);
    setQuantity(1);
    setSelectedAddons([]);
    setEstimate(null);
  };
  
  const handleOptionSelect = (option) => {
    setSelectedServiceOption(option);
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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const calculateEstimate = () => {
    if (!selectedServiceId || !selectedServiceOption) return;

    const service = serviceTypes.find(s => s.id === selectedServiceId);
    if (!service) return;
    
    const option = service.options.find(opt => opt.name === selectedServiceOption);
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

  const handleNextStep = () => {
    // For the first step, require service, option and estimate
    if (step === 1 && selectedServiceId && selectedServiceOption && estimate) {
      setStep(2);
    } 
    // For the second step, require date and time
    else if (step === 2 && selectedDate && selectedTime) {
      // Check if user is authenticated before proceeding to step 3
      if (!isAuthenticated) {
        setIsAuthModalOpen(true);
        return;
      }
      setStep(3);
    } 
    // For the third step, require personal details
    else if (step === 3 && formData.name && formData.email && formData.phone && formData.address) {
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAuthLater = () => {
    setIsAuthModalOpen(false);
    // Proceed anyway
    setStep(3);
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(false);
    // Redirect to auth page with return URL
    router.push(`/auth?redirectTo=/booking`);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to your server or cloud storage
      // For this demo, we'll just store the file object
      setUploadedVideo({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
        url: URL.createObjectURL(file)
      });
      setIsCapturingVideo(false);
    }
  };

  const captureVideo = () => {
    setIsCapturingVideo(true);
    // In a real app, this would activate the device camera
    // For this demo, we'll just show a placeholder
    setTimeout(() => {
      setUploadedVideo({
        name: "Captured Video",
        size: "2.4 MB",
        type: "video/mp4",
        url: "#"
      });
      setIsCapturingVideo(false);
    }, 2000);
  };

  const removeVideo = () => {
    setUploadedVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    // Here you would send the data to your backend
    console.log({
      service: selectedServiceId,
      serviceOption: selectedServiceOption,
      quantity: quantity,
      addons: selectedAddons,
      estimate: estimate,
      date: selectedDate,
      time: selectedTime,
      video: uploadedVideo,
      ...formData
    });

    // Add appointment to user's account
    if (addAppointment) {
      await addAppointment({
        service: estimate.service,
        serviceOption: selectedServiceOption,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: "upcoming",
        address: formData.address,
        totalPrice: estimate.total
      });
    }

    // Move to confirmation step
    setStep(4);
  };

  const getSelectedService = () => {
    return serviceTypes.find(service => service.id === selectedServiceId);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mx-auto border-primary/5">
        <CardContent className="pt-6">
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      i < step ? "bg-primary text-white" :
                      i === step ? "bg-primary/20 text-primary border-2 border-primary" :
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      i
                    )}
                  </div>
                  <div className={`text-xs font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                    {i === 1 && "Service"}
                    {i === 2 && "Date & Time"}
                    {i === 3 && "Details"}
                    {i === 4 && "Confirmation"}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 px-4">
              <div className="h-1 bg-primary flex-grow mt-1" />
              <div className={`h-1 flex-grow mt-1 ${step > 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1 flex-grow mt-1 ${step > 2 ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1 flex-grow mt-1 ${step > 3 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>

          {/* STEP 1: SERVICE SELECTION WITH PRICING */}
          {step === 1 && (
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-primary mb-2">Choose a Service</CardTitle>
                <CardDescription>Select the type of service you need assistance with.</CardDescription>
              </CardHeader>

              {/* Service Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    className={`p-4 rounded-lg border transition-colors flex flex-col items-center text-center gap-2 hover:border-primary/40 ${
                      selectedServiceId === service.id ? "bg-primary/5 border-primary" : "border-border"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <service.icon className={`h-8 w-8 ${selectedServiceId === service.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${selectedServiceId === service.id ? "text-primary" : ""}`}>{service.name}</span>
                    <span className="text-xs text-muted-foreground">From {formatCurrency(service.basePrice)}</span>
                  </button>
                ))}
              </div>

              {/* Service Options - Only show when a service is selected */}
              {selectedServiceId && (
                <>
                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">{getSelectedService()?.optionLabel}</Label>
                      <span className="text-sm text-muted-foreground">{getSelectedService()?.pricingDescription}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {getSelectedService()?.options.map((option) => (
                        <button
                          key={option.name}
                          className={`p-3 rounded-lg border text-left transition-colors hover:border-primary/40 ${
                            selectedServiceOption === option.name ? "bg-primary/5 border-primary" : "border-border"
                          }`}
                          onClick={() => handleOptionSelect(option.name)}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${selectedServiceOption === option.name ? "text-primary" : ""}`}>
                              {option.name}
                            </span>
                            <span className="font-semibold text-primary">
                              {formatCurrency(option.price)}
                              {option.perUnit && " each"}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Est. time: {option.hours} hour{option.hours !== 1 ? 's' : ''}
                          </div>
                          {option.perUnit && selectedServiceOption === option.name && (
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
                </>
              )}

              {/* Add-ons - Only show when a service and option are selected */}
              {selectedServiceId && selectedServiceOption && (
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Additional Options</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {getSelectedService()?.addons.map((addon) => (
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

              {/* Price Estimate Summary - Only show when an estimate is available */}
              {estimate && (
                <div className="bg-muted p-4 rounded-lg space-y-3 mt-4">
                  <div className="flex items-center text-primary font-medium">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price Estimate</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Price:</span>
                      <span className="font-medium">{formatCurrency(estimate.subtotal)}</span>
                    </div>

                    {estimate.addons.length > 0 && (
                      <>
                        <div className="text-muted-foreground text-sm mb-1">Add-ons:</div>
                        {estimate.addons.map((addon, idx) => (
                          <div key={idx} className="flex justify-between mb-1 pl-4">
                            <span className="text-sm">{addon.name}</span>
                            <span className="text-sm font-medium">{formatCurrency(addon.price)}</span>
                          </div>
                        ))}
                      </>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Estimate:</span>
                      <span className="text-primary">{formatCurrency(estimate.total)}</span>
                    </div>

                    <div className="flex items-center mt-1 text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Estimated Time: <span className="font-medium">{estimate.timeEstimate} hour{estimate.timeEstimate !== 1 ? 's' : ''}</span></span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedServiceId || !selectedServiceOption || !estimate}
                  className="gold-button w-full"
                >
                  Continue to Schedule
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {step === 2 && (
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-primary mb-2">Choose a Date & Time</CardTitle>
                <CardDescription>Select your preferred appointment date and time.</CardDescription>
              </CardHeader>

              {/* Show selected service summary */}
              {estimate && (
                <div className="bg-muted p-3 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{estimate.service}</h4>
                      <p className="text-sm text-muted-foreground">{estimate.option}{estimate.quantity > 1 ? ` (Qty: ${estimate.quantity})` : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{formatCurrency(estimate.total)}</p>
                      <p className="text-xs text-muted-foreground">Est. {estimate.timeEstimate} hour{estimate.timeEstimate !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="font-medium mb-2 block">Select Date</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                        selectedDate && selectedDate.toDateString() === date.date.toDateString()
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border hover:border-primary/40"
                      } ${date.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => !date.disabled && handleDateSelect(date.date)}
                      disabled={date.disabled}
                    >
                      <span className="text-xs font-medium">{date.dayName}</span>
                      <span className="text-sm">{date.formattedDate}</span>
                    </button>
                  ))}
                </div>

                <Label className="font-medium mb-2 block">Select Time</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      className={`p-2 rounded-lg border transition-colors ${
                        selectedTime === time
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border hover:border-primary/40"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="w-1/2"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime}
                  className="gold-button w-1/2"
                >
                  Continue to Your Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-primary mb-2">Your Details</CardTitle>
                <CardDescription>Please provide your contact information and service location.</CardDescription>
              </CardHeader>

              {/* Show selected service and appointment summary */}
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{estimate?.service}</h4>
                  <p className="font-semibold text-primary">{formatCurrency(estimate?.total)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">{estimate?.option}{estimate?.quantity > 1 ? ` (Qty: ${estimate?.quantity})` : ''}</p>
                  <p>Est. {estimate?.timeEstimate} hour{estimate?.timeEstimate !== 1 ? 's' : ''}</p>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                  <span>{selectedTime}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Where the service will be performed"
                      required
                    />
                  </div>

                  {/* Video Upload/Recording Section */}
                  <div className="space-y-2">
                    <Label>Project Video (Optional)</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center">
                      {!uploadedVideo && !isCapturingVideo ? (
                        <>
                          <Video className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                          <p className="mb-2">Record a video or upload images of your project</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Helps our technician prepare for your specific needs
                          </p>
                          <div className="flex justify-center gap-2">
                            <Button 
                              type="button" 
                              onClick={captureVideo}
                              className="flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Record Video
                            </Button>
                            <label className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-input hover:bg-muted/50 cursor-pointer">
                              <Upload className="h-4 w-4" />
                              Upload File
                              <input
                                type="file"
                                accept="video/*,image/*"
                                className="hidden"
                                onChange={handleVideoUpload}
                              />
                            </label>
                          </div>
                        </>
                      ) : isCapturingVideo ? (
                        <div className="py-4">
                          <div className="animate-pulse flex flex-col items-center">
                            <Video className="h-12 w-12 text-primary mb-4" />
                            <p>Recording video...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {uploadedVideo.type.includes('image') ? (
                              <ImageIcon className="h-10 w-10 text-primary" />
                            ) : (
                              <Video className="h-10 w-10 text-primary" />
                            )}
                            <div>
                              <p className="font-medium text-left">{uploadedVideo.name}</p>
                              <p className="text-xs text-muted-foreground text-left">{uploadedVideo.size}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeVideo}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Please provide any additional details about your project"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="w-1/2"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="gold-button w-1/2"
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.address}
                >
                  Book Appointment
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 4 && (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">Booking Confirmed!</CardTitle>
              <CardDescription className="text-base">
                Your appointment request has been successfully submitted. We'll contact you shortly to confirm the details.
              </CardDescription>

              <div className="bg-muted rounded-lg p-4 mt-6 text-left">
                <h4 className="font-semibold mb-2">Appointment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Service:</div>
                    <div className="w-2/3 font-medium">{estimate?.service}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Details:</div>
                    <div className="w-2/3 font-medium">
                      {estimate?.option}
                      {estimate?.quantity > 1 ? ` (Quantity: ${estimate?.quantity})` : ''}
                    </div>
                  </div>
                  
                  {estimate?.addons.length > 0 && (
                    <div className="flex justify-between">
                      <div className="w-1/3 text-muted-foreground align-top">Add-ons:</div>
                      <div className="w-2/3 font-medium">
                        {estimate?.addons.map((addon, idx) => (
                          <div key={idx}>{addon.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Estimate:</div>
                    <div className="w-2/3 font-medium text-primary">{formatCurrency(estimate?.total)}</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Est. Time:</div>
                    <div className="w-2/3 font-medium">{estimate?.timeEstimate} hour{estimate?.timeEstimate !== 1 ? 's' : ''}</div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Date:</div>
                    <div className="w-2/3 font-medium">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Time:</div>
                    <div className="w-2/3 font-medium">{selectedTime}</div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Name:</div>
                    <div className="w-2/3 font-medium">{formData.name}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Email:</div>
                    <div className="w-2/3 font-medium">{formData.email}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Phone:</div>
                    <div className="w-2/3 font-medium">{formData.phone}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/3 text-muted-foreground">Address:</div>
                    <div className="w-2/3 font-medium">{formData.address}</div>
                  </div>
                  
                  {uploadedVideo && (
                    <div className="flex justify-between">
                      <div className="w-1/3 text-muted-foreground">Project Media:</div>
                      <div className="w-2/3 font-medium">{uploadedVideo.name} ({uploadedVideo.size})</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6 justify-center">
                <Button
                  className="gold-button"
                  onClick={() => {
                    // Reset form for new booking
                    setSelectedServiceId(null);
                    setSelectedServiceOption(null);
                    setQuantity(1);
                    setSelectedAddons([]);
                    setEstimate(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setUploadedVideo(null);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      address: "",
                      notes: "",
                    });
                    setStep(1);
                  }}
                >
                  Book Another Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auth Required Modal */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthLater}
        onLogin={handleLoginClick}
        onRegister={handleLoginClick}
      />
    </div>
  );
}