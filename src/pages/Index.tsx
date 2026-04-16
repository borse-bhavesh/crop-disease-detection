import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ImageUpload from "@/components/ImageUpload";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ImageUpload />
    <HowItWorks />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
