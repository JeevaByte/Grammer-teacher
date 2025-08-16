import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { insertLessonSchema, type InsertLesson } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
  "7:00 PM",
];

const lessonTypes = [
  { value: "private", label: "Private Lesson (1-on-1)", price: 45 },
  { value: "group", label: "Group Lesson (2-6 students)", price: 25 },
  { value: "intensive", label: "Intensive Session", price: 70 },
];

const focusAreas = [
  "General Grammar",
  "Tenses",
  "Articles",
  "Conditionals",
  "Passive Voice",
  "Other (specify in notes)",
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { user, getAuthHeaders } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertLessonSchema.omit({ studentId: true, teacherId: true, scheduledAt: true })),
    defaultValues: {
      title: "",
      description: "",
      type: "private",
      focusArea: "General Grammar",
      duration: 60,
      price: 4500, // in cents
      notes: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!selectedDate || !selectedTime) {
        throw new Error("Please select date and time");
      }

      // Create scheduled date/time
      const [time, period] = selectedTime.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const scheduledAt = new Date(selectedDate);
      scheduledAt.setHours(hour, parseInt(minutes || "0"), 0, 0);

      const lessonData = {
        ...data,
        teacherId: "teacher-id", // In real app, this would come from teacher selection
        scheduledAt: scheduledAt.toISOString(),
      };

      const response = await apiRequest("POST", "/api/lessons", lessonData, getAuthHeaders());
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Lesson booked!",
        description: "Your lesson has been successfully booked. You will receive a confirmation email shortly.",
      });
      onClose();
      form.reset();
      setSelectedDate(undefined);
      setSelectedTime("");
    },
    onError: (error: any) => {
      toast({
        title: "Booking failed",
        description: error.message || "Failed to book lesson",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    onClose();
    form.reset();
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const selectedLessonType = lessonTypes.find(type => type.value === form.watch("type"));
  const price = selectedLessonType?.price || 45;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle data-testid="booking-title">Book a Lesson</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              data-testid="close-booking-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
            <div className="bg-muted rounded-xl p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                className="rounded-md border"
                data-testid="booking-calendar"
              />
              
              {selectedDate && (
                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3">
                    Available Times ({selectedDate.toLocaleDateString()})
                  </h5>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        data-testid={`time-slot-${time.replace(/[:\s]/g, "").toLowerCase()}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lesson Details</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => bookingMutation.mutate(data))}
                className="space-y-6"
                data-testid="booking-form"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="booking-type">
                            <SelectValue placeholder="Select lesson type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lessonTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="focusArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Focus Area</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="booking-focus">
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {focusAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific topics you'd like to focus on or questions you have..."
                          rows={3}
                          {...field}
                          data-testid="booking-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Booking Summary */}
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {selectedDate ? selectedDate.toLocaleDateString() : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">
                        {selectedTime ? `${selectedTime} - ${new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">60 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{selectedLessonType?.label}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-3">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-primary">${price}.00</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={bookingMutation.isPending || !selectedDate || !selectedTime}
                  data-testid="confirm-booking"
                >
                  {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
