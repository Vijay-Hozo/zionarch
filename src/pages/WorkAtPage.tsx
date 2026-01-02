import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type WorkApplicationForm = {
  fullName: string;
  email: string;
  institution: string;
  yearOfGraduation: string;
  additionalQualifications: string;
  previousWorkExperience: string;
  portfolioLink: string;
  otherAttachments?: string;
};

const WorkAtPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<WorkApplicationForm>({
    defaultValues: {
      fullName: "",
      email: "",
      institution: "",
      yearOfGraduation: "",
      additionalQualifications: "",
      previousWorkExperience: "",
      portfolioLink: "",
      otherAttachments: "",
    },
  });

  const onSubmit = async (values: WorkApplicationForm) => {
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/work-application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setIsSubmitting(false);

      toast({
        title: "Application Submitted!",
        description:
          "We have received your application. Check your email for confirmation.",
      });

      form.reset();
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 py-16 md:py-24 lg:py-28">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block text-center"
            >
              Work With Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6"
            >
              Join Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground font-body text-base md:text-lg text-center max-w-3xl mx-auto"
            >
              We're always on the lookout for talented people who can join us. Apply for a position at ZIONARCH and help us build spaces that inspire life.
            </motion.p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 md:py-20 lg:py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">Apply for a Position</h2>
            <p className="text-muted-foreground font-body mb-8 max-w-2xl">
              Fill in the form below to apply for a position at ZIONARCH.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Institution */}
                <FormField
                  control={form.control}
                  name="institution"
                  rules={{ required: "Institution is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute of Architecture *</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of your institute" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year of Graduation */}
                <FormField
                  control={form.control}
                  name="yearOfGraduation"
                  rules={{ required: "Year of graduation is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Graduation *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Qualifications */}
                <FormField
                  control={form.control}
                  name="additionalQualifications"
                  rules={{ required: "Additional qualifications are required" }}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Additional Qualifications *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Masters, Summer Courses, Workshops attended (Course, Institute, Year)" 
                          rows={3} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Previous Work Experience */}
                <FormField
                  control={form.control}
                  name="previousWorkExperience"
                  rules={{ required: "Work experience is required" }}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Previous Work Experience *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Firm name and duration worked" 
                          rows={3} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Portfolio Link */}
                <FormField
                  control={form.control}
                  name="portfolioLink"
                  rules={{ required: "Portfolio link is required" }}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Online Portfolio Link *</FormLabel>
                      <FormControl>
                        <Input 
                          type="url" 
                          placeholder="https://your-portfolio.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other Attachments */}
                <FormField
                  control={form.control}
                  name="otherAttachments"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Other Attachments (Links)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Recommendation letters or other documents (provide links)" 
                          rows={2} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    className="group w-full md:w-auto"
                    disabled={isSubmitting}
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
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WorkAtPage;
