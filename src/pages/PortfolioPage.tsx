import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { Footer } from "@/components/sections/Footer";

const PortfolioPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default PortfolioPage;
