
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Package, Hammer, Wrench, Zap, Droplet, Palette } from 'lucide-react';

const ProductCategories = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      name: "Ciment & Béton",
      description: "Ciments Portland, bétons prêts, adjuvants",
      icon: Package,
      color: "bg-gray-100",
      products: ["Ciment CPA 55", "Béton C25/30", "Adjuvants"],
      count: "150+ produits"
    },
    {
      id: 2,
      name: "Fer & Acier",
      description: "Barres HA, treillis soudés, profilés",
      icon: Hammer,
      color: "bg-red-50",
      products: ["Barres HA Ø8-32", "Treillis soudés", "Cornières"],
      count: "80+ produits"
    },
    {
      id: 3,
      name: "Peinture & Finition",
      description: "Peintures murales, vernis, enduits",
      icon: Palette,
      color: "bg-blue-50",
      products: ["Peinture acrylique", "Vernis marine", "Enduits"],
      count: "200+ produits"
    },
    {
      id: 4,
      name: "Outils & Équipements",
      description: "Outillage professionnel et électroportatif",
      icon: Wrench,
      color: "bg-yellow-50",
      products: ["Perceuses", "Meuleuses", "Outils à main"],
      count: "300+ produits"
    },
    {
      id: 5,
      name: "Plomberie & Sanitaire",
      description: "Tuyauterie, raccords, sanitaires",
      icon: Droplet,
      color: "bg-cyan-50",
      products: ["Tubes PVC", "Raccords laiton", "WC & lavabos"],
      count: "120+ produits"
    },
    {
      id: 6,
      name: "Électricité",
      description: "Câbles, tableaux, éclairage",
      icon: Zap,
      color: "bg-purple-50",
      products: ["Câbles H07V-U", "Disjoncteurs", "Luminaires"],
      count: "90+ produits"
    }
  ];

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Notre Catalogue Complet
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plus de 1000 références de matériaux de construction de qualité professionnelle
            avec stock permanent et prix compétitifs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  hoveredCard === index ? 'shadow-xl -translate-y-2' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-batiplus-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold font-montserrat text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {category.products.map((product, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-batiplus-orange-500 rounded-full mr-2"></div>
                        {product}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-batiplus-blue-600">
                      {category.count}
                    </span>
                    <ArrowRight className="h-5 w-5 text-batiplus-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
            Besoin d'un produit spécifique ?
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Notre équipe technique peut vous conseiller et commander des produits sur mesure
            selon vos besoins spécifiques de chantier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-batiplus-blue-500 hover:bg-batiplus-blue-600">
              Parcourir le Catalogue
            </Button>
            <Button size="lg" variant="outline" className="border-batiplus-orange-500 text-batiplus-orange-500 hover:bg-batiplus-orange-50">
              Demander un Devis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
