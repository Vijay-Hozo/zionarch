import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const slides = [
  {
    title: "HOLIDAY HOME AT MAHABALIPURAM",
    image: "https://zionarch.com/wp-content/uploads/2021/08/FEATURE-IMAGE.png",
  },
  {
    title: "CONTEMPORARY RESIDENCE AT KARUR",
    image: "https://zionarch.com/wp-content/uploads/2021/08/feature-image-2.jpg",
  },
  {
    title: "FRENCH STYLE FARM HOUSE",
    image: heroImage,
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ y, scale }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
          <div className="absolute inset-0 bg-foreground/40 dark:bg-foreground/60" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-background/10 backdrop-blur-sm rounded-full text-primary-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-background/10 backdrop-blur-sm rounded-full text-primary-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "w-12 bg-primary" 
                : "w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-xs font-body tracking-[0.3em] uppercase text-primary-foreground/80 border border-primary-foreground/20 rounded-full">
            Architecture & Design Studio
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground leading-tight text-shadow-lg"
          >
            BRIDGES BETWEEN
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display italic text-primary-foreground/90 text-shadow-md"
          >
            Inspirations & <span className="text-primary">Aspirations</span>
          </motion.h2>
        </div>

        {/* Current Slide Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-sm font-body tracking-widest uppercase text-primary bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              {slides[currentSlide].title}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-2xl mx-auto text-primary-foreground/70 text-lg mb-12 font-body"
        >
          A collaboration of innovative design individuals from diverse disciplines 
          forming a highly capable design team for your dream projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="xl" className="group">
            Explore Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="hero-outline" size="xl">
            Get a Quote
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
      >
        <span className="text-xs font-body tracking-[0.3em] text-primary-foreground/40 uppercase writing-mode-vertical rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          ZIONARCH ARCHITECTS
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
      >
        <span className="text-xs font-body tracking-[0.3em] text-primary-foreground/40 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          EST. 2010 — CHENNAI
        </span>
      </motion.div>
    </section>
  );
}
