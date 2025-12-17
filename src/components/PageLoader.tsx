import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import zalogo from "@/assets/ZA.png";
import zawhitelogo from "@/assets/ZAWhite.png";
import { useTheme } from "./ThemeProvider";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
   const { theme } = useTheme();
  const logoSrc = theme === "dark" ? zawhitelogo : zalogo;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src={logoSrc}
                  alt="ZA Logo"
                  className="w-[120px] h-[30px] md:w-[140px] md:h-[40px]"
                />
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
                className="h-full bg-primary"
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-muted-foreground font-body tracking-widest uppercase"
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
