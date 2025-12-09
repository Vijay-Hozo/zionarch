import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "A. Karunakara Pandian",
    role: "Principal Architect",
    image: "https://zionarch.com/wp-content/uploads/2018/08/A.KARUNAKARA-PANDIAN-PRINCIPAL-ARCHITECT-.jpg",
  },
  {
    name: "V.S. Agnel Joan",
    role: "Senior Architect",
    image: "https://zionarch.com/wp-content/uploads/2022/09/AGNEL.jpg",
  },
  {
    name: "Shiny Monica Seles",
    role: "Junior Architect",
    image: "https://zionarch.com/wp-content/uploads/2022/09/SHINY.jpg",
  },
  {
    name: "Rayan Raj P",
    role: "Junior Architect",
    image: "https://zionarch.com/wp-content/uploads/2023/02/RAYAN-300x300.jpeg",
  },
  {
    name: "Dharani Dharan",
    role: "Intern Architect",
    image: "https://zionarch.com/wp-content/uploads/2022/09/DHARANI.jpg",
  },
  {
    name: "Pradeep Kumar",
    role: "Intern Architect",
    image: "https://zionarch.com/wp-content/uploads/2022/09/PRADEEP.jpg",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32 bg-background overflow-hidden">
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
            Our Team
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Meet The <span className="text-primary">Experts</span>
          </h2>
          <p className="text-foreground/60 font-body max-w-2xl mx-auto text-lg">
            A collaboration of innovative design individuals from diverse disciplines forming a highly capable design team.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-card">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-24 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                  
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      className="relative z-10"
                    >
                      <h3 className="text-xl font-display font-semibold text-background mb-1">
                        {member.name}
                      </h3>
                      <p className="text-background/70 font-body text-sm">
                        {member.role}
                      </p>
                    </motion.div>
                  </div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
