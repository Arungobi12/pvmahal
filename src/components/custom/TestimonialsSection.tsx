import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "PV Mahal was the perfect venue for our dream wedding. The staff was incredibly supportive, and the hall itself is breathtaking. Highly recommended!",
    name: "Priya & Rohan S.",
    event: "Wedding Reception",
  },
  {
    quote: "We hosted our corporate event here, and it was a massive success. The facilities are top-notch, and the team handled everything professionally.",
    name: "Anjali Mehta",
    event: "Corporate Gala",
  },
  {
    quote: "The best place in Chennai for a traditional engagement ceremony. The ambiance is beautiful, and the food was exceptional. Our guests loved it.",
    name: "The Kumar Family",
    event: "Engagement Ceremony",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Words From Our Happy Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what families and companies are saying about their experiences at PV Mahal.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-card text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary-gold fill-primary-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-primary-gold">{testimonial.event}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;