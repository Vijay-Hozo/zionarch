/* eslint-disable react-hooks/rules-of-hooks */
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type InternshipForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  startDate: string;
  duration: string;
  interests: string[];
  software: string;
  portfolio: string;
  resume?: string;
  motivation: string;
  mode: "onsite" | "remote";
  references?: string;
};

const CareersPage = () => {
  const form = useForm<InternshipForm>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      education: "",
      startDate: "",
      duration: "",
      interests: [],
      software: "",
      portfolio: "",
      resume: "",
      motivation: "",
      mode: "onsite",
      references: "",
    },
  });

  const onSubmit = (values: InternshipForm) => {
    const body = `Full Name: ${values.fullName}\nEmail: ${values.email}\nPhone: ${values.phone}\nCity: ${values.city}\nEducation: ${values.education}\nStart Date: ${values.startDate}\nDuration: ${values.duration}\nInterests: ${values.interests.join(", ")}\nSoftware: ${values.software}\nPortfolio: ${values.portfolio}\nResume: ${values.resume || "(not provided)"}\nMotivation: ${values.motivation}\nMode: ${values.mode}\nReferences: ${values.references || "(not provided)"}`;
    const mailto = `mailto:hr@zionarch.com?subject=${encodeURIComponent("Internship Application")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
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
              Careers at ZIONARCH
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6"
            >
              Build Spaces That Inspire Life
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground font-body text-base md:text-lg text-center max-w-3xl mx-auto"
            >
              Join our team of architects, designers, and engineers crafting meaningful, enduring environments across residential, commercial, hospitality, and institutional sectors.
            </motion.p>

            <div className="mt-8 flex justify-center">
              <Link to="/contact">
                <Button variant="default" size="lg" className="group">
                  Talk to HR
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Internship Application Form */}
        <section className="py-12 md:py-20 lg:py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">Internship Application</h2>
            <p className="text-muted-foreground font-body mb-8 max-w-2xl">
              Fill in the form below and submit your application. Alternatively, you can email your details to
              <a href="mailto:hr@zionarch.com" className="underline ml-1">hr@zionarch.com</a>.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{ required: "Full name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City */}
                    <FormField
                      control={form.control}
                      name="city"
                      rules={{ required: "Current city is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current City</FormLabel>
                          <FormControl>
                            <Input placeholder="Your city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Education */}
                    <FormField
                      control={form.control}
                      name="education"
                      rules={{ required: "Education details are required" }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Education Details</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Degree, college/university, department/major, current year/semester" rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Start Date */}
                    <FormField
                      control={form.control}
                      name="startDate"
                      rules={{ required: "Start date is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internship Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name="duration"
                      rules={{ required: "Duration is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Duration</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2 months">2 months</SelectItem>
                              <SelectItem value="3 months">3 months</SelectItem>
                              <SelectItem value="6 months">6 months</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Interests */}
                    <FormItem className="md:col-span-2">
                      <FormLabel>Area of Interest</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          "Architecture",
                          "Interior Design",
                          "Engineering",
                          "Design & Build",
                        ].map((opt) => (
                          <div key={opt} className="flex items-center gap-2">
                            <Checkbox
                              checked={form.watch("interests").includes(opt)}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("interests");
                                if (checked) form.setValue("interests", [...current, opt]);
                                else form.setValue("interests", current.filter((v) => v !== opt));
                              }}
                            />
                            <span className="text-sm">{opt}</span>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>

                    {/* Software */}
                    <FormField
                      control={form.control}
                      name="software"
                      rules={{ required: "Software skills are required" }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Software Skills</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., AutoCAD, Revit, SketchUp, Lumion, Photoshop" rows={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Portfolio */}
                    <FormField
                      control={form.control}
                      name="portfolio"
                      rules={{ required: "Portfolio link is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio Link</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Resume */}
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume/CV (URL)</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Motivation */}
                    <FormField
                      control={form.control}
                      name="motivation"
                      rules={{ required: "Motivation is required" }}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Motivation</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Why do you want to intern with ZIONARCH? What would you like to learn?" rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mode */}
                    <FormField
                      control={form.control}
                      name="mode"
                      rules={{ required: "Please select a mode" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mode of Internship</FormLabel>
                          <FormControl>
                            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="onsite" />
                                <span className="text-sm">On-site (Coimbatore)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="remote" />
                                <span className="text-sm">Remote</span>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* References */}
                    <FormField
                      control={form.control}
                      name="references"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>References / How did you hear about us?</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Faculty, alumni, social media, etc." rows={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Actions */}
                    <div className="md:col-span-2 flex items-center gap-4">
                      <Button type="submit" variant="default" size="lg" className="group">
                        Submit via Email
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Link to="/contact">
                        <Button type="button" variant="outline" size="lg">Submit via Contact Form</Button>
                      </Link>
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

export default CareersPage;
