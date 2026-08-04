import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GallerySection } from "@/components/gallery/GallerySection";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, CheckCircle2, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  useEffect(() => {
    document.title = "Awards & Appreciation Gallery | ZIONARCH Architects";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Gallery Hero Banner */}
        <section className="relative py-20 md:py-28 bg-zinc-950 text-white overflow-hidden border-b border-white/10">
          {/* Ambient Red Lighting & Glow FX */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
            <div className="absolute -top-40 left-1/4 w-96 h-96 bg-red-500/25 rounded-full blur-[120px]" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-red-950/35 rounded-full blur-[140px]" />
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-primary border border-red-500/30 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span>Awards & Appreciation Gallery</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6"
            >
              Honors, Awards & <span className="text-primary ">Recognition</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto text-white/70 text-base md:text-lg font-light leading-relaxed mb-10"
            >
              Celebrating our proudest milestones, architectural trophies, industry honors, and client appreciation events.
            </motion.p>
          </div>
        </section>

        {/* Gallery Section with Flippy Cards */}
        <GallerySection />

        {/* Bottom Call To Action Banner */}
        <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center relative z-10">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">
              Award-Winning Architectural Excellence
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Partner With An Award-Winning Design Studio
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8 font-light">
              Connect with our architects to design space solutions recognized for craftsmanship, sustainability, and elegance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/quote">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 h-12">
                  Request Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium px-8 h-12">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;
