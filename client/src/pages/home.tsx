import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AuthModal } from "@/components/auth-modal";
import { BookingModal } from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  GraduationCap,
  Users,
  Laptop,
  Star,
  CheckCircle,
  Award,
  Heart,
  Tag,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  FileText,
  Play,
  Edit,
  Download,
} from "lucide-react";

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: resources } = useQuery({
    queryKey: ["/api/resources"],
  });

  const contactForm = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      contactForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const openBooking = () => {
    if (!isAuthenticated) {
      openAuth("login");
      return;
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Master English Grammar with{" "}
                <span className="text-primary-600">Expert Guidance</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                Join thousands of students improving their English grammar through personalized
                lessons, interactive quizzes, and expert tutoring. Start your journey to perfect
                grammar today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => openAuth("register")}
                  data-testid="hero-signup"
                  className="text-lg px-8 py-4"
                >
                  Start Learning Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openBooking}
                  data-testid="hero-book-lesson"
                  className="text-lg px-8 py-4"
                >
                  Book a Lesson
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="text-success-500 mr-2 h-4 w-4" />
                  <span>Free trial available</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-success-500 mr-2 h-4 w-4" />
                  <span>10,000+ students</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-warning-500 mr-2 h-4 w-4" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Students learning English grammar in a modern classroom setting"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Comprehensive Grammar Learning Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of learning options designed to fit your schedule, learning
              style, and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="text-primary-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Private Lessons</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                One-on-one personalized grammar coaching tailored to your specific needs and
                learning pace.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Customized lesson plans
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Flexible scheduling
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Direct teacher feedback
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Progress tracking
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={openBooking}
                data-testid="book-private-lesson"
              >
                Book Now
              </Button>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-success-500/10 rounded-full flex items-center justify-center mb-6">
                <Users className="text-success-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Group Classes</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Interactive group sessions where you learn alongside peers and benefit from
                collaborative learning.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Small class sizes (max 6)
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Peer interaction
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Cost-effective
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Regular schedule
                </li>
              </ul>
              <Button
                className="w-full bg-success-600 hover:bg-success-700"
                onClick={openBooking}
                data-testid="join-group-class"
              >
                Join Class
              </Button>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-warning-500/10 rounded-full flex items-center justify-center mb-6">
                <Laptop className="text-warning-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Online Tutoring</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Self-paced online learning with interactive quizzes, videos, and comprehensive
                grammar resources.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  24/7 platform access
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Interactive quizzes
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Video tutorials
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="text-success-500 mr-3 h-4 w-4" />
                  Progress analytics
                </li>
              </ul>
              <Link href="/dashboard">
                <Button
                  className="w-full bg-warning-600 hover:bg-warning-700"
                  data-testid="start-online-learning"
                >
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
                alt="Professional English grammar teacher in classroom"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Meet Your Grammar Expert
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                With over 15 years of experience teaching English grammar, I'm passionate about
                helping students master the intricacies of the English language through
                personalized, engaging instruction.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Tag className="text-primary-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Expert Qualifications
                    </h3>
                    <p className="text-muted-foreground">
                      MA in English Literature, TESOL Certified, Cambridge Assessment Examiner
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-success-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Award className="text-success-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Proven Results</h3>
                    <p className="text-muted-foreground">
                      98% student satisfaction rate, 95% pass rate on standardized exams
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-warning-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Heart className="text-warning-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Teaching Philosophy
                    </h3>
                    <p className="text-muted-foreground">
                      Making grammar accessible, engaging, and relevant to real-world communication
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={openBooking} data-testid="book-consultation">
                  Book a Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-testid="get-in-touch"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Grammar Learning Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our comprehensive collection of grammar guides, exercises, and reference
              materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources?.slice(0, 3).map((resource: any) => (
              <div
                key={resource.id}
                className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={
                    resource.type === "video"
                      ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                      : resource.type === "worksheet"
                      ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  }
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        resource.type === "pdf"
                          ? "bg-primary/10 text-primary-600"
                          : resource.type === "video"
                          ? "bg-warning-500/10 text-warning-600"
                          : "bg-success-500/10 text-success-600"
                      }`}
                    >
                      {resource.type === "pdf"
                        ? "Grammar Guide"
                        : resource.type === "video"
                        ? "Video Lesson"
                        : "Worksheet"}
                    </span>
                    <span
                      className={`font-medium text-sm ${
                        resource.isPremium ? "text-primary-600" : "text-success-600"
                      }`}
                    >
                      {resource.isPremium ? "Premium" : "Free"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {resource.type === "pdf" ? (
                        <FileText className="mr-2 h-4 w-4" />
                      ) : resource.type === "video" ? (
                        <Play className="mr-2 h-4 w-4" />
                      ) : (
                        <Edit className="mr-2 h-4 w-4" />
                      )}
                      <span>
                        {resource.type === "video"
                          ? `${Math.round(resource.duration / 60)} minutes`
                          : resource.type === "worksheet"
                          ? "50 exercises"
                          : "24 pages"}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className={
                        resource.type === "video"
                          ? "bg-warning-600 hover:bg-warning-700"
                          : resource.type === "worksheet"
                          ? "bg-success-600 hover:bg-success-700"
                          : ""
                      }
                      data-testid={`resource-${resource.type}`}
                    >
                      {resource.type === "video" ? "Watch" : "Download"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Have questions about our grammar courses? Ready to start your learning journey?
                Contact us today!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-primary-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@grammarmaster.com</p>
                    <p className="text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-success-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-success-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-warning-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="text-warning-600 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Available on our platform</p>
                    <p className="text-muted-foreground">Instant support for students</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-card rounded-2xl shadow-lg p-8">
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit((data) => contactMutation.mutate(data))}
                    className="space-y-6"
                    data-testid="contact-form"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={contactForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} data-testid="contact-firstname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} data-testid="contact-lastname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              data-testid="contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="contact-subject">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                              <SelectItem value="Course Information">Course Information</SelectItem>
                              <SelectItem value="Technical Support">Technical Support</SelectItem>
                              <SelectItem value="Billing Question">Billing Question</SelectItem>
                              <SelectItem value="Partnership Opportunity">
                                Partnership Opportunity
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you..."
                              rows={5}
                              {...field}
                              data-testid="contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="contact-submit"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <GraduationCap className="text-primary-600 h-8 w-8 mr-3" />
                <span className="text-xl font-bold text-foreground">Grammar Master</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Empowering students to master English grammar through expert instruction,
                interactive learning, and personalized feedback. Join our community of successful
                learners today.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © 2024 Grammar Master. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm mt-4 md:mt-0">
                Built with ❤️ for English learners worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
