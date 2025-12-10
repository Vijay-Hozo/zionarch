import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <About />
        <Team />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default AboutPage;
