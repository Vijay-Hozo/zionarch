import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Days Star Hotel",
    location: "Padur, Chennai",
    category: "Hospitality",
    image: "https://zionarch.com/wp-content/uploads/2018/08/Days-Hotel-1.jpg",
  },
  {
    title: "Endee Villas",
    location: "Neelangarai, Chennai",
    category: "Residential",
    image: "https://zionarch.com/wp-content/uploads/2018/08/villa.jpg",
  },
  {
    title: "Mr. Ganesh's Residence",
    location: "Coimbatore",
    category: "Residential",
    image: "https://zionarch.com/wp-content/uploads/2018/11/FEATURE-IMAGE.jpg",
  },
  {
    title: "Hotel Librans",
    location: "Akkarai, Chennai",
    category: "Hospitality",
    image: "https://zionarch.com/wp-content/uploads/2019/10/0202020.jpg",
  },
  {
    title: "Holiday Home",
    location: "Mahabalipuram",
    category: "Residential",
    image: "https://zionarch.com/wp-content/uploads/2021/08/FEATURE-IMAGE.png",
  },
  {
    title: "Chrysalis High School",
    location: "Mahindra World City, Chennai",
    category: "Institutional",
    image: "https://zionarch.com/wp-content/uploads/2022/09/FEATURE-IMAGE-1.jpg",
  },
];

const categories = ["All", "Residential", "Hospitality", "Institutional"];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="portfolio" ref={containerRef} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Showcase */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl group">
                <motion.img
                  src={filteredProjects[currentIndex]?.image}
                  alt={filteredProjects[currentIndex]?.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <Button variant="hero" className="w-full group/btn">
                    View Project
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="lg:pl-8">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-primary font-body text-sm tracking-wider uppercase"
                >
                  {filteredProjects[currentIndex]?.category}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-display font-bold mt-4 mb-4 text-foreground"
                >
                  {filteredProjects[currentIndex]?.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground font-body text-lg mb-8"
                >
                  {filteredProjects[currentIndex]?.location}
                </motion.p>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <span className="ml-4 text-muted-foreground font-body">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {filteredProjects.map((project, index) => (
            <motion.button
              key={project.title}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentIndex ? "ring-2 ring-primary" : "opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-24 h-24 object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
