
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCategories from '@/components/ProductCategories';
import CalculatorSection from '@/components/CalculatorSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <HeroSection />
        <ProductCategories />
        <CalculatorSection 
          activeCalculator={activeCalculator}
          setActiveCalculator={setActiveCalculator}
        />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
