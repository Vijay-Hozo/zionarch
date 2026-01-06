import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import zalogo from "@/assets/ZA.png";
import zawhitelogo from "@/assets/ZAWhite.png";

const navItems = [
  { name: "HOME", href: "/" },
  {
    name: "ABOUT US",
    href: "/about",
    subItems: [{ name: "Our Team", href: "/about#team" }],
  },
  { name: "SERVICES", href: "/services" },
  {
    name: "PORTFOLIO",
    href: "/portfolio",
    subItems: [
      { name: "Apartments", href: "/portfolio?category=Apartments" },
      { name: "Commercial", href: "/portfolio?category=Commercial" },
      { name: "Hospitality", href: "/portfolio?category=Hospitality" },
      { name: "Interiors", href: "/portfolio?category=Interiors" },
      { name: "Institutional", href: "/portfolio?category=Institutional" },
      { name: "Residential", href: "/portfolio?category=Residential" },
    ],
  },
  { name: "QUOTE", href: "/quote" },
  { name: "CONTACT US", href: "/contact" },
  {
    name: "CAREERS",
    href: "/internship",
    subItems: [
      { name: "Internship", href: "/internship" },
      { name: "Work At ZIONARCH", href: "/work-at" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? zawhitelogo : zalogo;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setExpandedMobileItem(null); // Reset expanded items when menu closes
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setExpandedMobileItem(null);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (
        location.pathname === path ||
        (path === "" && location.pathname === "/about")
      ) {
        // Same page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate then scroll
        navigate(path || "/about");
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  const handleMobileItemClick = (item: typeof navItems[0]) => {
    if (item.subItems) {
      // Toggle expansion for items with subitems
      setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name);
    } else {
      // Navigate for items without subitems
      handleNavClick(item.href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[120] transition-all duration-500",
          isScrolled || isOpen
            ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/20"
            : "bg-transparent backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <motion.div
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-baseline">
                  <img
                    src={logoSrc}
                    alt="ZA Logo"
                    className="w-[120px] h-[30px] md:w-[140px] md:h-[40px]"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative px-4 py-2 text-xs font-body font-medium tracking-wide transition-all duration-300 group flex items-center gap-1",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.name}
                    {item.subItems && (
                      <motion.span
                        animate={{
                          rotate: hoveredItem === item.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.span>
                    )}
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-0.5 bg-primary"
                      initial={{ width: 0, x: "-50%" }}
                      animate={{
                        width:
                          isActive(item.href) || hoveredItem === item.name
                            ? "80%"
                            : 0,
                        x: "-50%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.subItems && hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 min-w-[150px] bg-background/90 backdrop-blur-xl rounded-lg shadow-xl border border-border/30 overflow-hidden"
                      >
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavClick(subItem.href)}
                            className="block w-full px-4 py-3 text-xs font-body font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 text-left"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                {/* <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-foreground/60 hover:text-primary hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 relative z-10"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.a> */}
                <motion.a
                  href="https://www.facebook.com/ZionarchArchitects#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/zionarch_architects/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
              </div>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[120] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-[120] lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="text-xl font-display font-bold">
                    <span className="text-primary">ZION</span>ARCH
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex-1 p-6 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleMobileItemClick(item)}
                          className={cn(
                            "flex items-center justify-between w-full py-4 text-lg font-body font-medium hover:text-primary hover:pl-4 transition-all duration-300 border-b border-border/50 text-left",
                            isActive(item.href)
                              ? "text-primary pl-4"
                              : "text-foreground/80"
                          )}
                        >
                          <span>{item.name}</span>
                          {item.subItems && (
                            <motion.span
                              animate={{
                                rotate: expandedMobileItem === item.name ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.span>
                          )}
                        </button>
                        <AnimatePresence>
                          {item.subItems && expandedMobileItem === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1 pt-2 pb-3">
                                {item.subItems.map((subItem) => (
                                  <button
                                    key={subItem.name}
                                    onClick={() => handleNavClick(subItem.href)}
                                    className="block w-full py-3 text-base font-body text-foreground/60 hover:text-primary hover:pl-2 transition-all duration-200 text-left"
                                  >
                                    {subItem.name}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="p-6 border-t border-border">
                  <div className="flex items-center gap-4 justify-center">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
