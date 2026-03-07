import WarningBanner from "@/components/WarningBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturesSection from "@/components/FeaturesSection";
import CryptoVideoSection from "@/components/CryptoVideoSection";
import DeliveryInfoSection from "@/components/DeliveryInfoSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { SnowAnimation } from "@/components/SnowAnimation";
import FreeShippingBanner from "@/components/FreeShippingBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Hexagon Pattern Background */}
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      
      {/* Global Snow Animation - Above content */}
      <SnowAnimation />
      
      <WarningBanner />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <FreeShippingBanner />
        <FeaturedProducts />
        <FeaturesSection />
        <CryptoVideoSection />
        <DeliveryInfoSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
