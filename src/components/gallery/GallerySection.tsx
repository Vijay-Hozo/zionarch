import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { eventGalleryItems } from "@/lib/galleryData";

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  limit,
}) => {
  const filteredItems = useMemo(() => {
    if (limit) {
      return eventGalleryItems.slice(0, limit);
    }

    return eventGalleryItems;
  }, [limit]);

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.12),transparent_28%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-red-500/10 bg-zinc-950 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-red-950/20"
            >
              <img
                src={item.src}
                alt="Event image"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-red-500/20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
