import { PageLoader } from "@/components/PageLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Specializations } from "@/components/sections/Specializations";
import { FullService } from "@/components/sections/FullService";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <About />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Stats />
        <Specializations />
        <FullService />
        <Team />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
