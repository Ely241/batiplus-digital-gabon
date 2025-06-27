
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ComprehensiveProductCatalog from '@/components/ComprehensiveProductCatalog';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header selectedProducts={selectedProducts} />
      <main>
        <HeroSection />
        <ComprehensiveProductCatalog onSelectedProductsChange={setSelectedProducts} />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
