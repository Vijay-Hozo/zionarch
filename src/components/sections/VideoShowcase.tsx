import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const videos = [
  {
    id: 1,
    title: "AJITH BEACH HOUSE",
    src: "https://res.cloudinary.com/dxbxd1sry/video/upload/v1770618103/AJITH_BEACH_HOUSE_xmird9.mp4",
  },
  {
    id: 2,
    title: "KARUR VILLA",
    src: "https://res.cloudinary.com/dxbxd1sry/video/upload/v1770618003/KARUR_VILLA_owaoqn.mp4",
  },
  {
    id: 3,
    title: "HOTEL PALOMAR",
    src: "https://res.cloudinary.com/dxbxd1sry/video/upload/v1770618162/HOTEL_PALOMAR_ebwqxa.mp4",
  },
];

export const VideoShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [animationStage, setAnimationStage] = useState(0);

  // Animation sequence: 0 = 3 videos, 1 = center only, 2 = 2 videos, 3 = single video, then cycle
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setAnimationStage((prev) => (prev + 1) % 4);
    }, 10000);

    return () => clearInterval(interval);
  }, [isInView]);

  const getVisibleVideos = () => {
    switch (animationStage) {
      case 0:
        return videos; // All 3 videos
      case 1:
        return [videos[1]]; // Center video only
      case 2:
        return [videos[0], videos[2]]; // Two videos (left and right)
      case 3:
        return [videos[2]]; // Single video (right)
      default:
        return videos;
    }
  };

  const getGridClass = () => {
    switch (animationStage) {
      case 0:
        return "grid-cols-1 md:grid-cols-3";
      case 1:
        return "grid-cols-1 md:grid-cols-1 place-items-center";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-1 place-items-center";
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  const visibleVideos = getVisibleVideos();

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          className={`grid gap-4 md:gap-6 transition-all duration-700 ${getGridClass()} min-h-[600px]`}
        >
          <AnimatePresence mode="popLayout">
            {visibleVideos.map((video, index) => (
              <motion.div
                key={`${video.id}-${animationStage}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`relative group overflow-hidden rounded-lg aspect-[4/5] md:aspect-[3/4] ${
                  animationStage === 1 || animationStage === 3
                    ? "max-w-md mx-auto w-full"
                    : ""
                }`}
              >
                {/* Video Element */}
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-white/60 text-sm font-medium mb-2 block">
                      0{videos.indexOf(video) + 1}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl font-display font-semibold tracking-tight">
                      {video.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Border Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
