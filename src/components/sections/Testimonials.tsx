import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Mr. Pradeep Anthony",
    role: "COO and Co-founder of TalentEase",
    image: "https://zionarch.com/wp-content/uploads/2021/08/1549381575045.jpg",
    quote: "Extremely professional, creative and timely execution of work. Ability to understand clients needs and fulfill job is extremely good.",
  },
  {
    name: "Mr. Dannies Sylvester",
    role: "Physiotherapist at Al Ahalia Hospital, Abu Dhabi",
    image: "https://zionarch.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-04-at-19.10.46.jpeg",
    quote: "Very dedicated team, they are very professional and takes each and every idea from customers and design the plan accordingly. Most importantly Mr Pandian & team are really trustworthy and honest.",
  },
  {
    name: "Mr. Infant Maria Roger",
    role: "Proprietor at INFANT BUILDERS AND DEVELOPERS",
    image: "https://zionarch.com/wp-content/uploads/2023/02/138541432_2034478986687045_4257104286609192643_n.jpg",
    quote: "Excellent and innovative designs. Continual follow ups with full back end support right from base to finish. You are without doubt in safe hands with them.",
  },
  {
    name: "Mr. Anil Kumar",
    role: "Senior Vice President – Digital, SBI Card, Bangalore",
    image: "https://zionarch.com/wp-content/uploads/2018/08/Mr.-Anil.jpg",
    quote: "We wanted to build a home that is Spacious and Open. Mr.Pandian of ZionArch helped us in designing the home that is not only open and spacious but also has abundant Light, Air and Large Walls in every space.",
  },
  {
    name: "Mr. Sridhar.V & Dr. S.Kalavathi",
    role: "Scientific officers, Dept of Atomic Energy, Kalpakkam",
    image: "https://zionarch.com/wp-content/uploads/2018/08/Mr-Mrs-Sridhar1.jpg",
    quote: "A one stop destination to convert your dream on Realty into a clear vision. I kept on verbally describing my dream house and thoroughly enjoyed the way ZionArch transformed into an aesthetic reality!",
  },
  {
    name: "Dr. Kalyana Sundram",
    role: "Malacca, Malaysia",
    image: "https://zionarch.com/wp-content/uploads/2018/08/Dr.Kalyana-Sundram.jpg",
    quote: "I always wanted a Chettinad styled house but with a blend of modernity for practical living. I was recommended Mr.KarunakaranPandian by a relative. He did not disappoint.",
  },
  {
    name: "Mr. Vijay",
    role: "Director, Days Hotel, Chennai",
    image: "https://zionarch.com/wp-content/uploads/2018/09/vijay-fiNAL.jpg",
    quote: "Zionarch delivered extraordinarily high-quality work. They were disciplined, thoughtful, and insightful. They offered creative solutions and ensured accountability to deadlines and milestones.",
  },
  {
    name: "Mr. Balaji",
    role: "Director, Hotel Ramakrishna, Mahabalipuram",
    image: "https://zionarch.com/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-30-at-17.31.40.jpg",
    quote: "Our hotel work is completely done by Mr.Pandiyan sir, very professional and creatively in a very challenging space. Good work team. I recommend this place.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 text-xs font-body tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 bg-background rounded-full shadow-lg text-foreground/60 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 bg-background rounded-full shadow-lg text-foreground/60 hover:text-primary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="relative overflow-hidden py-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-background rounded-3xl p-8 md:p-12 shadow-xl relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-primary/10">
                  <Quote className="w-20 h-20" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative shrink-0"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-foreground/80 font-body text-lg md:text-xl leading-relaxed mb-6 italic"
                    >
                      "{testimonials[currentIndex].quote}"
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-display font-semibold text-foreground mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-foreground/60 font-body text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
