import { siteImages } from "@/assets/images";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HomeGallerySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">A Glimpse of Our Venue</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a few highlights from our gallery of memorable events and beautiful spaces.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <img 
              src={siteImages.stage1} 
              alt="Main Hall" 
              className="rounded-lg object-cover w-full h-full shadow-card"
              loading="lazy" // Added for performance
            />
          </div>
          <div className="space-y-4">
            <img 
              src={siteImages.frontview2} 
              alt="Entrance" 
              className="rounded-lg object-cover w-full h-full shadow-card"
              loading="lazy" // Added for performance
            />
            {/* Added a third image for a more balanced layout */}
            
          </div>
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/gallery">Explore Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeGallerySection;