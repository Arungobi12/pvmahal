import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // <-- THIS LINE WAS MISSING
import { sendContactMessage } from "@/api/contactService";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactMessage(data);

      toast({
        title: "Message Sent! 🎉",
        description: "Thank you for getting in touch. We'll respond shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Wedding Street", "T. Nagar, Chennai - 600017", "Tamil Nadu, India"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@pvmahal.com", "bookings@pvmahal.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Sunday", "9:00 AM - 9:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Get in touch with us to discuss your special event
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We'd love to hear from you. Whether you have questions about our venue, want to schedule a visit, or need assistance with your booking, our team is here to help.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-none shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-primary-gold" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <Card className="border-none shadow-card bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">WhatsApp</h3>
                          <p className="text-sm text-muted-foreground">Quick responses via WhatsApp</p>
                        </div>
                      </div>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                      >
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="border-none shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name"
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your.email@example.com"
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What is this regarding?"
                                className="h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about your event or inquiry..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full h-12"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                Find Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Conveniently located in the heart of Chennai
              </p>
            </div>
            
            {/* Embedded Map Placeholder */}
            <Card className="border-none shadow-card overflow-hidden">
              <div className="bg-muted h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">Google Maps integration would be embedded here</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    View on Google Maps
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;