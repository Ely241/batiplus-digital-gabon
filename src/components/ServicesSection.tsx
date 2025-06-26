
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Truck, Clock, Phone, Users, Shield } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Livraison Express",
      description: "Livraison le jour même sur Libreville pour toute commande avant 14h",
      features: ["Suivi en temps réel", "Équipe professionnelle", "Manutention incluse"],
      color: "bg-green-50 text-green-600"
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Service de livraison précis avec géolocalisation de votre chantier",
      features: ["GPS intégré", "Calcul automatique", "Zones couvertes"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      title: "Conseil Technique",
      description: "Expertise technique gratuite par nos spécialistes construction",
      features: ["Conseils gratuits", "Visite chantier", "Devis personnalisé"],
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Shield,
      title: "Garantie Qualité",
      description: "Tous nos matériaux sont certifiés et garantis conformes aux normes",
      features: ["Certification CE", "Garantie fabricant", "SAV réactif"],
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const zones = [
    "Centre-ville", "Akandé", "Oloumi", "Batterie IV", "Lalala", "Nombakélé"
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Services Professionnels
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services pour accompagner vos projets de construction 
            avec efficacité et professionnalisme.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-lg font-semibold font-montserrat text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-1 text-xs text-gray-500">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <div className="w-1 h-1 bg-batiplus-orange-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Delivery Zone */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
                Zones de Livraison à Libreville
              </h3>
              <p className="text-gray-600 mb-6">
                Nous livrons dans tous les quartiers de Libreville avec des créneaux
                adaptés à vos contraintes de chantier.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {zones.map((zone, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-batiplus-blue-500" />
                    <span>{zone}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-batiplus-orange-500" />
                  <span>Délai: 2-4h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-batiplus-orange-500" />
                  <span>Frais: 15.000-25.000 FCFA</span>
                </div>
              </div>

              <Button size="lg" className="bg-batiplus-blue-500 hover:bg-batiplus-blue-600">
                Calculer les Frais de Livraison
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-batiplus-blue-500 to-batiplus-blue-700 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-semibold mb-4">Contact Direct</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-batiplus-orange-400" />
                    <div>
                      <p className="font-medium">+241 62 02 11 11</p>
                      <p className="text-sm text-batiplus-blue-200">Service client</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-batiplus-orange-400" />
                    <div>
                      <p className="font-medium">Avenue Akandé</p>
                      <p className="text-sm text-batiplus-blue-200">Libreville, Gabon</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-batiplus-orange-400" />
                    <div>
                      <p className="font-medium">Lun-Ven 8h-18h</p>
                      <p className="text-sm text-batiplus-blue-200">Sam 8h-12h30</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6 border-white text-white hover:bg-white hover:text-batiplus-blue-700"
                >
                  Nous Contacter
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center bg-batiplus-orange-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
            Besoin Urgent de Matériaux ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre service d'urgence est disponible 24h/24 pour vos chantiers critiques
          </p>
          <Button size="lg" className="bg-batiplus-orange-500 hover:bg-batiplus-orange-600">
            <Phone className="h-5 w-5 mr-2" />
            Appel d'Urgence
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
