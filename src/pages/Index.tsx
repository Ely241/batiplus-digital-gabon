
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ComprehensiveProductCatalog from '@/components/ComprehensiveProductCatalog';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <HeroSection />
        <ComprehensiveProductCatalog />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
