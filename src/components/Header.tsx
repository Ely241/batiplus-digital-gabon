
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, Calculator, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalQuantity } = useProducts();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToEstimateur = () => {
    navigate('/estimateur');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const totalQuantity = getTotalQuantity();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-batiplus-black-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+241 62 02 11 11</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Zone Industrielle Oloumi & Akanda Beaulieu</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Lun-Sam 8h-18h | 26 ans d'expérience</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-batiplus-black-500 text-white p-2 rounded-lg font-bold">
              <span className="text-xl font-montserrat">B+</span>
            </div>
            <div>
              <h1 className="text-xl font-montserrat font-bold">
                <span className="text-batiplus-black-500">Bati</span>
                <span className="text-batiplus-red-500">plus</span>
              </h1>
              <p className="text-xs text-batiplus-gray-500">Matériaux de Construction</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Rechercher des matériaux..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-batiplus-red-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors"
            >
              Catalogue
            </button>
            <button 
              onClick={() => scrollToSection('calculators')} 
              className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors"
            >
              Calculateurs
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors"
            >
              Services
            </button>
            <Button 
              onClick={navigateToEstimateur}
              className="bg-batiplus-red-500 hover:bg-batiplus-red-600 relative"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Estimateur Instantané
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-batiplus-black-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-batiplus-black-500"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher des matériaux..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('catalog')} 
                className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors text-left"
              >
                Catalogue
              </button>
              <button 
                onClick={() => scrollToSection('calculators')} 
                className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors text-left"
              >
                Calculateurs
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-700 hover:text-batiplus-black-500 font-medium transition-colors text-left"
              >
                Services
              </button>
              <Button 
                size="sm" 
                onClick={navigateToEstimateur}
                className="bg-batiplus-red-500 hover:bg-batiplus-red-600 relative self-start"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Estimateur Instantané
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-batiplus-black-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
