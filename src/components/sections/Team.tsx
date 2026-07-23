import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ar. A. Karunakara Pandian",
    role: "Principal Architect",
    designation: "Founder & Chief Architect",
    isHead: true,
    image:
      "/drive-images/TEAM%20MEMBERS/A.KARUNAKARA-PANDIAN-PRINCIPAL-ARCHITECT-.jpg",
  },
  {
    name: "Premraj D",
    role: "Admin In-Charge",
    image:
      "/drive-images/TEAM%20MEMBERS/Admin.jpg",
  },
  {
    name: "Ar. Rayan Raj P",
    role: "Senior Architect",
    image:
      "/drive-images/TEAM%20MEMBERS/Seniorarchitect.jpg",
  },
  {
    name: "Ar. Sanjay ",
    role: "Junior Architect",
    image: "/drive-images/TEAM%20MEMBERS/sanjay.png",
  },

  {
    name: "Madhan Raj S",
    role: "Intern Architect",
    image: "/drive-images/TEAM%20MEMBERS/madhan.jpeg",
  },
  {
    name: "Mohammed",
    role: "Intern Architect",
    image: "/drive-images/TEAM%20MEMBERS/Mohammed.jpeg",
  },
  {
    name: "Gayatri V",
    role: "Intern Architect",
    image: "/drive-images/TEAM%20MEMBERS/Gayatri.jpeg",
  },
  {
    name: "Kaveeshvar K",
    role: "Intern Architect",
    image: "/drive-images/TEAM%20MEMBERS/kaveeshvar.jpeg",
  },
  {
    name: "Hemanth S",
    role: "Intern Architect",
    image: "/drive-images/TEAM%20MEMBERS/hemanth.jpeg",
  },
  {
    name: "Chitrarasu M",
    role: "Site Engineer",
    image: "/drive-images/TEAM%20MEMBERS/chitrarasu.jpeg",
  },
  {
    name: "Vijai N",
    role: "Site Engineer",
    image: "/drive-images/TEAM%20MEMBERS/Vijai.jpeg",
  },
];

const featuredMember = teamMembers[0];
const otherMembers = teamMembers.slice(1);

// Group the remaining members into labeled rows
const teamGroups = [
  {
    title: "Admin & Architects",
    members: otherMembers.filter((m) =>
      ["Admin In-Charge", "Senior Architect", "Junior Architect"].includes(
        m.role
      )
    ),
  },
  {
    title: "Intern Architects",
    members: otherMembers.filter((m) => m.role === "Intern Architect"),
  },
  {
    title: "Site Engineer",
    members: otherMembers.filter((m) => m.role === "Site Engineer"),
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  return (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-xl bg-card shadow-md border border-primary/20 aspect-[3/4]">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-[center_20%] transition-all duration-700 group-hover:scale-105"
          whileHover={{ scale: 1.05 }}
        />

        <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
      </div>

      <div className="pt-4 text-center">
        <h3 className="font-display font-semibold text-foreground text-lg md:text-xl">
          {member.name}
        </h3>
        <p className="text-primary font-body text-sm md:text-base mt-1 whitespace-pre-line">
          {member.role === "Intern Architect"
            ? "Intern Architect"
            : member.role}
        </p>
        {member.designation && (
          <p className="text-foreground/60 font-body text-xs md:text-sm mt-0.5">
            {member.designation}
          </p>
        )}
      </div>
    </motion.div>
  );
}

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

        {/* Featured principal architect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-10 lg:grid-cols-[minmax(320px,520px)_1fr] items-center mb-16 md:mb-20"
        >
          <div className="group relative overflow-hidden rounded-3xl bg-card shadow-xl border border-primary/15 aspect-[4/5] lg:aspect-[5/6]">
            <motion.img
              src={featuredMember.image}
              alt={featuredMember.name}
              className="w-full h-full object-cover object-[center_18%] transition-all duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.04 }}
            />


            <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
          </div>

          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-5xl font-display font-semibold text-foreground leading-tight mb-6">
              {featuredMember.name}
            </h3>
            <p className="text-lg md:text-xl text-foreground/75 font-body leading-relaxed mb-6">
              {featuredMember.designation
                ? `${featuredMember.designation}`
                : ""}
            </p>
            <p className="text-foreground/70 font-body leading-8 mb-8">
              Leading the studio&apos;s design vision with a focus on thoughtful
              planning, contextual architecture, and coordinated project
              delivery across residential and commercial work.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* {featuredMember.designation && (
                <div className="rounded-2xl border border-primary/15 bg-card/60 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                    Designation
                  </p>
                  <p className="font-display text-lg text-foreground">
                    {featuredMember.designation}
                  </p>
                </div>
              )} */}
              {/* {featuredMember.previousCompany && (
                <div className="rounded-2xl border border-primary/15 bg-card/60 p-5 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                    Previous Experience
                  </p>
                  <p className="font-display text-lg text-foreground">
                    {featuredMember.previousCompany}
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </motion.div>

        {/* Remaining team, grouped into labeled rows */}
        <div className="space-y-14 md:space-y-16">
          {teamGroups.map(
            (group) =>
              group.members.length > 0 && (
                <div key={group.title}>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-display font-semibold text-primary mb-6 md:mb-8 flex items-center gap-4"
                  >
                    {group.title}
                    <span className="h-px flex-1 bg-primary/20" />
                  </motion.h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {group.members.map((member, index) => (
                      <TeamCard
                        key={member.name}
                        member={member}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
