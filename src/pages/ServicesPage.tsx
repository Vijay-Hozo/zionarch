import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/sections/Services";
import { FullService } from "@/components/sections/FullService";
import { Specializations } from "@/components/sections/Specializations";
import { Footer } from "@/components/sections/Footer";

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Services />
        <FullService />
        <Specializations />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
