import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Optimize Cloudinary images with transformations
const optimizeCloudinaryUrl = (url: string, width: number = 1920) => {
  if (!url.includes('cloudinary.com')) return url;
  
  // Insert transformations before the version number
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_auto,q_auto:good,w_${width},c_limit,dpr_auto/${parts[1]}`;
  }
  return url;
};

const slides = [
  {
    title: "MURUGESH BABU RESIDENCE",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/INTERIORS/MAIN-MURUGESH%20BABU%20RESIDENCE/MAIN-1_1%20-%20Photo.jpg",
  },
  {
    title: "SHOLAA LAKE VIEW RESORT",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/HOSPITALITY/MAIN-SHOLAA%20LAKE%20VIEW%20RESORT/MAIN-1_1%20-%20Photo.jpg",
  },
  {
    title: "VASIYAM HOMES",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/COMMERCIAL/MAIN-VASIYAM%20HOMES/3.jpg",
  },
  {
    title: "RAMAKRISHNAN RESIDENCE",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/INTERIORS/MAIN-RAMAKRISHNAN%20RESIDENCE/MAIN-1_2%20-%20Photo.jpg",
  },
  {
    title: "AJITH RESIDENCE",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/RESIDENTIAL/MAIN-AJITH%20RESIDENCE/MAIN-AERIAL_VIEW.JPG",
  },
  {
    title: "PRABHAKARAN RESIDENCE",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/RESIDENTIAL/MAIN-PRABHAKARAN%20RESIDENCE/MAIN-1_2%20-%20Photo.jpg",
  },
  {
    title: "SREE CHAITANYA VISHNU",
    image: "https://jzkelxbvpnjqndddpinb.supabase.co/storage/v1/object/public/media/RESIDENTIAL/MAIN-SREE%20CHAITANYA%20VISHNU%20HOMES/MAIN-2_15%20-%20Photo.jpg",
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

  // Preload first image for faster initial display
  useEffect(() => {
    const img = new Image();
    img.src = optimizeCloudinaryUrl(slides[0].image);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Preload next image when slide changes
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const img = new Image();
    img.src = optimizeCloudinaryUrl(slides[nextIndex].image);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1, x: 100 },
    center: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      x: -100,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
    },
  };

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

      {/* Background Images with Smooth Sliding Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ y, scale }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${optimizeCloudinaryUrl(slides[currentSlide].image, 1920)})` }}
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 6, ease: "linear" }}
          />
          {/* Gradient Overlays */}
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

      {/* Slide Navigation Arrows - Hidden on Mobile */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:block"
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
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:block"
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
        className="absolute bottom-0 mb-16 md:mb-20 lg:mb-32 z-20 container mx-auto px-4 md:px-6 text-center w-full"
      >
        {/* Main Title and Subtitle Side by Side */}
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-3xl font-display font-semibold text-foreground leading-[0.9]"
            >
              BRIDGES BETWEEN
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-3xl font-display text-foreground/80"
            >
              <span>Inspirations & </span>
              <span className="text-primary">Aspirations</span>
            </motion.h2>
          </div>
        </div>

        {/* CTA Buttons - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/portfolio">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero-outline" size="xl" className="group-hover:bg-none">
                <span className="flex items-center gap-2">
                  Explore Portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </Link>
          <Link to="/quote">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" >
                For Enquiry
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
        className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          <span className="text-xs font-body tracking-widest uppercase hidden md:block">Scroll</span>
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
