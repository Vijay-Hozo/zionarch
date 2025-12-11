import { PageLoader } from "@/components/PageLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Stats } from "@/components/sections/Stats";
import { Specializations } from "@/components/sections/Specializations";
import { FullService } from "@/components/sections/FullService";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <AboutPreview />
        <Services />
        <WhyChooseUs />
        <PortfolioPreview />
        <Stats />
        <Specializations />
        <FullService />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
