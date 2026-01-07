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
    { name: "Careers", href: "/internship" },
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
  { icon: Facebook, href: "https://www.facebook.com/ZionarchArchitects#", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/zionarch_architects/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/zionarch_architects", label: "LinkedIn" },
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
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-16 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-8 md:mb-12">
            {/* Brand */}
            <div className="lg:pr-4">
              <Link to="/" className="inline-block mb-4 md:mb-5">
                <span className="text-xl md:text-2xl font-display font-bold">
                  <span className="text-primary">ZION</span>
                  <span className="text-background">ARCH</span>
                </span>
                <span className="block text-xs tracking-[0.2em] text-background/60 uppercase mt-1">
                  Architects
                </span>
              </Link>
              <p className="text-background/60 font-body text-sm mb-5 leading-relaxed">
                Bridges between inspirations and aspirations. Creating spaces
                that inspire life.
              </p>
              
              {/* Address */}
              <div className="mb-5">
                <h4 className="font-display font-semibold text-background mb-2 text-sm">
                  Visit Us
                </h4>
                <address className="text-background/60 font-body text-xs leading-relaxed not-italic">
                  No.1, 1st Floor, 2nd Main Road<br />
                  Parasakthi Nagar, Camp Road<br />
                  Selaiyur, East Tambaram<br />
                  Chennai - 600073
                </address>
              </div>

              {/* Contact */}
              <div className="mb-5">
                <h4 className="font-display font-semibold text-background mb-2 text-sm">
                  Contact Us
                </h4>
                <div className="text-background/60 font-body text-xs space-y-1">
                  <p>
                    <a href="mailto:office@zionarch.com" className="hover:text-primary transition-colors">
                      office@zionarch.com
                    </a>
                  </p>
                  <p>
                    <a href="tel:+914442865772" className="hover:text-primary transition-colors">
                      +91 044 42865772
                    </a>
                  </p>
                  <p>
                    <a href="tel:+918695478788" className="hover:text-primary transition-colors">
                      +91 86954 78788
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-background mb-4 text-base">
                Company
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-sm transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-background mb-4 text-base">
                Services
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-sm transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-background mb-4 text-base">
                Projects
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.projects.subItems.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/60 hover:text-primary font-body text-sm transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Section - 5th Column on Desktop */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-display font-semibold text-background mb-4 text-base">
                Find Us
              </h4>
              <div className="w-full h-[250px] lg:h-[280px] rounded-lg overflow-hidden border border-background/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8!2d80.1452247!3d12.9191876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525ee1040e4d77%3A0x7ab1ae639024db6d!2sZionarch%20Architects!5e0!3m2!1sen!2sin!4v1704556800000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zionarch Architects Location"
                />
              </div>
            </div>
          </div>
          </div>

          {/* Bottom Bar */}
      </footer>
    </>
  );
}
