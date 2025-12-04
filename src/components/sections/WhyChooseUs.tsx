import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Lightbulb, Palette, Users } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Passion",
    description: "We offer unparalleled passion for architecture. Each project is an adventure, a journey into the built environment. This isn't work at all… it is our passion.",
  },
  {
    icon: Lightbulb,
    title: "Value Engineering",
    description: "As the architect on your project, we will do everything within our power to make sure you are getting the most bang for your buck.",
  },
  {
    icon: Palette,
    title: "Creativity",
    description: "We like to think out of the box… way out of the box. It isn't uncommon for clients to come to us with an idea and for us to extrapolate it into something totally different.",
  },
  {
    icon: Users,
    title: "Coordination",
    description: "We coordinate completely for getting approvals from Corporation / CMDA / DTCP for your project. We love what we do and we love the outcome of every single effort.",
  },
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.03 } : {}}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-4 block">
            Our Values
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground font-body">
            We bring passion, creativity, and expertise to every project
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-max">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group text-center h-full"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
