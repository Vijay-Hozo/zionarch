import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "Days Hotel", logo: "https://zionarch.com/wp-content/uploads/2018/08/c19.png" },
  { name: "Endee Villas", logo: "https://zionarch.com/wp-content/uploads/2018/08/c23.png" },
  { name: "Client 3", logo: "https://zionarch.com/wp-content/uploads/2018/08/c18.png" },
  { name: "Kauvery Hospital", logo: "https://zionarch.com/wp-content/uploads/2019/10/kauvery-logo.jpg" },
  { name: "Hotel Ramakrishna", logo: "https://zionarch.com/wp-content/uploads/2021/08/HTL-RAMAKRISHNA.jpg" },
  { name: "Crossway Resort", logo: "https://zionarch.com/wp-content/uploads/2021/08/logo-crossway-resort-LOGO.png" },
  { name: "Skyland Builders", logo: "https://zionarch.com/wp-content/uploads/2020/02/SDFSDFADFF.png" },
  { name: "Infant Builders", logo: "https://zionarch.com/wp-content/uploads/2020/02/INFANT-BUILDERS.png" },
  { name: "TalentEase", logo: "https://zionarch.com/wp-content/uploads/2020/02/1010102505050.png" },
  { name: "Client 10", logo: "https://zionarch.com/wp-content/uploads/2018/08/c1.png" },
  { name: "Client 11", logo: "https://zionarch.com/wp-content/uploads/2018/08/c2.png" },
  { name: "Client 12", logo: "https://zionarch.com/wp-content/uploads/2018/08/c3.png" },
  { name: "Client 13", logo: "https://zionarch.com/wp-content/uploads/2018/08/c4.png" },
  { name: "Client 14", logo: "https://zionarch.com/wp-content/uploads/2018/08/c5.png" },
  { name: "Client 15", logo: "https://zionarch.com/wp-content/uploads/2018/08/c6.png" },
  { name: "Client 16", logo: "https://zionarch.com/wp-content/uploads/2018/08/c10.png" },
];

export function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Split partners into two rows for infinite scroll
  const firstRow = partners.slice(0, 8);
  const secondRow = partners.slice(8, 16);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
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
            Trusted By
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
            Our <span className="text-primary">Clients</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            We've had the privilege of working with leading organizations across various industries
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-primary mx-auto mt-6"
          />
        </motion.div>

        {/* Infinite Scroll Rows */}
        <div className="space-y-8">
          {/* First Row - Scroll Left */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
            
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
            >
              {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
                <motion.div
                  key={`row1-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 w-48 h-24 bg-background rounded-xl border border-border flex items-center justify-center p-4 group hover:border-primary/50 transition-all duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Scroll Right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
            
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
            >
              {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((partner, index) => (
                <motion.div
                  key={`row2-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 w-48 h-24 bg-background rounded-xl border border-border flex items-center justify-center p-4 group hover:border-primary/50 transition-all duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "350+", label: "Happy Clients" },
            { value: "510+", label: "Projects Completed" },
            { value: "11+", label: "Years Experience" },
            { value: "15+", label: "Industry Partners" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl lg:text-4xl font-display font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}