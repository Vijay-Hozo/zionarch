import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Footer } from "@/components/sections/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <About />
        <WhyChooseUs />
        <Stats />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
