import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, Download, Calculator, Package, Hammer, Wrench, Zap, Droplet, Palette, Shield, Home, Waves, Battery, Truck, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand?: string;
  price: number;
  unit: string;
  description: string;
  inStock: boolean;
  promotion?: number;
}

interface SelectedProduct extends Product {
  quantity: number;
}

interface DeliveryOption {
  id: string;
  zone: string;
  price: number;
  duration: string;
}

const ComprehensiveProductCatalog = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const deliveryZones: DeliveryOption[] = [
    { id: 'centre', zone: 'Centre-ville', price: 15000, duration: '2-3h' },
    { id: 'akanda', zone: 'Akanda', price: 18000, duration: '3-4h' },
    { id: 'oloumi', zone: 'Oloumi', price: 12000, duration: '1-2h' },
    { id: 'batterie4', zone: 'Batterie IV', price: 20000, duration: '3-4h' },
    { id: 'lalala', zone: 'Lalala', price: 25000, duration: '4-5h' },
    { id: 'nombakel', zone: 'Nombakélé', price: 22000, duration: '4-5h' },
    { id: 'autre', zone: 'Autre zone Libreville', price: 30000, duration: '5-6h' }
  ];

  const categories = [
    { id: 'gros-oeuvre', name: 'Gros Œuvre & Structure', icon: Package, color: 'bg-gray-50' },
    { id: 'electricite', name: 'Électricité & Éclairage', icon: Zap, color: 'bg-yellow-50' },
    { id: 'carrelage', name: 'Carrelage & Revêtements', icon: Home, color: 'bg-blue-50' },
    { id: 'sanitaire', name: 'Sanitaire & Plomberie', icon: Droplet, color: 'bg-cyan-50' },
    { id: 'peinture', name: 'Peinture & Finitions', icon: Palette, color: 'bg-purple-50' },
    { id: 'outillage', name: 'Outillage & Équipements', icon: Hammer, color: 'bg-orange-50' },
    { id: 'serrurerie', name: 'Serrurerie & Sécurité', icon: Shield, color: 'bg-red-50' },
    { id: 'amenagement', name: 'Aménagement Intérieur', icon: Wrench, color: 'bg-green-50' },
    { id: 'piscine', name: 'Piscine & Extérieur', icon: Waves, color: 'bg-teal-50' },
    { id: 'energie', name: 'Énergie & Groupes Électrogènes', icon: Battery, color: 'bg-indigo-50' }
  ];

  const products: Product[] = [
    // Gros Œuvre & Structure
    { id: '1', name: 'Fer à béton Ø8mm', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 8500, unit: 'barre 12m', description: 'Fer à béton haute adhérence', inStock: true },
    { id: '2', name: 'Fer à béton Ø10mm', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 12000, unit: 'barre 12m', description: 'Fer à béton haute adhérence', inStock: true },
    { id: '3', name: 'Ciment Portland CPA 55', category: 'gros-oeuvre', subcategory: 'Ciment & Béton', price: 4500, unit: 'sac 50kg', description: 'Ciment Portland certifié', inStock: true },
    { id: '4', name: 'Béton prêt C25/30', category: 'gros-oeuvre', subcategory: 'Ciment & Béton', price: 85000, unit: 'm³', description: 'Béton prêt à l\'emploi', inStock: true },
    { id: '5', name: 'Treillis soudé ST25', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 15000, unit: 'panneau 2x3m', description: 'Treillis soudé pour dallage', inStock: true },

    // Électricité & Éclairage
    { id: '6', name: 'Tableau électrique 4 modules', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Schneider Electric', price: 25000, unit: 'pièce', description: 'Tableau électrique 4 modules', inStock: true },
    { id: '7', name: 'Câble H07V-U 2.5mm²', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Legrand', price: 1200, unit: 'mètre', description: 'Câble électrique unifilaire', inStock: true },
    { id: '8', name: 'Projecteur LED 50W', category: 'electricite', subcategory: 'Luminaires', brand: 'Eglo', price: 18000, unit: 'pièce', description: 'Projecteur LED extérieur', inStock: true },
    { id: '9', name: 'Prise 2P+T', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Legrand', price: 3500, unit: 'pièce', description: 'Prise de courant étanche', inStock: true },

    // Carrelage & Revêtements
    { id: '10', name: 'Carrelage poli 60x60', category: 'carrelage', subcategory: 'Carrelage Sol & Mur', brand: 'Pamesa', price: 12000, unit: 'm²', description: 'Carrelage poli brillant', inStock: true },
    { id: '11', name: 'Faïence salle de bain 30x60', category: 'carrelage', subcategory: 'Carrelage Sol & Mur', brand: 'STN Cerámica', price: 8500, unit: 'm²', description: 'Faïence moderne', inStock: true },
    { id: '12', name: 'Colle carrelage C2', category: 'carrelage', subcategory: 'Accessoires Pose', price: 4500, unit: 'sac 25kg', description: 'Colle carrelage haute performance', inStock: true },
    { id: '13', name: 'Outils carreleur Rubi', category: 'carrelage', subcategory: 'Accessoires Pose', brand: 'Rubi', price: 35000, unit: 'kit', description: 'Kit complet carreleur', inStock: true },

    // Sanitaire & Plomberie
    { id: '14', name: 'WC suspendu', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Jacob Delafon', price: 85000, unit: 'pièce', description: 'WC suspendu avec mécanisme', inStock: true },
    { id: '15', name: 'Lavabo 60cm', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Roca', price: 45000, unit: 'pièce', description: 'Lavabo porcelaine blanche', inStock: true },
    { id: '16', name: 'Robinet mitigeur', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Hansgrohe', price: 65000, unit: 'pièce', description: 'Mitigeur lavabo chromé', inStock: true },
    { id: '17', name: 'Tube PVC Ø100', category: 'sanitaire', subcategory: 'Plomberie Technique', price: 2500, unit: 'mètre', description: 'Tube PVC évacuation', inStock: true },
    { id: '18', name: 'Pompe surpresseur', category: 'sanitaire', subcategory: 'Plomberie Technique', brand: 'DAB', price: 125000, unit: 'pièce', description: 'Surpresseur automatique', inStock: true },

    // Peinture & Finitions
    { id: '19', name: 'Peinture acrylique mate', category: 'peinture', subcategory: 'Peintures', brand: 'Astral', price: 15000, unit: 'pot 15L', description: 'Peinture intérieure mate', inStock: true, promotion: 15 },
    { id: '20', name: 'Peinture façade', category: 'peinture', subcategory: 'Peintures', brand: 'Astral', price: 18000, unit: 'pot 15L', description: 'Peinture extérieure', inStock: true, promotion: 15 },
    { id: '21', name: 'Enduit de façade', category: 'peinture', subcategory: 'Peintures', price: 12000, unit: 'sac 25kg', description: 'Enduit décoratif extérieur', inStock: true },
    { id: '22', name: 'Membrane étanchéité', category: 'peinture', subcategory: 'Étanchéité', brand: 'Sika', price: 25000, unit: 'rouleau 10m²', description: 'Membrane bitumineuse', inStock: true },

    // Outillage & Équipements
    { id: '23', name: 'Perceuse 18V', category: 'outillage', subcategory: 'Outillage Électroportatif', brand: 'Black & Decker', price: 45000, unit: 'pièce', description: 'Perceuse sans fil avec batterie', inStock: true },
    { id: '24', name: 'Meuleuse 125mm', category: 'outillage', subcategory: 'Outillage Électroportatif', brand: 'Total Tools', price: 35000, unit: 'pièce', description: 'Meuleuse d\'angle 125mm', inStock: true },
    { id: '25', name: 'Kit outils Stanley', category: 'outillage', subcategory: 'Outillage Manuel', brand: 'Stanley', price: 25000, unit: 'kit', description: 'Kit 50 outils manuels', inStock: true },

    // Serrurerie & Sécurité
    { id: '26', name: 'Serrure 3 points', category: 'serrurerie', subcategory: 'Serrurerie', price: 85000, unit: 'pièce', description: 'Serrure haute sécurité', inStock: true },
    { id: '27', name: 'Coffre-fort numérique', category: 'serrurerie', subcategory: 'Serrurerie', price: 125000, unit: 'pièce', description: 'Coffre-fort électronique', inStock: true },
    { id: '28', name: 'Grillage galvanisé', category: 'serrurerie', subcategory: 'Serrurerie', price: 8500, unit: 'm²', description: 'Grillage de clôture', inStock: true },

    // Aménagement Intérieur
    { id: '29', name: 'Plaque plâtre BA13', category: 'amenagement', subcategory: 'Faux Plafonds', price: 2500, unit: 'plaque 2.5x1.2m', description: 'Plaque de plâtre standard', inStock: true },
    { id: '30', name: 'Rail métallique', category: 'amenagement', subcategory: 'Faux Plafonds', price: 1200, unit: 'mètre', description: 'Rail pour cloison', inStock: true },
    { id: '31', name: 'Tringle rideau automatisée', category: 'amenagement', subcategory: 'Articles de Rideaux', brand: 'Somfy', price: 85000, unit: 'kit 3m', description: 'Tringle motorisée', inStock: true },

    // Piscine & Extérieur
    { id: '32', name: 'Pompe filtration piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 185000, unit: 'pièce', description: 'Pompe 0.75 CV', inStock: true },
    { id: '33', name: 'Chlore piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 15000, unit: 'bidon 5kg', description: 'Chlore granulés', inStock: true },
    { id: '34', name: 'Projecteur LED piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 125000, unit: 'pièce', description: 'Éclairage subaquatique RGB', inStock: true },

    // Énergie & Groupes Électrogènes
    { id: '35', name: 'Groupe électrogène 5KVA', category: 'energie', subcategory: 'Alimentation Électrique', price: 285000, unit: 'pièce', description: 'Groupe essence 4 temps', inStock: true },
    { id: '36', name: 'Onduleur 1000W', category: 'energie', subcategory: 'Alimentation Électrique', price: 85000, unit: 'pièce', description: 'Onduleur pure sinus', inStock: true },
    { id: '37', name: 'Panneau solaire 300W', category: 'energie', subcategory: 'Alimentation Électrique', price: 125000, unit: 'pièce', description: 'Panneau monocristallin', inStock: true },
    { id: '38', name: 'Batterie 12V 100Ah', category: 'energie', subcategory: 'Alimentation Électrique', price: 65000, unit: 'pièce', description: 'Batterie AGM solaire', inStock: true }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addProduct = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (productId: string) => {
    const existingProduct = selectedProducts.find(p => p.id === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      ));
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    }
  };

  const getTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      const price = product.promotion 
        ? product.price * (1 - product.promotion / 100)
        : product.price;
      return total + (price * product.quantity);
    }, 0);
  };

  const getFinalTotal = () => {
    const productsTotal = getTotalPrice();
    const deliveryPrice = selectedDelivery ? selectedDelivery.price : 0;
    return productsTotal + deliveryPrice;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(20);
    doc.text('BATIPLUS - Liste de Prix', 20, 20);
    doc.setFontSize(12);
    doc.text('Zone Industrielle Oloumi & Akanda Beaulieu, Libreville', 20, 30);
    doc.text('Tél: +241 62 02 11 11', 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 40);
    
    // Ligne de séparation
    doc.line(20, 45, 190, 45);
    
    // Informations livraison si sélectionnée
    let y = 55;
    if (selectedDelivery && deliveryAddress) {
      doc.setFontSize(12);
      doc.text('LIVRAISON À DOMICILE', 20, y);
      y += 8;
      doc.setFontSize(10);
      doc.text(`Adresse: ${deliveryAddress}`, 20, y);
      y += 5;
      doc.text(`Zone: ${selectedDelivery.zone}`, 20, y);  
      y += 5;
      doc.text(`Délai: ${selectedDelivery.duration}`, 20, y);
      y += 5;
      doc.text(`Frais livraison: ${selectedDelivery.price.toLocaleString()} FCFA`, 20, y);
      y += 10;
      doc.line(20, y, 190, y);
      y += 10;
    }
    
    // Tableau des produits
    doc.setFontSize(10);
    doc.text('Produit', 20, y);
    doc.text('Qté', 100, y);
    doc.text('Prix Unit.', 130, y);
    doc.text('Total', 170, y);
    
    y += 5;
    doc.line(20, y, 190, y);
    y += 10;
    
    selectedProducts.forEach((product) => {
      const unitPrice = product.promotion 
        ? product.price * (1 - product.promotion / 100)
        : product.price;
      const totalPrice = unitPrice * product.quantity;
      
      doc.text(`${product.name} (${product.unit})`, 20, y);
      if (product.promotion) {
        doc.text(`-${product.promotion}%`, 80, y);
      }
      doc.text(product.quantity.toString(), 100, y);
      doc.text(`${unitPrice.toLocaleString()} F`, 130, y);
      doc.text(`${totalPrice.toLocaleString()} F`, 170, y);
      y += 10;
      
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Sous-total et frais de livraison
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(10);
    doc.text(`Sous-total produits: ${getTotalPrice().toLocaleString()} FCFA`, 20, y);
    
    if (selectedDelivery) {
      y += 8;
      doc.text(`Frais de livraison: ${selectedDelivery.price.toLocaleString()} FCFA`, 20, y);
    }
    
    // Total général
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`TOTAL GÉNÉRAL: ${getFinalTotal().toLocaleString()} FCFA`, 20, y);
    
    // Note de bas de page
    y += 20;
    doc.setFontSize(8);
    doc.text('Ce document est à présenter en magasin pour faciliter votre achat.', 20, y);
    doc.text('Prix indicatifs, susceptibles de variations selon les stocks.', 20, y + 5);
    if (selectedDelivery) {
      doc.text('Les frais de livraison peuvent varier selon les conditions d\'accès.', 20, y + 10);
    }
    
    doc.save(`batiplus-liste-prix-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Catalogue Complet Batiplus
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plus de 1000 références depuis 1998 • Capital 1 milliard FCFA
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Rechercher un produit, marque, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              Toutes les catégories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculateur sélectionné */}
        {selectedProducts.length > 0 && (
          <Card className="mb-8 bg-batiplus-red-50 border-batiplus-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold font-montserrat flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Ma Sélection ({selectedProducts.length} produits)
                </h3>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                    variant="outline"
                    className="border-batiplus-red-300 text-batiplus-red-600 hover:bg-batiplus-red-100"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Livraison
                  </Button>
                  <Button onClick={generatePDF} className="bg-batiplus-red-500 hover:bg-batiplus-red-600">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </div>
              </div>

              {/* Options de livraison */}
              {showDeliveryOptions && (
                <div className="mb-6 p-4 bg-white rounded-lg border border-batiplus-red-200">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Livraison à domicile
                  </h4>
                  
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Adresse de livraison complète..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mb-3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {deliveryZones.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedDelivery(zone)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedDelivery?.id === zone.id
                            ? 'border-batiplus-red-500 bg-batiplus-red-50'
                            : 'border-gray-200 hover:border-batiplus-red-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{zone.zone}</div>
                        <div className="text-xs text-gray-600">Délai: {zone.duration}</div>
                        <div className="text-sm font-semibold text-batiplus-red-600">
                          {zone.price.toLocaleString()} FCFA
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded">
                    <div className="flex-1">
                      <span className="font-medium">{product.name}</span>
                      {product.promotion && (
                        <Badge className="ml-2 bg-red-100 text-red-800">-{product.promotion}%</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeProduct(product.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2">{product.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addProduct(product)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-lg">
                  Sous-total: {getTotalPrice().toLocaleString()} FCFA
                </div>
                {selectedDelivery && (
                  <div className="text-lg">
                    Livraison {selectedDelivery.zone}: {selectedDelivery.price.toLocaleString()} FCFA
                  </div>
                )}
                <div className="text-2xl font-bold text-batiplus-red-600">
                  Total: {getFinalTotal().toLocaleString()} FCFA
                </div>
                <p className="text-sm text-gray-600">
                  Document PDF à présenter en magasin pour faciliter votre achat
                  {selectedDelivery && " ou pour confirmer votre livraison"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grille des produits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                  {product.promotion && (
                    <Badge className="bg-red-500 text-white">-{product.promotion}%</Badge>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                {product.brand && (
                  <p className="text-sm text-blue-600 font-medium mb-1">{product.brand}</p>
                )}
                
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-xs text-gray-500 mb-3">Unité: {product.unit}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    {product.promotion ? (
                      <div>
                        <span className="text-lg font-bold text-batiplus-red-600">
                          {(product.price * (1 - product.promotion / 100)).toLocaleString()} F
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.price.toLocaleString()} F
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {product.price.toLocaleString()} F
                      </span>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => addProduct(product)}
                    className="bg-batiplus-red-500 hover:bg-batiplus-red-600"
                    disabled={!product.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {!product.inStock && (
                  <p className="text-red-500 text-xs mt-2">Rupture de stock</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComprehensiveProductCatalog;
