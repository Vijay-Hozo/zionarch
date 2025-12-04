import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Architectural Design",
    description: "Feasibility Studies, Site Analysis, Space Planning, Massing, Building Approval Liaoning, Soil Testing, Site Surveying, Structural Design, HVAC design, MEP Design.",
    image: "https://zionarch.com/wp-content/uploads/2021/08/2-1.jpg",
  },
  {
    title: "Engineering - Structural & MEP",
    description: "Material Procurement, Schedule Optimization, Site Progress Report, Labour Management, Quality Assurance and Quality Control, Post Occupancy Support.",
    image: "https://zionarch.com/wp-content/uploads/2021/08/construction-mgt.jpg",
  },
  {
    title: "Interior Design",
    description: "Site Measurement, Space Planning, Furniture Layout, Mood board Presentation, Conceptual Sketches, 3D Visualization, Working Drawings.",
    image: "https://zionarch.com/wp-content/uploads/2018/08/INTERIOR.jpg",
  },
  {
    title: "Design & Build Services",
    description: "Bill of Quantity, Composite Quotations, Material Specifications, Finishes Schedule, Execution Schedule, Shop Drawings, Site Measurements.",
    image: "https://zionarch.com/wp-content/uploads/2021/08/20201222_115032.jpg",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" ref={containerRef} className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground font-body">
            Comprehensive architectural and design solutions tailored to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-xl bg-card cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-display font-bold text-primary-foreground mb-3">
                      {service.title}
                    </h3>
                    <motion.p
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-foreground/80 font-body text-sm mb-4 line-clamp-3"
                    >
                      {service.description}
                    </motion.p>
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -20,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Button variant="hero" size="sm" className="group/btn">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Service Number */}
                <div className="absolute top-6 right-6">
                  <span className="text-6xl font-display font-bold text-primary-foreground/10">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
