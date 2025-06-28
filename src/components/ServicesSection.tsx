
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Truck, Clock, Phone, Users, Shield, CheckCircle, Award, Zap, HeartHandshake } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Livraison Express",
      description: "Livraison le jour même sur Libreville pour toute commande avant 14h",
      features: ["Suivi en temps réel", "Équipe professionnelle", "Manutention incluse"],
      color: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Service de livraison précis avec géolocalisation de votre chantier",
      features: ["GPS intégré", "Calcul automatique", "Zones couvertes"],
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: Users,
      title: "Conseil Technique",
      description: "Expertise technique gratuite par nos spécialistes construction",
      features: ["Conseils gratuits", "Visite chantier", "Devis personnalisé"],
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      icon: Shield,
      title: "Garantie Qualité",
      description: "Tous nos matériaux sont certifiés et garantis conformes aux normes",
      features: ["Certification CE", "Garantie fabricant", "SAV réactif"],
      color: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    }
  ];

  const stats = [
    { icon: Award, value: "26 ans", label: "d'expérience", color: "text-batiplus-red-500" },
    { icon: CheckCircle, value: "1000+", label: "produits", color: "text-batiplus-blue-500" },
    { icon: Zap, value: "24h/24", label: "service urgence", color: "text-batiplus-orange-500" },
    { icon: HeartHandshake, value: "95%", label: "clients satisfaits", color: "text-green-600" }
  ];

  const zones = [
    "Centre-ville", "Akandé", "Oloumi", "Batterie IV", "Lalala", "Nombakélé"
  ];

  const handleContactCall = () => {
    window.location.href = 'tel:+24162021111';
  };

  const handleDeliveryCalculator = () => {
    window.location.href = '/estimateur';
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header améliorée */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-batiplus-red-100 text-batiplus-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Excellence & Professionnalisme
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-6">
            Services <span className="text-batiplus-red-500">Professionnels</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une gamme complète de services premium pour accompagner vos projets de construction 
            avec l'expertise et la fiabilité que vous méritez.
          </p>
          
          {/* Statistiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex p-3 rounded-full bg-white shadow-lg mb-3 group-hover:scale-110 transition-transform ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Grid améliorée */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${service.borderColor} border-2 overflow-hidden`}>
                <div className={`h-2 ${service.color.replace('from-', 'bg-').replace('-50', '-400').replace('to-blue-100', '').replace('to-green-100', '').replace('to-purple-100', '').replace('to-orange-100', '')}`}></div>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full ${service.color} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 text-sm text-gray-500">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Delivery Zone améliorée */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl mb-16 border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-batiplus-blue-100 text-batiplus-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Zones de Couverture
              </div>
              <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">
                Livraison dans tout <span className="text-batiplus-blue-500">Libreville</span>
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Nous couvrons l'ensemble du Grand Libreville avec des créneaux
                adaptés à vos contraintes de chantier et des tarifs transparents.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {zones.map((zone, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-batiplus-blue-50 transition-colors">
                    <div className="w-2 h-2 bg-batiplus-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">{zone}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-batiplus-orange-500" />
                  <span className="font-medium">Délai: 2-4h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-batiplus-orange-500" />
                  <span className="font-medium">À partir de 15.000 FCFA</span>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={handleDeliveryCalculator}
                className="bg-batiplus-blue-500 hover:bg-batiplus-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Calculer les Frais de Livraison
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-batiplus-blue-600 via-batiplus-blue-700 to-batiplus-blue-800 rounded-3xl p-8 text-white shadow-2xl">
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                
                <h4 className="text-2xl font-bold mb-6">Contact Direct</h4>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10">
                    <div className="bg-batiplus-orange-400 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">+241 62 02 11 11</p>
                      <p className="text-sm text-batiplus-blue-200">Service client premium</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10">
                    <div className="bg-batiplus-orange-400 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Zone Industrielle Oloumi</p>
                      <p className="text-sm text-batiplus-blue-200">Akanda Beaulieu, Libreville</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/10">
                    <div className="bg-batiplus-orange-400 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Lun-Ven 8h-18h</p>
                      <p className="text-sm text-batiplus-blue-200">Sam 8h-12h30</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleContactCall}
                  className="w-full mt-8 border-2 border-white text-white hover:bg-white hover:text-batiplus-blue-700 font-semibold py-3 rounded-xl transition-all"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Nous Contacter Maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact amélioré */}
        <div className="text-center bg-gradient-to-r from-batiplus-orange-50 via-orange-50 to-red-50 rounded-3xl p-10 border border-orange-200">
          <div className="inline-block bg-batiplus-orange-500 p-4 rounded-full mb-6">
            <Phone className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
            Service d'Urgence <span className="text-batiplus-orange-500">24h/24</span>
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Chantier bloqué ? Matériaux manquants ? Notre équipe d'intervention rapide 
            est disponible pour vos urgences, même les weekends et jours fériés.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleContactCall}
              className="bg-batiplus-orange-500 hover:bg-batiplus-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="h-5 w-5 mr-2" />
              Appel d'Urgence
            </Button>
            <p className="text-sm text-gray-500">
              Intervention sous 2h maximum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
