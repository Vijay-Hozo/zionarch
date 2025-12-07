import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full opacity-5"
        >
          <div className="w-full h-full rounded-full border border-primary/30" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-5"
        >
          <div className="w-full h-full rounded-full border border-primary/30" />
        </motion.div>
      </div>

      {/* Background Images with Smooth Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            transition: { 
              opacity: { duration: 1.2, ease: "easeOut" }, 
              scale: { duration: 10, ease: "linear" },
              filter: { duration: 1, ease: "easeOut" }
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(5px)",
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
          style={{ y, scale }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            animate={{ scale: [1, 1.15] }}
            transition={{ duration: 10, ease: "linear" }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
          {/* Radial gradient for focus */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30" style={{
            background: "radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 70%)"
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${60 + (i % 3) * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Animated Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      {/* Slide Navigation Arrows */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30"
      >
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-foreground/5 backdrop-blur-md rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-all duration-500 border border-foreground/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30"
      >
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-foreground/5 backdrop-blur-md rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-all duration-500 border border-foreground/10"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Slide Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 z-30">
        <motion.div
          key={currentSlide}
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-3 text-xs font-body tracking-[0.3em] uppercase text-foreground/60 border border-foreground/20 rounded-full backdrop-blur-sm">
            Architecture & Design Studio
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-foreground leading-[0.9]"
          >
            BRIDGES BETWEEN
          </motion.h1>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-foreground/80"
          >
            <span className="italic">Inspirations & </span>
            <span className="text-primary">Aspirations</span>
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
            <span className="text-sm font-body tracking-widest uppercase text-primary/80 bg-primary/10 backdrop-blur-md px-6 py-3 rounded-full border border-primary/20">
              {slides[currentSlide].title}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-2xl mx-auto text-foreground/60 text-lg mb-12 font-body leading-relaxed"
        >
          A collaboration of innovative design individuals from diverse disciplines 
          forming a highly capable design team for your dream projects.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/portfolio">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" className="group">
                <span className="flex items-center gap-2">
                  Explore Portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </Link>
          <Link to="/contact">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero-outline" size="xl">
                Get a Quote
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Side Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "bg-primary h-8" 
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
