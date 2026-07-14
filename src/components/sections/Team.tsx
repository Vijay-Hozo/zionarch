import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Ar. A. Karunakara Pandian",
    role: "Principal Architect",
    designation: "Head of Design",
    previousCompany: "Formerly at XYZ Architects",
    isHead: true,
    image:
      "/drive-images/TEAM%20MEMBERS/A.KARUNAKARA-PANDIAN-PRINCIPAL-ARCHITECT-.jpg",
  },
   {
    name: "Premraj D",
    role: "Admin In-Charge",
    image:
      "https://res.cloudinary.com/dxbxd1sry/image/upload/v1779867071/Admin_zkp1ul.jpg",
  },
   {
    name: "Ar. Rayan Raj Pī",
    role: "Senior Architect",
    image:
      "https://res.cloudinary.com/dxbxd1sry/image/upload/v1779867074/Seniorarchitect_ze8mbq.jpg",
  },
  {
    name: "Ar. Menaka Y",
    role: "Junior Architect",
    image:
      "/drive-images/TEAM%20MEMBERS/MENAKA%20(JUNIOR%20ARCHITECT).jpg",
  },
  {
    name: "Ar. Desingu Raja D",
    role: "Junior Architect",
    image:
      "https://res.cloudinary.com/dxbxd1sry/image/upload/v1779867075/DESINGU_JUNIOR_ARCHITECT_akuiqj.jpg",
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
            A collaboration of innovative design individuals from diverse
            disciplines forming a highly capable design team.
          </p>
        </motion.div>

        {/* Team Grid - all members in a uniform grid, name/role below each image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl bg-card shadow-md border border-primary/20 aspect-[3/4]">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                />

                {/* Social icons on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </div>

              {/* Name and role - always visible below image */}
              <div className="pt-4 text-center">
                <h3 className="font-display font-semibold text-foreground text-lg md:text-xl">
                  {member.name}
                </h3>
                <p className="text-primary font-body text-sm md:text-base mt-1">
                  {member.role}
                </p>
                {member.designation && (
                  <p className="text-foreground/60 font-body text-xs md:text-sm mt-0.5">
                    {member.designation}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}