import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const showcaseImages = [
  {
    image: "https://zionarch.com/wp-content/uploads/2018/08/Days-Hotel-1.jpg",
    title: "Hospitality",
  },
  {
    image: "https://zionarch.com/wp-content/uploads/2021/08/FEATURE-IMAGE.png",
    title: "Residential",
  },
  {
    image: "https://zionarch.com/wp-content/uploads/2022/09/FEATURE-IMAGE-1.jpg",
    title: "Institutional",
  },
  {
    image: "https://zionarch.com/wp-content/uploads/2021/08/feature-image-8-scaled.jpg",
    title: "Commercial",
  },
];

export function PortfolioPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-primary/5 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-body text-sm tracking-[0.2em] uppercase mb-6"
          >
            Our Work
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-primary mx-auto"
          />
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[3/4]"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Hover Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
              >
                <span className="text-background font-display font-semibold text-sm md:text-lg">
                  {item.title}
                </span>
              </motion.div>

              {/* Animated Border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link to="/portfolio">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button variant="hero" size="xl" className="group">
                <span className="flex items-center gap-2">
                  Explore All Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
