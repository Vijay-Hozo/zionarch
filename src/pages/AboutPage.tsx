import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";
import { Team } from "@/components/sections/Team";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <About />
        <Team />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
