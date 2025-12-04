import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "News", href: "#" },
  ],
  services: [
    { name: "Architecture", href: "#services" },
    { name: "Interior Design", href: "#services" },
    { name: "Engineering", href: "#services" },
    { name: "Design & Build", href: "#services" },
  ],
  projects: [
    { name: "Residential", href: "#portfolio" },
    { name: "Commercial", href: "#portfolio" },
    { name: "Hospitality", href: "#portfolio" },
    { name: "Institutional", href: "#portfolio" },
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
    <footer className="bg-foreground text-background relative">
      {/* CTA Section */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative -top-16 bg-primary text-primary-foreground p-8 lg:p-12 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
              Ready to Start Your Project?
            </h3>
            <p className="text-primary-foreground/80 font-body">
              Let's create something amazing together
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="hero-outline" size="lg">
              Get a Quote
            </Button>
            <Button 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#home" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold">
                <span className="text-primary">ZION</span>
                <span className="text-background">ARCH</span>
              </span>
              <span className="block text-xs tracking-[0.2em] text-background/60 uppercase mt-1">
                Architects
              </span>
            </a>
            <p className="text-background/60 font-body text-sm mb-6">
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
            <h4 className="font-display font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/60 hover:text-primary font-body text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/60 hover:text-primary font-body text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-background mb-4">Projects</h4>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/60 hover:text-primary font-body text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-display font-semibold text-background mb-4">Newsletter</h4>
            <p className="text-background/60 font-body text-sm mb-4">
              Subscribe for updates on our latest projects and news.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/40 font-body text-sm focus:outline-none focus:border-primary"
              />
              <Button variant="hero" size="default">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 font-body text-sm text-center md:text-left">
            © {new Date().getFullYear()} ZIONARCH Architects. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/40 hover:text-background font-body text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/40 hover:text-background font-body text-sm transition-colors">
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
  );
}
