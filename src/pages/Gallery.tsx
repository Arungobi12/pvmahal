import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteImages } from "@/assets/images";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = [
    { src: siteImages.frontview, title: "P.V. Mahal at Night", category: "exterior", description: "Stunning night view of the main entrance" },
    { src: siteImages.hall1, title: "Main Hall with Stage", category: "interior", description: "Spacious hall with full seating" },
    { src: siteImages.dinning, title: "Dining Hall", category: "interior", description: "Clean and expansive dining area" },
    { src: siteImages.stage1, title: "Wedding Stage Decor", category: "events", description: "Elegant stage decoration for weddings" },
    { src: siteImages.frontdoor, title: "Grand Entrance", category: "exterior", description: "Decorated main doors into the hall" },
    { src: siteImages.hall2, title: "Hall Seating Arrangement", category: "interior", description: "Wide view of the seating capacity" },
    { src: siteImages.frontview2, title: "Outdoor Entrance", category: "exterior", description: "Landscaped entrance for evening events" },
    { src: siteImages.hall3, title: "Hall Side View", category: "interior", description: "Architectural details of the main hall" },
    { src: siteImages.stage2, title: "Lounge Area", category: "interior", description: "Comfortable lounge seating for guests" },
    { src: siteImages.anil, title: "Decorative Lighting", category: "interior", description: "Unique and artistic lighting fixtures" },
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "interior", label: "Interior" },
    { id: "exterior", label: "Exterior" },
    { id: "events", label: "Events" },
  ];

  const filteredImages = selectedCategory === "all" ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);
  const openLightbox = (imageSrc: string) => setSelectedImage(imageSrc);
  const closeLightbox = () => setSelectedImage(null);
  const currentImageIndex = galleryImages.findIndex(img => img.src === selectedImage);
  const goToPrevious = () => setSelectedImage(galleryImages[currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1].src);
  const goToNext = () => setSelectedImage(galleryImages[currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0].src);

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">Explore our beautiful venue through these curated images</p>
        </div>
      </section>
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} onClick={() => setSelectedCategory(category.id)} className="rounded-full">
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <Card key={index} className="group cursor-pointer border-none shadow-card hover:shadow-elegant transition-shadow duration-300 overflow-hidden" onClick={() => openLightbox(image.src)}>
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 will-change-transform" /* <-- OPTIMIZED */
                    loading="lazy"
                    width="400"
                    height="256"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity" /> {/* <-- OPTIMIZED */}
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 will-change-transform"> {/* <-- OPTIMIZED */}
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 z-10" onClick={closeLightbox}><X className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10" onClick={goToPrevious}><ChevronLeft className="h-8 w-8" /></Button>
            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10" onClick={goToNext}><ChevronRight className="h-8 w-8" /></Button>
            <img src={selectedImage} alt="Gallery image" className="max-w-full max-h-[90vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;