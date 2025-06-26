
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jean-Claude Mbeng",
      role: "Entrepreneur BTP",
      company: "Construction Mbeng SARL",
      content: "Batiplus est notre partenaire privilégié depuis 5 ans. Qualité irréprochable des matériaux, livraisons ponctuelles et équipe très professionnelle. Je recommande vivement !",
      rating: 5,
      project: "Résidence Les Palmiers - 24 appartements",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Marie Nguema",
      role: "Architecte",
      company: "Cabinet d'Architecture MN",
      content: "L'équipe technique de Batiplus nous accompagne sur tous nos projets. Leurs conseils nous font gagner du temps et de l'argent. Service client exceptionnel !",
      rating: 5,
      project: "Centre Commercial Akandé",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Pierre Obame",
      role: "Particulier",
      company: "Propriétaire",
      content: "Pour la construction de ma maison, Batiplus m'a fourni tous les matériaux avec un excellent rapport qualité-prix. Les calculateurs en ligne sont très pratiques !",
      rating: 4,
      project: "Villa individuelle 4 chambres",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      name: "Sylvie Mintsa",
      role: "Chef de projet",
      company: "BTP Gabon International",
      content: "La réactivité de Batiplus sur les commandes urgentes nous a sauvé plusieurs fois. Stock toujours disponible et livraison express remarquable.",
      rating: 5,
      project: "Immeuble de bureaux - 8 étages",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentClient = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-gradient-to-br from-batiplus-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Nos Clients Témoignent
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez pourquoi plus de 1000 professionnels et particuliers 
            font confiance à Batiplus pour leurs projets de construction.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-batiplus-blue-600 mb-2">747</div>
            <div className="text-sm text-gray-600">Avis clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-batiplus-blue-600 mb-2">4.0</div>
            <div className="flex justify-center mb-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-batiplus-orange-500 text-batiplus-orange-500" />
              ))}
              <Star className="h-4 w-4 text-gray-300" />
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-batiplus-blue-600 mb-2">1000+</div>
            <div className="text-sm text-gray-600">Projets livrés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-batiplus-blue-600 mb-2">20+</div>
            <div className="text-sm text-gray-600">Années d'expérience</div>
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Quote className="h-12 w-12 text-batiplus-orange-500 mb-6" />
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                    "{currentClient.content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={currentClient.image}
                      alt={currentClient.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{currentClient.name}</div>
                      <div className="text-sm text-gray-600">{currentClient.role}</div>
                      <div className="text-sm text-batiplus-blue-600">{currentClient.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < currentClient.rating
                              ? 'fill-batiplus-orange-500 text-batiplus-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{currentClient.rating}/5</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 italic">
                    Projet: {currentClient.project}
                  </div>
                </div>

                {/* Image/Visual */}
                <div className="bg-gradient-to-br from-batiplus-blue-500 to-batiplus-blue-700 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">{currentClient.rating}.0</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < currentClient.rating
                              ? 'fill-batiplus-orange-400 text-batiplus-orange-400'
                              : 'text-batiplus-blue-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-batiplus-blue-100 text-lg">Évaluation client</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <button
                  onClick={prevTestimonial}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <button
                  onClick={nextTestimonial}
                  className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-batiplus-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Secondary Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.filter((_, index) => index !== currentTestimonial).slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <div className="flex space-x-1 ml-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-batiplus-orange-500 text-batiplus-orange-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
