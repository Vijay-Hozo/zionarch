import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Architectural Design",
    description: "Feasibility Studies, Site Analysis, Space Planning, Massing, Building Approval Liaoning, Soil Testing, Site Surveying, Structural Design, HVAC design, MEP Design.",
    image: "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642107/MAIN-CHRYSALIS_MWC__4-Photo-1024x576_bxmfct.jpg",
    size: "large", // Takes 2 columns
  },
  {
    title: "Engineering",
    description: "Material Procurement, Schedule Optimization, Site Progress Report, Labour Management, Quality Assurance and Quality Control, Post Occupancy Support.",
    image: "https://zionarch.com/wp-content/uploads/2021/08/construction-mgt.jpg",
    size: "medium", // Takes 1 column, taller
  },
  
  {
    title: "Design & Build",
    description: "Bill of Quantity, Composite Quotations, Material Specifications, Finishes Schedule, Execution Schedule, Shop Drawings, Site Measurements.",
    image: "https://zionarch.com/wp-content/uploads/2021/08/20201222_115032.jpg",
    size: "small", // Takes 1 column
  },
  {
    title: "Interior Design",
    description: "Site Measurement, Space Planning, Furniture Layout, Mood board Presentation, Conceptual Sketches, 3D Visualization, Working Drawings.",
    image: "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642037/3_rc2smp.jpg",
    size: "wide", // Takes 2 columns
  },
];

function ServiceCard({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (service.size) {
      case "large":
        return "md:col-span-2 md:row-span-2 h-[400px] md:h-[500px]";
      case "medium":
        return "md:col-span-1 md:row-span-2 h-[300px] md:h-[500px]";
      case "wide":
        return "md:col-span-2 h-[250px] md:h-[280px]";
      default:
        return "md:col-span-1 h-[250px] md:h-[240px]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getSizeClasses()}`}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
        animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        {/* Title - Always visible */}
        <motion.h3
          className="text-xl md:text-2xl font-display font-bold text-foreground mb-2"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-primary">—</span> {service.title}
        </motion.h3>

        {/* Description - Revealed on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <p className="text-foreground/70 font-body text-sm leading-relaxed mt-2">
            {service.description}
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "60px" : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-0.5 bg-primary mt-4"
          />
        </motion.div>
      </div>

      {/* Border Highlight on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
