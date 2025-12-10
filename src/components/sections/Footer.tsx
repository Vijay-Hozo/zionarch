import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "#" },
    { name: "News", href: "#" },
  ],
  services: [
    { name: "Architecture", href: "/services" },
    { name: "Interior Design", href: "/services" },
    { name: "Engineering", href: "/services" },
    { name: "Design & Build", href: "/services" },
  ],
  projects: [
    { name: "Residential", href: "/portfolio" },
    { name: "Commercial", href: "/portfolio" },
    { name: "Hospitality", href: "/portfolio" },
    { name: "Institutional", href: "/portfolio" },
  ],
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
      {/* CTA Section - Above Footer */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-50 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-primary-foreground p-6 md:p-8 lg:p-12 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl transform translate-y-1/2"
        >
          <div className="text-center lg:text-left">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold mb-2">
              Ready to Start Your Project?
            </h3>
            <p className="text-primary-foreground/80 font-body text-sm md:text-base">
              Let's create something amazing together
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/quote">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero-outline" size="lg" className="group w-full sm:w-auto">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      <footer className="bg-foreground text-background relative pt-32 md:pt-36 overflow-hidden">
        {/* Large Background Text - Like Reference Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[12vw] md:text-[15vw] font-display font-bold text-background/[0.03] whitespace-nowrap select-none">
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
                Bridges between inspirations and aspirations. Creating spaces that inspire life.
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
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">Company</h4>
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
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">Services</h4>
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
              <h4 className="font-display font-semibold text-background mb-3 md:mb-4 text-sm md:text-base">Projects</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.projects.map((link) => (
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
          <div className="pt-6 md:pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 font-body text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} ZIONARCH Architects. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <a href="#" className="text-background/40 hover:text-background font-body text-xs md:text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/40 hover:text-background font-body text-xs md:text-sm transition-colors">
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
          </div>
        </div>
      </footer>
    </>
  );
}
