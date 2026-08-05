import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GallerySection } from "@/components/gallery/GallerySection";
import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  useEffect(() => {
    document.title = "Projects & Office Life Gallery | ZIONARCH Architects";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Gallery Hero Banner */}
        <section className="relative py-20 md:py-28 bg-background text-foreground overflow-hidden">
          {/* <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top_left,hsla(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_right,hsla(var(--foreground)/0.06),transparent_28%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-35">
            <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-[140px]" />
          </div> */}

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span>Projects & Office Life Gallery</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-display font-extrabold tracking-tight mb-6"
            >
              Moments that celebrate our architecture, our people, and our  <span className="text-primary">valued clients</span>
            </motion.h1>
          
          </div>
        </section>

        {/* Gallery Section with Flippy Cards */}
        <GallerySection />

       
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;
