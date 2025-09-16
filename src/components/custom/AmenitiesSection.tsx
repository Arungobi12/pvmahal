import { Card, CardContent } from "@/components/ui/card";
import { AirVent, Car, UtensilsCrossed, Users, Sun, Camera } from 'lucide-react';

const amenities = [
    { icon: AirVent, title: "Fully Air-Conditioned Hall", description: "Grand hall with centralized A/C for complete comfort." },
    { icon: Users, title: "Large Capacity", description: "Seating for up to 500 guests and floating capacity of 1000." },
    { icon: UtensilsCrossed, title: "Spacious Dining Area", description: "Separate dining hall with seating for 200 guests per batch." },
    { icon: Car, title: "Ample Car Parking", description: "Dedicated parking space available for over 100 cars." },
    { icon: Sun, title: "Power Backup", description: "Full generator backup to ensure your event runs smoothly." },
    { icon: Camera, title: "Modern Facilities", description: "Equipped with modern lighting and audio-visual systems." },
];

const AmenitiesSection = () => {
    return (
        <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Amenities</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need for a perfect and seamless event.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {amenities.map((amenity, index) => (
                        <Card key={index} className="border-none shadow-card">
                            <CardContent className="p-6 flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <amenity.icon className="h-6 w-6 text-primary-gold" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{amenity.title}</h3>
                                    <p className="text-muted-foreground">{amenity.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AmenitiesSection;