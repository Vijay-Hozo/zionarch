import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Optimize Cloudinary images with transformations
const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (!url.includes('cloudinary.com')) return url;
  
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_auto,q_auto:good,w_${width},c_limit,dpr_auto/${parts[1]}`;
  }
  return url;
};

const showcaseImages = [
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642244/DJI_0320_fop5vi.jpg",
    category: "Residential",
  },
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642019/MAIN_dd3kzd.jpg",
    category: "Apartments",
  },
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642153/2_12_-_Photo_ss3u7n.jpg",
    category: "Institutional",
  },
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642032/MAIN-1_1_vihwcn.jpg",
    category: "Commercial",
  },
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642061/MAIN-1_2_-_Photo_wv1urc.jpg",
    category: "Interiors",
  },

  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642209/2_1_-_Photo_ktrfdq.jpg",
    category: "Hospitality",
  },
  {
    image:
      "https://zionarch.com/wp-content/uploads/2021/08/feature-image-8-scaled.jpg",
    category: "Commercial",
  },
  {
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642271/NAME_BOARD_2_lkjlji.jpg",
    category: "Residential",
  },
];

export function PortfolioPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Function to navigate to a specific card
  const goToCard = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);

    // Reset auto-scroll after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 8000); // Wait 8 seconds before resuming auto-scroll
  };

  // Function to navigate to next card
  const nextCard = () => {
    goToCard((currentIndex + 1) % showcaseImages.length);
  };

  // Function to navigate to previous card
  const prevCard = () => {
    goToCard(
      (currentIndex - 1 + showcaseImages.length) % showcaseImages.length
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoScrolling) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Scroll to current card
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll("[data-card]");

      if (cards.length > 0) {
        const card = cards[currentIndex] as HTMLElement;
        const containerWidth = container.clientWidth;
        const cardWidth = card.offsetWidth;
        const cardLeft = card.offsetLeft;
        const cardCenter = cardLeft + cardWidth / 2;
        const scrollLeft = cardCenter - containerWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // Preload current and next images
  useEffect(() => {
    const currentImg = new Image();
    currentImg.src = optimizeCloudinaryUrl(showcaseImages[currentIndex].image, 800);
    
    const nextIndex = (currentIndex + 1) % showcaseImages.length;
    const nextImg = new Image();
    nextImg.src = optimizeCloudinaryUrl(showcaseImages[nextIndex].image, 800);
  }, [currentIndex]);

  // Calculate opacity for cards based on their position relative to currentIndex
  const getCardOpacity = (index: number) => {
    const distance = Math.abs(index - currentIndex);

    if (distance === 0) return 1; // Current card - full opacity
    if (distance === 1) return 0.5; // Adjacent cards - 50% opacity
    return 0.3; // Other cards - 30% opacity
  };

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

        {/* Navigation Arrows - Mobile Only */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300 lg:hidden"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300 lg:hidden"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Image Grid */}
          <div
            className="mb-12 overflow-x-auto lg:overflow-visible scrollbar-hide scroll-smooth"
            ref={scrollContainerRef}
          >
            <div className="flex lg:grid lg:grid-cols-4 gap-4 md:gap-6 pb-4 lg:pb-0 px-4 md:px-0">
              {showcaseImages.map((item, index) => (
                <div
                  key={`${item.category}-${index}`}
                  data-card
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-auto cursor-pointer"
                  onClick={() => goToCard(index)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                    }}
                    className="relative group overflow-hidden rounded-xl aspect-[3/4] h-full transition-all duration-500 ease-out"
                    style={{
                      opacity: window.innerWidth >= 1024 ? 1 : getCardOpacity(index),
                      transform:
                        window.innerWidth >= 1024 || index === currentIndex ? "scale(1)" : "scale(0.95)",
                    }}
                  >
                    <Link
                      to={`/portfolio?category=${item.category}`}
                      className="block h-full"
                    >
                      <motion.img
                        src={optimizeCloudinaryUrl(item.image, 800)}
                        alt={item.category}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                      {/* Hover Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-all duration-300">
                        <div className="space-y-2">
                          <span className="text-background font-display font-semibold text-sm md:text-lg block">
                            {item.category}
                          </span>
                          <p className="text-background/80 font-body text-xs md:text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            Click to explore more about our work
                          </p>
                        </div>
                      </div>
                      {/* Animated Border */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots - Mobile Only */}
        <div className="flex lg:hidden justify-center items-center gap-2 mb-8">
          {showcaseImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
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
