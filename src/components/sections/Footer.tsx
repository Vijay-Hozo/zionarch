import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
  ],
  services: [
    { name: "Architecture", href: "/services" },
    { name: "Interior Design", href: "/services" },
    { name: "Engineering", href: "/services" },
    { name: "Design & Build", href: "/services" },
  ],
  projects: {
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
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-foreground text-background relative pt-32 md:pt-10 pb-20 md:pb-28 overflow-hidden min-h-[500px] md:min-h-[600px]">
        {/* Large Background Text - At Bottom Like Reference Image */}
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden">
          <span className="text-[18vw] md:text-[20vw] font-display font-bold text-background/[0.06] whitespace-nowrap select-none leading-none">
            ZIONARCH
          </span>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-4 md:px-6 pb-8 md:pb-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-4 md:mb-6">
                <span className="text-xl md:text-2xl font-display font-bold">
                  <span className="text-primary">ZION</span>
                  <span className="text-background">ARCH</span>
                </span>
                <span className="block text-xs tracking-[0.2em] text-background/60 uppercase mt-1">
                  Architects
                </span>
              </Link>
              <p className="text-background/60 font-body text-sm mb-4 md:mb-6">
                Bridges between inspirations and aspirations. Creating spaces
                that inspire life.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">
                Company
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-xs md:text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">
                Services
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-xs md:text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">
                Projects
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.projects.subItems.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-xs md:text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          {/* <div className="pt-6 md:pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 font-body text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} ZIONARCH Architects. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <a
                href="#"
                className="text-background/40 hover:text-background font-body text-xs md:text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-background/40 hover:text-background font-body text-xs md:text-sm transition-colors"
              >
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}
