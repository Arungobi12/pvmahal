// src/components/ui/booking-form.tsx

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO, isSameDay } from "date-fns";
import { CalendarIcon, Users, Clock, Heart, ArrowLeft, Minus, Plus, Music, Sparkles } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createBooking, getBlockedDates, type BlockedDate } from "@/api/bookingService";
import { siteImages } from "@/assets/images";

const bookingSchema = z.object({
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  guestCount: z.coerce.number().min(10, "Minimum 10 guests required."),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const steps = [
  { id: 'Event Details', fields: ['eventType', 'eventDate', 'timeSlot', 'guestCount'] },
  { id: 'Contact Information', fields: ['name', 'email', 'phone', 'specialRequests'] },
];

// UPDATED: Added all the event types you requested
const eventTypes = [
  { value: "anniversary", label: "Anniversary", icon: Heart },
  { value: "wedding", label: "Wedding", icon: Heart },
  { value: "engagement", label: "Engagement", icon: Heart },
  { value: "birthday", label: "Birthday Party", icon: Users },
  { value: "corporate", label: "Corporate Event", icon: Users },
  { value: "dj-party", label: "DJ Party", icon: Music },
  { value: "other", label: "Other", icon: Sparkles },
];

const timeSlots = [
  { value: "morning", label: "Morning (9 AM - 1 PM)" },
  { value: "afternoon", label: "Afternoon (2 PM - 6 PM)" },
  { value: "evening", label: "Evening (7 PM - 11 PM)" },
];

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      specialRequests: "",
      eventType: "wedding",
      guestCount: 50,
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    // Fetch blocked dates when component mounts
    const fetchBlockedDates = async () => {
      try {
        const dates = await getBlockedDates();
        setBlockedDates(dates);
      } catch (error) {
        // Silently fail if not connected to backend
        console.log("Could not fetch blocked dates:", error);
      }
    };
    
    fetchBlockedDates();
  }, []);

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blocked => 
      isSameDay(parseISO(blocked.date), date)
    );
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as (keyof BookingFormData)[], { shouldFocus: true });
    if (!output) return;
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking(data);
      toast.success("Submission Received!", {
        description: "Your submission has been received. We will get back to you soon.",
        position: "bottom-right",
      });
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Book Your Special Day
          </h1>
          <p className="text-lg text-muted-foreground">
            Let us help you create unforgettable memories at PV Mahal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Side - Image */}
          <div className="hidden lg:block lg:col-span-2">
            <img 
              src={siteImages.stage1} 
              alt="Beautifully decorated stage at PV Mahal"
              className="rounded-xl shadow-elegant w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-elegant border-none">
              <CardHeader>
                <p className="text-sm font-semibold text-primary-gold tracking-wider">
                  STEP {currentStep + 1} OF {steps.length}
                </p>
                <CardTitle className="text-2xl font-serif">{steps[currentStep].id}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* STEP 1: EVENT DETAILS */}
                    <div className={cn(currentStep !== 0 && "hidden", "space-y-8")}>
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">What is the occasion?</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                              {eventTypes.map((type) => (
                                <Card 
                                  key={type.value}
                                  className={cn(
                                    "cursor-pointer transition-all",
                                    field.value === type.value 
                                      ? "border-primary-gold ring-2 ring-primary-gold shadow-glow" 
                                      : "hover:border-muted-foreground/50"
                                  )}
                                  onClick={() => field.onChange(type.value)}
                                >
                                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                                    <type.icon className="h-8 w-8 text-primary-gold" />
                                    <span className="font-semibold text-sm">{type.label}</span>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-lg font-medium">Event Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "h-12 pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01") || isDateBlocked(date)
                                    }
                                    modifiers={{
                                      blocked: (date) => isDateBlocked(date)
                                    }}
                                    modifiersStyles={{
                                      blocked: { 
                                        backgroundColor: '#fee2e2', 
                                        color: '#dc2626',
                                        textDecoration: 'line-through'
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeSlot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-medium">Time Slot</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select time slot" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot.value} value={slot.value}>
                                      <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {slot.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="guestCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Estimated Number of Guests</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" size="icon" className="h-12 w-12" onClick={() => field.onChange(Math.max(10, field.value - 10))}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input type="number" className="h-12 text-center text-lg font-bold" {...field} />
                                <Button type="button" variant="outline" size="icon" className="h-12 w-12" onClick={() => field.onChange(field.value + 10)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* STEP 2: CONTACT INFORMATION */}
                    <div className={cn(currentStep !== 1 && "hidden", "space-y-8")}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="text-lg font-medium">Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" className="h-12" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel className="text-lg font-medium">Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+91 98765 43210" className="h-12" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel className="text-lg font-medium">Email Address</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" className="h-12" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="specialRequests" render={({ field }) => (<FormItem><FormLabel className="text-lg font-medium">Special Requests (Optional)</FormLabel><FormControl><Textarea placeholder="Any special arrangements or requirements..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>

                    {/* NAVIGATION BUTTONS */}
                    <div className="flex pt-4 gap-4 justify-end">
                      {currentStep > 0 && (
                        <Button type="button" variant="outline" size="lg" className="h-12" onClick={handlePrev}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                      )}
                      {currentStep < steps.length - 1 && (
                        <Button type="button" size="lg" className="h-12" onClick={handleNext}>
                          Next Step
                        </Button>
                      )}
                      {currentStep === steps.length - 1 && (
                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 text-lg font-medium">
                          {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
