
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-batiplus-orange-500 text-white p-2 rounded-lg font-bold">
                <span className="text-xl font-montserrat">B+</span>
              </div>
              <div>
                <h3 className="text-xl font-montserrat font-bold">Batiplus</h3>
                <p className="text-sm text-gray-400">Matériaux de Construction</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leader des matériaux de construction au Gabon depuis plus de 20 ans. 
              Qualité professionnelle, service client exceptionnel.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#catalog" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Catalogue</a></li>
              <li><a href="#calculators" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Calculateurs</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Promotions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Projets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-batiplus-orange-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-batiplus-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Avenue Akandé</p>
                  <p className="text-gray-400">Libreville, Gabon</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-batiplus-orange-500" />
                <p className="text-gray-300">+241 62 02 11 11</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-batiplus-orange-500" />
                <p className="text-gray-300">contact@batiplus.ga</p>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-batiplus-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">Lun-Ven: 8h-18h</p>
                  <p className="text-gray-400">Sam: 8h-12h30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-4">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Recevez nos promotions et conseils techniques par email.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-batiplus-orange-500 hover:bg-batiplus-orange-600">
                S'abonner
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Pas de spam, seulement du contenu de qualité.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Batiplus Digital Gabon. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-batiplus-orange-500 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-batiplus-orange-500 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-batiplus-orange-500 transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
