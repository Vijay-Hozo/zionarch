import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "A. Karunakara Pandian",
    role: "Principal Architect",
    designation: "Head of Design",
    previousCompany: "Formerly at XYZ Architects",
    isHead: true,
    image:
      "https://zionarch.com/wp-content/uploads/2018/08/A.KARUNAKARA-PANDIAN-PRINCIPAL-ARCHITECT-.jpg",
  },
   {
    name: "Prem Raj",
    role: "Admin",
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/c_crop,ar_3:4/v1765642015/PREM_RAJ_ADMIN_dlzhia.jpg",
  },
   {
    name: "Rayan",
    role: "Senior Architect",
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/c_crop,ar_3:4/v1767011491/Seniorarchitect_csphsk.jpg",
  },
  {
    name: "Menaka",
    role: "Junior Architect",
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642015/MENAKA_JUNIOR_ARCHITECT_hijwmk.jpg",
  },
  {
    name: "Desingu",
    role: "Junior Architect",
    image:
      "https://res.cloudinary.com/dfrlskgto/image/upload/v1765642015/DESINGU_JUNIOR_ARCHITECT_eb8dxj.jpg",
  },
 
];

const pastEmployees = [
  {
    name: "Rajesh Kumar",
    role: "Senior Architect",
    period: "2019 - 2023",
  },
  {
    name: "Priya Sharma",
    role: "Project Manager",
    period: "2020 - 2024",
  },
  {
    name: "Arun Patel",
    role: "Design Architect",
    period: "2018 - 2022",
  },
  {
    name: "Kavitha Reddy",
    role: "Interior Designer",
    period: "2021 - 2024",
  },
];

const pastInterns = [
  {
    name: "Arjun Venkatesh",
    university: "Anna University",
    period: "Summer 2024",
  },
  {
    name: "Sneha Iyer",
    university: "SRM University",
    period: "Winter 2023",
  },
  {
    name: "Karthik Mohan",
    university: "VIT University",
    period: "Summer 2023",
  },
  {
    name: "Divya Krishnan",
    university: "MIT Chennai",
    period: "Winter 2024",
  },
  {
    name: "Vikram Singh",
    university: "NIT Trichy",
    period: "Summer 2022",
  },
  {
    name: "Lakshmi Nair",
    university: "Anna University",
    period: "Winter 2022",
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

        {/* Team Grid - Principal Architect on left, 3 members on right in 2-column grid */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-2/5 group relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-card shadow-xl border border-primary/30 h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[560px]">
              <div className="relative h-full">
                <motion.img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0  duration-500" />
                
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

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    className="relative z-10"
                  >
                    <h3 className="font-display font-semibold text-background mb-2 text-2xl md:text-3xl">
                      {teamMembers[0].name}
                    </h3>
                    <p className="text-background/80 font-body text-lg md:text-xl mb-3">
                      {teamMembers[0].role}
                    </p>
                    <div className="text-background/70 font-body text-base md:text-lg">
                      <p className="mb-1">{teamMembers[0].designation}</p>
                      {/* <p>{teamMembers[0].previousCompany}</p> */}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transition-all duration-500" />
            </div>
          </motion.div>

          {/* 3 Team Members on Right Side - 2x2 grid */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 h-full">
              {/* First two members - Top Row */}
              {teamMembers.slice(1, 5).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group relative h-full min-h-[300px]"
                >
                  <div className="relative overflow-hidden rounded-xl bg-card h-full">
                    <div className="relative h-[320px]">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.05 }}
                      />
                      
                      {/* Hover overlay with additional info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <motion.div
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                          className="relative z-20"
                        >
                          <h3 className="font-display font-semibold text-background mb-2 text-xl">
                            {member.name}
                          </h3>
                          <p className="text-background/90 font-body text-lg mb-3">
                            {member.role}
                          </p>
                          <p className="text-background/80 font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Creative Design & Architectural Solutions
                          </p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
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
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}