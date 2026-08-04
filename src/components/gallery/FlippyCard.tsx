import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Calendar,
  MapPin,
  Maximize2,
  Share2,
  Check,
  RotateCw,
  Sparkles,
  Medal,
  Star,
  Quote,
} from "lucide-react";
import { EventGalleryItem } from "@/lib/galleryData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FlippyCardProps {
  item: EventGalleryItem;
  onOpenLightbox: (item: EventGalleryItem) => void;
  index: number;
}

export const FlippyCard: React.FC<FlippyCardProps> = ({
  item,
  onOpenLightbox,
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + item.src);
    setCopied(true);
    toast.success("Event photo link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="perspective-1200 w-full h-[420px] group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d ease-out transition-transform rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/25 border border-transparent hover:border-red-500/30 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE - Event Photo & Award Badge */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-border/60 bg-card">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
          <div className="absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-700 group-hover:ring-red-500/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-600/90 text-white backdrop-blur-md shadow-md shadow-red-950/30">
              <Trophy className="w-3.5 h-3.5" />
              {item.category}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-red-500/20">
              <RotateCw className="w-3 h-3 text-red-400 animate-spin-slow" />
              Hover to Flip
            </span>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 pt-20 pb-5 px-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white z-10 transition-transform duration-700 group-hover:translate-y-[-2px]">
            <div className="flex items-center gap-2 text-xs text-red-300 font-medium mb-1">
              <Award className="w-3.5 h-3.5" />
              <span className="truncate">{item.awardedBy}</span>
            </div>
            <h3 className="text-lg font-display font-bold text-white line-clamp-1 drop-shadow-sm">
              {item.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-white/70 mt-1 font-light">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" /> {item.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-primary" /> {item.date}
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE - Award Appreciation & Citation Details */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 bg-slate-950/95 dark:bg-zinc-900/98 text-white border border-red-500/35 shadow-2xl flex flex-col justify-between overflow-hidden rotate-y-180">
          {/* Subtle Golden Glow Effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/18 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-950/35 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-red-400">
                <Medal className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {item.awardType}
                </span>
              </div>
              <span className="text-xs font-mono text-red-400/70">{item.date}</span>
            </div>

            <h4 className="text-xl font-display font-bold text-white mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-red-300 font-medium mb-3">
              Presented by {item.awardedBy}
            </p>

            {/* Appreciation Quote / Citation */}
            <div className="relative bg-white/5 p-3.5 rounded-xl border border-white/10 mb-4 transition-colors duration-300 group-hover:border-red-500/20">
              <Quote className="absolute top-2 right-2 w-5 h-5 text-red-400/20" />
              <p className="text-xs text-white/80 leading-relaxed italic pr-4">
                "{item.citation}"
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 mb-2">
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
                Recognition Highlights
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-red-500/15 text-red-100 border border-red-500/25 flex items-center gap-1"
                  >
                    <Star className="w-3 h-3 text-red-400 fill-red-400" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(item);
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs h-9"
            >
              <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
              View Event Photo
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleShare}
              className="w-9 h-9 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
              title="Share Event Photo"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
