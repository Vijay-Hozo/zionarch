import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Days Star Hotel",
    location: "Padur, Chennai",
    category: "Hospitality",
    year: "2018",
    area: "45,000 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2018/08/Days-Hotel-1.jpg",
    description: "A contemporary hotel design featuring modern amenities and elegant interiors."
  },
  {
    title: "Endee Villas",
    location: "Neelangarai, Chennai",
    category: "Residential",
    year: "2018",
    area: "12,000 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2018/08/villa.jpg",
    description: "Luxurious gated community with premium residential villas."
  },
  {
    title: "Mr. Ganesh's Residence",
    location: "Coimbatore",
    category: "Residential",
    year: "2018",
    area: "8,500 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2018/11/FEATURE-IMAGE.jpg",
    description: "A modern family residence blending contemporary design with traditional elements."
  },
  {
    title: "Hotel Librans",
    location: "Akkarai, Chennai",
    category: "Hospitality",
    year: "2019",
    area: "32,000 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2019/10/0202020.jpg",
    description: "Boutique hotel with sophisticated architecture and premium facilities."
  },
  {
    title: "Holiday Home",
    location: "Mahabalipuram",
    category: "Residential",
    year: "2021",
    area: "6,200 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2021/08/FEATURE-IMAGE.png",
    description: "A serene holiday retreat featuring red brick colonial architecture."
  },
  {
    title: "Chrysalis High School",
    location: "Mahindra World City, Chennai",
    category: "Institutional",
    year: "2022",
    area: "85,000 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2022/09/FEATURE-IMAGE-1.jpg",
    description: "State-of-the-art CBSE school with modern educational facilities."
  },
  {
    title: "French Style Farm House",
    location: "Irumbulichery Island, Chengalpattu",
    category: "Residential",
    year: "2021",
    area: "9,800 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2021/08/feature-image-8-scaled.jpg",
    description: "Elegant French-inspired farmhouse with sprawling gardens."
  },
  {
    title: "Contemporary Residence",
    location: "Karur",
    category: "Residential",
    year: "2021",
    area: "7,500 sq.ft",
    image: "https://zionarch.com/wp-content/uploads/2021/08/feature-image-2.jpg",
    description: "Luxury contemporary home with clean lines and premium finishes."
  },
];

const categories = ["All", "Residential", "Hospitality", "Institutional"];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const currentProject = filteredProjects[currentIndex];

  return (
    <section id="portfolio" ref={containerRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-primary/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border border-primary/5 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-body text-sm tracking-[0.2em] uppercase mb-6"
          >
            Our Work
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-primary mx-auto"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full font-body text-sm tracking-wider transition-all duration-500 relative overflow-hidden ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Project Showcase */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Main Image */}
              <div className="lg:col-span-7 relative group">
                <motion.div
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                  animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <motion.img
                    src={currentProject?.image}
                    alt={currentProject?.title}
                    className="w-full h-[500px] lg:h-[600px] object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                  
                  {/* Overlay Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute bottom-0 left-0 right-0 p-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-body tracking-wider uppercase rounded-full">
                        {currentProject?.category}
                      </span>
                      <span className="text-foreground/80 text-sm font-body">
                        {currentProject?.year}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                      {currentProject?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="w-4 h-4" />
                      <span className="font-body">{currentProject?.location}</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Navigation Arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-10">
                  <motion.button
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-xl"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-xl"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Project Details Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Project Details</p>
                        <p className="text-foreground font-display font-semibold">{currentProject?.area}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground font-body leading-relaxed mb-8">
                      {currentProject?.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Project Progress</span>
                        <span className="text-foreground font-display font-bold">
                          {String(currentIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="h-1 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentIndex + 1) / filteredProjects.length) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <Button variant="hero" className="w-full group">
                    View Full Project
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Grid Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
        >
          {filteredProjects.map((project, index) => (
            <motion.button
              key={project.title + index}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              className={`relative overflow-hidden rounded-xl aspect-[4/3] group ${
                index === currentIndex ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 transition-all duration-500 ${
                index === currentIndex 
                  ? "bg-primary/20" 
                  : hoveredIndex === index 
                    ? "bg-background/40" 
                    : "bg-background/60"
              }`} />
              
              {/* Hover Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index || index === currentIndex ? 1 : 0,
                  y: hoveredIndex === index || index === currentIndex ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4"
              >
                <p className="text-foreground font-display font-semibold text-sm truncate">
                  {project.title}
                </p>
                <p className="text-foreground/70 text-xs truncate">
                  {project.location}
                </p>
              </motion.div>

              {/* Index Number */}
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-display font-bold ${
                  index === currentIndex ? "text-primary" : "text-foreground/50"
                }`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}