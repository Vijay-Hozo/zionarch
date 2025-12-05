import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

function FlipCard({ feature, index, isInView }: { feature: typeof features[0]; index: number; isInView: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group perspective-1000 h-72"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full p-8 bg-card rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center shadow-lg">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6"
            >
              <feature.icon className="w-10 h-10" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold">
              {feature.title}
            </h3>
            <div className="mt-4 text-sm text-muted-foreground font-body">
              Hover to learn more
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full p-8 bg-primary rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
            <feature.icon className="w-8 h-8 text-primary-foreground mb-4" />
            <h3 className="text-xl font-display font-bold text-primary-foreground mb-4">
              {feature.title}
            </h3>
            <p className="text-primary-foreground/90 font-body text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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

        {/* Features Grid with Flip Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FlipCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
