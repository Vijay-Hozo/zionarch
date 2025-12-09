import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={containerRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="overflow-hidden rounded-lg"
              >
                <img
                  src="https://zionarch.com/wp-content/uploads/2018/08/AREA-OF-SPECIALIZATION1.jpg"
                  alt="ZIONARCH Architecture"
                  className="w-full h-[500px] object-cover"
                />
              </motion.div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-lg shadow-2xl"
              >
                <div className="text-5xl font-display font-bold">15+</div>
                <div className="text-sm font-body tracking-wide opacity-90">Years Experience</div>
              </motion.div>

              {/* Decorative Line */}
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -left-4 top-0 w-1 bg-primary"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block"
            >
              About ZIONARCH
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight"
            >
              Designing Spaces That
              <span className="text-primary block">Inspire Life</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-muted-foreground text-lg mb-6 font-body leading-relaxed"
            >
              ZIONARCH is a collaboration of innovative design individuals from diverse 
              disciplines forming a highly capable design team. We offer a complete range 
              of design solutions for commercial, institutional, hospitality, healthcare, 
              industrial and residential spaces.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-muted-foreground mb-8 font-body"
            >
              We believe that a residential, institutional, or corporate design involves 
              not just layouts and arrangement of furniture but also the need for a design 
              which yields Positive Energy and leads to a prosperous Lifestyle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="default" size="lg" className="group">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="#team">
                <Button variant="outline" size="lg">
                  Our Team
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
