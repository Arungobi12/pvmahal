import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section";
import AmenitiesSection from "@/components/custom/AmenitiesSection";
import TestimonialsSection from "@/components/custom/TestimonialsSection";
import HomeGallerySection from "@/components/custom/HomeGallerySection"; // <-- 1. Import the new component

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AmenitiesSection />
      <HomeGallerySection /> {/* <-- 2. Replace ImageCarousel with this */}
      <TestimonialsSection />
    </div>
  );
};

export default Home;