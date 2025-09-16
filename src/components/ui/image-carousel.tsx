import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { siteImages } from "@/assets/images";

const carouselImages = [
  { src: siteImages.hall1, alt: "Main Hall decorated for an event" },
  { src: siteImages.dinning, alt: "Spacious dining area at PV Mahal" },
  { src: siteImages.frontdoor, alt: "Grand entrance to PV Mahal" },
  { src: siteImages.stage1, alt: "Beautifully decorated wedding stage" },
];

const ImageCarousel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden border-none shadow-elegant">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarousel;