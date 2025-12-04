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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.03,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const splitText = (text: string) => text.split("");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0"
      />
      <motion.div
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"
      />

      {/* Background Images with Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            y, 
            scale,
            x: mousePosition.x * 0.5,
          }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              x: mousePosition.x * 0.3,
              y: mousePosition.y * 0.3,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
          <div className="absolute inset-0 bg-foreground/40 dark:bg-foreground/60" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Grid Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 z-10"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={floatingVariants}
          animate="animate"
          style={{ 
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
          }}
          className="absolute w-2 h-2 bg-primary/30 rounded-full z-10"
        />
      ))}

      {/* Slide Navigation Arrows */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30"
      >
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.2, x: -8, backgroundColor: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-background/10 backdrop-blur-md rounded-full text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 border border-primary-foreground/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30"
      >
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.2, x: 8, backgroundColor: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-background/10 backdrop-blur-md rounded-full text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 border border-primary-foreground/20"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Slide Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3"
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? "w-12 bg-primary" 
                : "w-4 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.span 
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
              className="inline-block px-6 py-3 text-xs font-body tracking-[0.3em] uppercase text-primary-foreground/80 border border-primary-foreground/20 rounded-full backdrop-blur-sm"
            >
              Architecture & Design Studio
            </motion.span>
          </motion.div>

          {/* Main Title with Letter Animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground leading-tight text-shadow-lg flex justify-center flex-wrap"
              style={{ perspective: 1000 }}
            >
              {splitText("BRIDGES BETWEEN").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={letter === " " ? "mr-4" : ""}
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          {/* Subtitle with Gradient Animation */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-primary-foreground/90 text-shadow-md"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="italic"
              >
                Inspirations &{" "}
              </motion.span>
              <motion.span 
                className="text-primary"
                animate={{ 
                  textShadow: [
                    "0 0 20px hsl(var(--primary) / 0.5)",
                    "0 0 40px hsl(var(--primary) / 0.8)",
                    "0 0 20px hsl(var(--primary) / 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Aspirations
              </motion.span>
            </motion.h2>
          </div>

          {/* Current Slide Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-sm font-body tracking-widest uppercase text-primary bg-primary-foreground/10 backdrop-blur-md px-6 py-3 rounded-full border border-primary/30"
              >
                {slides[currentSlide].title}
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-primary-foreground/70 text-lg mb-12 font-body leading-relaxed"
          >
            A collaboration of innovative design individuals from diverse disciplines 
            forming a highly capable design team for your dream projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero" size="xl" className="group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-primary-foreground/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero-outline" size="xl" className="relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-primary/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: "inherit" }}
                />
                <span className="relative z-10">Get a Quote</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors group"
        >
          <motion.span 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-body tracking-widest uppercase"
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 group-hover:text-primary transition-colors" />
          </motion.div>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-primary-foreground/40 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          />
        </motion.a>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
      >
        <motion.span 
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs font-body tracking-[0.3em] text-primary-foreground/40 uppercase writing-mode-vertical rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          ZIONARCH ARCHITECTS
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
      >
        <motion.span 
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="text-xs font-body tracking-[0.3em] text-primary-foreground/40 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          EST. 2010 — CHENNAI
        </motion.span>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary-foreground/20 z-20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary-foreground/20 z-20 hidden lg:block"
      />
    </section>
  );
}
