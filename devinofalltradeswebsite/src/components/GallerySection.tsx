"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveHorizontal } from "lucide-react";

// Gallery projects data
const projects = [
  {
    id: "painting",
    title: "Painting Projects",
    items: [
      {
        id: "painting-1",
        title: "Living Room Transformation",
        description: "Dated beige walls to modern clean white finish",
        beforeImage: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1769&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1374&auto=format&fit=crop",
        location: "Bradenton",
        timeframe: "2 days"
      },
      {
        id: "painting-2",
        title: "Kitchen Refresh",
        description: "Dark cabinets painted white for a brighter space",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bda9eda18740?q=80&w=1770&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e97?q=80&w=1770&auto=format&fit=crop",
        location: "Sarasota",
        timeframe: "3 days"
      },
    ]
  },
  {
    id: "repairs",
    title: "Repair Projects",
    items: [
      {
        id: "repair-1",
        title: "Drywall Repair",
        description: "Fixing water-damaged ceiling and repainting",
        beforeImage: "https://images.unsplash.com/photo-1567534996137-8b5b0b2665d2?q=80&w=1770&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1613163694204-523db4b3d489?q=80&w=1769&auto=format&fit=crop",
        location: "Palmetto",
        timeframe: "1 day"
      },
      {
        id: "repair-2",
        title: "Door Repair",
        description: "Fixing misaligned door and broken hinges",
        beforeImage: "https://images.unsplash.com/photo-1620226340944-681a3aad3c1e?q=80&w=1742&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1639286007209-6c0d41a9c4b2?q=80&w=1770&auto=format&fit=crop",
        location: "Bradenton",
        timeframe: "4 hours"
      }
    ]
  },
  {
    id: "installations",
    title: "Installation Projects",
    items: [
      {
        id: "install-1",
        title: "Ceiling Fan Installation",
        description: "Installing new ceiling fan with light fixture",
        beforeImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1770&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=1770&auto=format&fit=crop",
        location: "Sarasota",
        timeframe: "2 hours"
      },
      {
        id: "install-2",
        title: "Bathroom Fixtures",
        description: "Replacing old sink and faucet with modern fixtures",
        beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1770&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1770&auto=format&fit=crop",
        location: "Palmetto",
        timeframe: "1 day"
      }
    ]
  }
];

// Image comparison component
const BeforeAfterImage = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const container = e.currentTarget.getBoundingClientRect();
      const position = ((e.clientX - container.left) / container.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  };

  const handleTouchMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const position = ((touch.clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div className="relative w-full h-full select-none">
      <div
        className="relative overflow-hidden rounded-lg cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* After image (full width) */}
        <div className="w-full h-full">
          <AspectRatio ratio={16/9}>
            <img
              src={afterImage}
              alt={`After: ${title}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </AspectRatio>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <AspectRatio ratio={16/9}>
            <img
              src={beforeImage}
              alt={`Before: ${title}`}
              className="object-cover h-full rounded-lg"
              style={{ width: `${100 / (sliderPosition/100)}%`, maxWidth: "none" }}
            />
          </AspectRatio>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute p-2 bg-white rounded-full shadow-md">
            <MoveHorizontal className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">Before</div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">After</div>
      </div>
    </div>
  );
};

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Project Gallery
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse through our before and after transformations. Drag the slider to see the difference!
          </p>
        </div>

        <Tabs defaultValue="painting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {projects.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm md:text-base"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              {category.items.map(project => (
                <Card key={project.id} className="overflow-hidden border-primary/5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-2 lg:p-4">
                      <BeforeAfterImage
                        beforeImage={project.beforeImage}
                        afterImage={project.afterImage}
                        title={project.title}
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <CardTitle className="text-xl font-semibold text-primary mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base mb-4">
                        {project.description}
                      </CardDescription>
                      <div className="mt-2 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium">{project.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timeframe:</span>
                          <span className="font-medium">{project.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Button className="gold-button">
            Request A Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
