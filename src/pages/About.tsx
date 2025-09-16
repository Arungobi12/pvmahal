import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Star, Users } from "lucide-react";
import Navigation from "@/components/ui/navigation";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            About PV Mahal
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Creating unforgettable memories for over a decade with elegance, tradition, and modern amenities
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Established in 2010, PV Mahal has been Chennai's premier destination for life's most precious celebrations. What began as a vision to create the perfect venue for weddings has evolved into a legacy of excellence in event hosting.
                  </p>
                  <p>
                    Our founder, Mr. Prakash Venkatesh, envisioned a space where traditional values meet modern comfort. Every corner of PV Mahal reflects this philosophy - from our grand architecture to our intimate dining spaces.
                  </p>
                  <p>
                    Today, we're proud to have hosted over 1,000 successful events, each one unique and memorable in its own way. Our commitment remains unchanged: to provide an exceptional experience that exceeds expectations.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mr-4">
                        <Award className="h-6 w-6 text-primary-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Excellence Award</h3>
                        <p className="text-sm text-muted-foreground">Best Wedding Venue 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center mr-4">
                        <Heart className="h-6 w-6 text-primary-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Customer Choice</h3>
                        <p className="text-sm text-muted-foreground">Highest customer satisfaction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                Our Mission & Vision
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-elegant">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="h-8 w-8 text-primary-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide an exceptional venue experience that transforms your special occasions into lifelong memories through our dedication to service excellence, attention to detail, and unwavering commitment to quality.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-elegant">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be Chennai's most trusted and preferred event venue, known for creating magical experiences that bring families together and celebrate life's most precious moments with elegance and tradition.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-foreground">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for perfection in every detail, ensuring your event meets the highest standards.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Tradition</h3>
                <p className="text-muted-foreground">
                  Honoring cultural values while embracing modern comforts and contemporary needs.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Service</h3>
                <p className="text-muted-foreground">
                  Our dedicated team goes above and beyond to make your celebration truly special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;