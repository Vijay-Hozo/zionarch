import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specializations = [
  "Institutional",
  "Residential", 
  "Commercial",
  "Industrial",
  "Hospitality",
  "Interiors",
  "Health Care",
];

export function Specializations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Areas of <span className="text-primary">Specialization</span>
          </h2>
        </motion.div>

        {/* Marquee */}
        <div className="relative">
          {/* First Row */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-8 shrink-0"
            >
              {[...specializations, ...specializations].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-8 shrink-0"
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground/10 hover:text-primary/30 transition-colors duration-500 whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <span className="text-primary text-4xl">•</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Reverse */}
          <div className="flex overflow-hidden mt-4">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-8 shrink-0"
            >
              {[...specializations.reverse(), ...specializations].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-8 shrink-0"
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground/5 hover:text-primary/20 transition-colors duration-500 whitespace-nowrap cursor-default">
                    {item}
                  </span>
                  <span className="text-primary/50 text-4xl">•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
