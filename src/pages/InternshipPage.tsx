/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type UploadFile = {
  name: string;
  type: string;
  dataUrl: string;
};

type InternshipApplicationForm = {
  fullName: string;
  email: string;
  contactNumber: string;
  qualification: string;
  portfolioLink: string;
  cvFile: File | null;
};

const fileToUpload = (file: File): Promise<UploadFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        dataUrl: reader.result as string,
      });
    };

    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
};

const InternshipPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const form = useForm<InternshipApplicationForm>({
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      qualification: "",
      portfolioLink: "",
      cvFile: null,
    },
  });

  const onSubmit = async (values: InternshipApplicationForm) => {
    setIsSubmitting(true);

    try {
      const cvFile = values.cvFile ? await fileToUpload(values.cvFile) : null;

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/internship-application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          contactNumber: values.contactNumber,
          qualification: values.qualification,
          portfolioLink: values.portfolioLink,
          cvFile,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setIsSubmitting(false);

      toast({
        title: "Application Submitted!",
        description:
          "We have received your internship application. Check your email for confirmation.",
      });

      form.reset({
        fullName: "",
        email: "",
        contactNumber: "",
        qualification: "",
        portfolioLink: "",
        cvFile: null,
      });
      setFileInputKey((current) => current + 1);
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
              Internship Program
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6"
            >
              Apply for Your Internship
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground font-body text-base md:text-lg text-center max-w-3xl mx-auto"
            >
              Join ZIONARCH for an enriching internship experience. Learn from industry professionals and build spaces that inspire life.
            </motion.p>
          </div>
        </section>

        {/* Internship Application Form */}
        <section className="py-12 md:py-20 lg:py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">Internship Application</h2>
            <p className="text-muted-foreground font-body mb-8 max-w-2xl">
              Fill in the form below to apply for a careers internship at ZIONARCH.
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

                {/* Contact Number */}
                <FormField
                  control={form.control}
                  name="contactNumber"
                  rules={{ required: "Contact number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Qualification */}
                <FormField
                  control={form.control}
                  name="qualification"
                  rules={{ required: "Qualification is required" }}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Qualification *</FormLabel>
                      <FormControl>
                        <Input placeholder="B.Arch, M.Arch, Diploma, or equivalent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* CV Upload */}
                <FormField
                  control={form.control}
                  name="cvFile"
                  rules={{ required: "CV upload is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload CV *</FormLabel>
                      <FormControl>
                        <Input
                          key={`cv-${fileInputKey}`}
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            field.onChange(file);
                          }}
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
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Online Portfolio Link</FormLabel>
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

                {/* <div className="md:col-span-2 rounded-lg border border-dashed border-border bg-background/50 p-4 text-sm text-muted-foreground font-body">
                  Photo and CV are required. If you are applying for an architectural role, include your portfolio link to strengthen the application.
                </div> */}

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

export default InternshipPage;
