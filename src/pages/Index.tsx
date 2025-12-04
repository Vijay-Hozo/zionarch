import { PageLoader } from "@/components/PageLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Specializations } from "@/components/sections/Specializations";
import { FullService } from "@/components/sections/FullService";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Stats />
        <Specializations />
        <FullService />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
