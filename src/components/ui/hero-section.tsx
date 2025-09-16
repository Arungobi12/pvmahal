import { Button } from "./button";
import { Link } from "react-router-dom";
import { Calendar, Star } from "lucide-react";
import { siteImages } from "@/assets/images"; // <-- 1. Import from our central image file

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        // 2. Use a real image from your project
        style={{ backgroundImage: `url(${siteImages.homepg})` }}
      >
        <div className="absolute inset-0 bg-gradient-premium-gold/90"></div>
      </div>
      <br></br>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            PV Mahal
          </h1>
          <br></br>
          <p className="text-xl md:text-2xl mb-10 text-white/120 font-light leading-relaxed">
            <b>Where Dreams Meet Elegance</b>
          </p>
          <br></br>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Check Availability
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/gallery">
                <Star className="mr-2 h-5 w-5" />
                View Gallery
              </Link>
            </Button>
          </div>
          <br></br>
           {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
       <br></br>
        </div>
        <br></br>
        <p className="text-lg mb-12 text-white/150 max-w-2xl mx-auto leading-relaxed">
            <b>Experience the perfect blend of luxury and tradition at Chennai's premier wedding venue. 
            From intimate gatherings to grand celebrations, we make every moment unforgettable.
          </b>
        </p>
      </div>

    
    </section>
  );
};

export default HeroSection;