import { Card, CardContent } from "./card";
import { CheckCircle, Car, Utensils, Wind, Camera, Music } from "lucide-react";
import { siteImages } from "@/assets/images"; // <-- Import from your new central file

const FeaturesSection = () => {
  const features = [
    { icon: CheckCircle, title: "500+ Seating Capacity", description: "Spacious halls for large gatherings" },
    { icon: Wind, title: "Full Air Conditioning", description: "Climate-controlled for year-round comfort" },
    { icon: Car, title: "Ample Parking", description: "Convenient parking for 200+ vehicles" },
    { icon: Utensils, title: "In-House Catering", description: "Delicious multi-cuisine menus" },
    { icon: Camera, title: "Photography Support", description: "Perfect lighting and backdrops" },
    { icon: Music, title: "Sound & AV Systems", description: "State-of-the-art equipment included" }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every detail thoughtfully designed to make your special day extraordinary
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-gold" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-card">
              <img src={siteImages.frontview} alt="PV Mahal Exterior" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">Elegant Exterior</h4>
                <p className="text-sm opacity-90">Beautiful architecture & landscaping</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-card">
              <img src={siteImages.dinning} alt="Dining Area" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-semibold">Exquisite Dining</h4>
                <p className="text-sm opacity-90">Premium setup for memorable meals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;