import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["New No.13, Old No.16, II Floor,", "Venkateswara Nagar Main Road,", "Adyar, Chennai - 600020"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 44 2446 5454", "+91 98400 65454"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@zionarch.com", "design@zionarch.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"],
  },
];

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message received! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={containerRef} className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Let's Build Your <span className="text-primary">Dream</span> Together
            </h2>
            <p className="text-muted-foreground font-body mb-12 text-lg">
              Ready to start your project? Contact us today for a free consultation 
              and quote. Our team is here to bring your architectural vision to life.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold mb-2">{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground font-body text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card p-8 lg:p-10 rounded-2xl shadow-xl border border-border/50">
              <h3 className="text-2xl font-display font-bold mb-8">Send Us a Message</h3>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-body font-medium mb-2">Your Name</label>
                  <Input 
                    type="text" 
                    name="name"
                    placeholder="John Doe" 
                    required 
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium mb-2">Email Address</label>
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com" 
                    required 
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-body font-medium mb-2">Phone Number</label>
                  <Input 
                    type="tel" 
                    name="phone"
                    placeholder="+91 98400 00000" 
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium mb-2">Project Type</label>
                  <Input 
                    type="text" 
                    name="projectType"
                    placeholder="Residential / Commercial" 
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-body font-medium mb-2">Your Message</label>
                <Textarea 
                  name="message"
                  placeholder="Tell us about your project..." 
                  rows={5}
                  required
                  className="bg-background resize-none"
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
