import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Full-service architects offer a very wide range of client services",
  "Many clients choose the full range of services for optimal peace of mind",
  "Assist with every stage of the design and build process",
  "From concept through building code plans and approvals",
  "Cost estimating and construction observation included",
];

export function FullService() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 -translate-y-1/2 -right-64 w-[800px] h-[800px] rounded-full border-[40px] border-primary pointer-events-none"
      />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src="https://res.cloudinary.com/dfrlskgto/image/upload/v1765882491/ONE_STOP_SOLUTION_dekecr.jpg"
                  alt="Full Service Architecture"
                  className="w-full object-cover"
                />
              </motion.div>

              {/* Overlay Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-foreground text-background p-8 rounded-2xl shadow-2xl max-w-xs"
              >
                <div className="text-5xl font-display font-bold text-primary mb-2">One-Stop</div>
                <div className="text-xl font-display">Solution for All Your Needs</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
              Complete Solutions
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              Full Service <span className="text-primary">Architects</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-8">
              These services are designed to make your project as efficient and successful 
              as possible by addressing challenges, eliminating errors and checking quality 
              at every stage of the building process.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80 font-body">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" className="group">
                Get to Know Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Get a Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
