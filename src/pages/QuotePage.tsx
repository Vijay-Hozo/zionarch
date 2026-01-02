/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  Home,
  Hotel,
  Church,
  GraduationCap,
  Factory,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

const projectTypes = [
  {
    id: "residential",
    label: "Residential Project",
    icon: Home,
    description: "Homes, Villas, Apartments",
  },
  {
    id: "commercial",
    label: "Commercial Project",
    icon: Building2,
    description: "Offices, Retail Spaces, Showrooms",
  },
  {
    id: "hospitality",
    label: "Hospitality Project",
    icon: Hotel,
    description: "Hotels, Resorts, Restaurants",
  },
  {
    id: "religious",
    label: "Religious Project",
    icon: Church,
    description: "Temples, Churches, Mosques",
  },
  {
    id: "institutional",
    label: "Institutional Project",
    icon: GraduationCap,
    description: "Schools, Colleges, Hospitals",
  },
  {
    id: "industrial",
    label: "Industrial Project",
    icon: Factory,
    description: "Factories, Warehouses, Plants",
  },
];

const steps = [
  { id: 1, title: "Project Type", description: "Select your project category" },
  { id: 2, title: "Personal Info", description: "Tell us about yourself" },
  { id: 3, title: "Project Details", description: "Describe your project" },
  { id: 4, title: "Review", description: "Confirm your request" },
];

const QuotePage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    plotSize: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const handleProjectTypeSelect = (type: string) => {
    setFormData({ ...formData, projectType: type });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.projectType) {
      toast({ title: "Please select a project type", variant: "destructive" });
      return;
    }
    if (
      currentStep === 2 &&
      (!formData.name || !formData.email || !formData.phone)
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Call the backend API to send quote email
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectType: formData.projectType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          plotSize: formData.plotSize,
          budget: formData.budget,
          timeline: formData.timeline,
          description: formData.description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send quote email");
      }

      setIsSubmitting(false);

      toast({
        title: "Quote Sent Successfully!",
        description:
          "We have received your quote request. Check your email for confirmation.",
      });

      // Optional: Also open WhatsApp with the summary for additional contact
      const summary = `Quote Request:\nProject Type: ${
        formData.projectType || "-"
      }\nName: ${formData.name || "-"}\nEmail: ${formData.email || "-"}\nPhone: ${
        formData.phone || "-"
      }\nLocation: ${formData.location || "-"}\nPlot Size: ${
        formData.plotSize || "-"
      }\nBudget: ${formData.budget || "-"}\nTimeline: ${
        formData.timeline || "-"
      }\nDescription: ${formData.description || "-"}`;

      const waUrl = `https://wa.me/918838725310?text=${encodeURIComponent(
        summary
      )}`;

      // Optional: Uncomment to open WhatsApp automatically
      // window.open(waUrl, "_blank");

      // Reset form
      setFormData({
        projectType: "",
        name: "",
        email: "",
        phone: "",
        location: "",
        plotSize: "",
        budget: "",
        timeline: "",
        description: "",
      });
      setCurrentStep(1);
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Error submitting quote:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedProjectType = projectTypes.find(
    (p) => p.id === formData.projectType
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 border border-primary/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-60 h-60 border border-primary/10 rounded-full"
            />
          </div>

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-body text-sm tracking-[0.2em] uppercase mb-6"
              >
                Get Started
              </motion.span>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-foreground">
                Get a <span className="text-primary">Quote</span>
              </h1>
              <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
                Tell us about your project and we'll provide you with a detailed
                quote within 24 hours.
              </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <div className="flex items-center gap-4 md:gap-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: currentStep === step.id ? 1.1 : 1,
                          backgroundColor:
                            currentStep >= step.id
                              ? "hsl(var(--primary))"
                              : "hsl(var(--muted))",
                        }}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-display font-bold transition-all duration-300 ${
                          currentStep >= step.id
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </motion.div>
                      <p className="text-xs md:text-sm font-body mt-2 text-muted-foreground hidden md:block">
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 md:w-16 h-px bg-border mx-2 md:mx-4">
                        <motion.div
                          animate={{
                            width: currentStep > step.id ? "100%" : "0%",
                          }}
                          className="h-full bg-primary"
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
                <AnimatePresence mode="wait">
                  {/* Step 1: Project Type */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-2 text-foreground">
                        What type of project are you planning?
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Select the category that best describes your project
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <motion.button
                              key={type.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleProjectTypeSelect(type.id)}
                              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                                formData.projectType === type.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50 bg-background"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                                  formData.projectType === type.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                }`}
                              >
                                <Icon className="w-6 h-6" />
                              </div>
                              <h3 className="font-display font-semibold text-foreground mb-1">
                                {type.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {type.description}
                              </p>
                              {formData.projectType === type.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                                >
                                  <Check className="w-4 h-4 text-primary-foreground" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Personal Info */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-2 text-foreground">
                        Tell us about yourself
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        We'll use this information to get in touch with you
                      </p>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              Full Name *
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary" />
                              Email Address *
                            </label>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground flex items-center gap-2">
                              <Phone className="w-4 h-4 text-primary" />
                              Phone Number *
                            </label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              Project Location
                            </label>
                            <Input
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              placeholder="City, State"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Project Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-2 text-foreground">
                        Project Details
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Help us understand your project requirements better
                      </p>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground">
                              Plot Size (sq.ft)
                            </label>
                            <Input
                              name="plotSize"
                              value={formData.plotSize}
                              onChange={handleInputChange}
                              placeholder="e.g., 2400"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground">
                              Budget Range
                            </label>
                            <Input
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              placeholder="e.g., 50L - 1Cr"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-body text-foreground">
                              Expected Timeline
                            </label>
                            <Input
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleInputChange}
                              placeholder="e.g., 12-18 months"
                              className="h-12 bg-background border-border"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-body text-foreground flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Project Description
                          </label>
                          <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Tell us more about your vision, requirements, and any specific features you'd like..."
                            className="min-h-[150px] bg-background border-border resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-display font-bold mb-2 text-foreground">
                        Review Your Request
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Please review your information before submitting
                      </p>

                      <div className="space-y-6">
                        {/* Project Type */}
                        <div className="p-6 bg-background rounded-2xl border border-border">
                          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
                            Project Type
                          </h3>
                          {selectedProjectType && (
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <selectedProjectType.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-display font-semibold text-foreground">
                                  {selectedProjectType.label}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedProjectType.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contact Info */}
                        <div className="p-6 bg-background rounded-2xl border border-border">
                          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
                            Contact Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Name
                              </p>
                              <p className="font-body text-foreground">
                                {formData.name || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Email
                              </p>
                              <p className="font-body text-foreground">
                                {formData.email || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Phone
                              </p>
                              <p className="font-body text-foreground">
                                {formData.phone || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Location
                              </p>
                              <p className="font-body text-foreground">
                                {formData.location || "-"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-6 bg-background rounded-2xl border border-border">
                          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
                            Project Details
                          </h3>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Plot Size
                              </p>
                              <p className="font-body text-foreground">
                                {formData.plotSize || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Budget
                              </p>
                              <p className="font-body text-foreground">
                                {formData.budget || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Timeline
                              </p>
                              <p className="font-body text-foreground">
                                {formData.timeline || "-"}
                              </p>
                            </div>
                          </div>
                          {formData.description && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Description
                              </p>
                              <p className="font-body text-foreground text-sm">
                                {formData.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button variant="hero" onClick={nextStep} className="gap-2">
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default QuotePage;
