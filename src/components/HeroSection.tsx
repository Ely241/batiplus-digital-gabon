
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Truck, Calculator, Phone } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Leader des Matériaux de Construction au Gabon",
      subtitle: "Plus de 20 ans d'expérience à votre service",
      description: "Découvrez notre gamme complète de matériaux de qualité avec livraison rapide à Libreville et conseil technique gratuit.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Voir le Catalogue"
    },
    {
      title: "Calculateurs Intelligents Gratuits",
      subtitle: "Estimez vos besoins en quelques clics",
      description: "Utilisez nos calculateurs béton, peinture et fer pour optimiser vos achats et éviter le gaspillage.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Essayer Maintenant"
    },
    {
      title: "Livraison Rapide sur Libreville",
      subtitle: "Service professionnel garanti",
      description: "Commandez avant 14h, livré le jour même. Suivi en temps réel et équipe technique disponible.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Commander Maintenant"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-batiplus-black-900 via-batiplus-black-700 to-batiplus-black-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-batiplus-red-500 text-batiplus-red-500" />
                ))}
              </div>
              <span className="text-sm font-medium">4/5 - 747 avis clients</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              {slides[currentSlide].subtitle}
            </p>

            <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-batiplus-red-500 hover:bg-batiplus-red-600 text-white px-8 py-3 text-lg font-semibold">
                {slides[currentSlide].cta}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-batiplus-black-700 px-8 py-3 text-lg font-semibold">
                <Phone className="h-5 w-5 mr-2" />
                +241 62 02 11 11
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-600">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-batiplus-red-500" />
                <p className="text-sm font-medium">Livraison</p>
                <p className="text-xs text-gray-300">Même jour</p>
              </div>
              <div className="text-center">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-batiplus-red-500" />
                <p className="text-sm font-medium">Calculateurs</p>
                <p className="text-xs text-gray-300">Gratuits</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-batiplus-red-500" />
                <p className="text-sm font-medium">Conseil</p>
                <p className="text-xs text-gray-300">Technique</p>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-batiplus-red-500' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
