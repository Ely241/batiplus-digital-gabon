import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Minus, Download, Calculator, Package, Hammer, Wrench, Zap, Droplet, Palette, Shield, Home, Waves, Battery, Truck, MapPin, Filter, SortAsc, Star } from 'lucide-react';
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
  isPopular?: boolean;
  image?: string;
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

interface ComprehensiveProductCatalogProps {
  onSelectedProductsChange?: (products: SelectedProduct[]) => void;
}

const ComprehensiveProductCatalog = ({ onSelectedProductsChange }: ComprehensiveProductCatalogProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
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
    { id: '1', name: 'Fer à béton Ø8mm', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 8500, unit: 'barre 12m', description: 'Fer à béton haute adhérence', inStock: true, isPopular: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop' },
    { id: '2', name: 'Fer à béton Ø10mm', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 12000, unit: 'barre 12m', description: 'Fer à béton haute adhérence', inStock: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop' },
    { id: '3', name: 'Ciment Portland CPA 55', category: 'gros-oeuvre', subcategory: 'Ciment & Béton', price: 4500, unit: 'sac 50kg', description: 'Ciment Portland certifié', inStock: true, isPopular: true, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop' },
    { id: '4', name: 'Béton prêt C25/30', category: 'gros-oeuvre', subcategory: 'Ciment & Béton', price: 85000, unit: 'm³', description: 'Béton prêt à l\'emploi', inStock: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop' },
    { id: '5', name: 'Treillis soudé ST25', category: 'gros-oeuvre', subcategory: 'Acier & Fer à Béton', price: 15000, unit: 'panneau 2x3m', description: 'Treillis soudé pour dallage', inStock: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop' },

    // Électricité & Éclairage
    { id: '6', name: 'Tableau électrique 4 modules', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Schneider Electric', price: 25000, unit: 'pièce', description: 'Tableau électrique 4 modules', inStock: true, image: 'https://images.unsplash.com/photo-1621905252472-e945b8bc4b23?w=300&h=200&fit=crop' },
    { id: '7', name: 'Câble H07V-U 2.5mm²', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Legrand', price: 1200, unit: 'mètre', description: 'Câble électrique unifilaire', inStock: true, isPopular: true, image: 'https://images.unsplash.com/photo-1621905252472-e945b8bc4b23?w=300&h=200&fit=crop' },
    { id: '8', name: 'Projecteur LED 50W', category: 'electricite', subcategory: 'Luminaires', brand: 'Eglo', price: 18000, unit: 'pièce', description: 'Projecteur LED extérieur', inStock: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
    { id: '9', name: 'Prise 2P+T', category: 'electricite', subcategory: 'Équipements Électriques', brand: 'Legrand', price: 3500, unit: 'pièce', description: 'Prise de courant étanche', inStock: true, image: 'https://images.unsplash.com/photo-1621905252472-e945b8bc4b23?w=300&h=200&fit=crop' },

    // Carrelage & Revêtements
    { id: '10', name: 'Carrelage poli 60x60', category: 'carrelage', subcategory: 'Carrelage Sol & Mur', brand: 'Pamesa', price: 12000, unit: 'm²', description: 'Carrelage poli brillant', inStock: true, isPopular: true, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
    { id: '11', name: 'Faïence salle de bain 30x60', category: 'carrelage', subcategory: 'Carrelage Sol & Mur', brand: 'STN Cerámica', price: 8500, unit: 'm²', description: 'Faïence moderne', inStock: true, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
    { id: '12', name: 'Colle carrelage C2', category: 'carrelage', subcategory: 'Accessoires Pose', price: 4500, unit: 'sac 25kg', description: 'Colle carrelage haute performance', inStock: true, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop' },
    { id: '13', name: 'Outils carreleur Rubi', category: 'carrelage', subcategory: 'Accessoires Pose', brand: 'Rubi', price: 35000, unit: 'kit', description: 'Kit complet carreleur', inStock: true, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop' },

    // Sanitaire & Plomberie
    { id: '14', name: 'WC suspendu', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Jacob Delafon', price: 85000, unit: 'pièce', description: 'WC suspendu avec mécanisme', inStock: true, image: 'https://images.unsplash.com/photo-1584622781564-1d987468c7b1?w=300&h=200&fit=crop' },
    { id: '15', name: 'Lavabo 60cm', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Roca', price: 45000, unit: 'pièce', description: 'Lavabo porcelaine blanche', inStock: true, image: 'https://images.unsplash.com/photo-1584622781564-1d987468c7b1?w=300&h=200&fit=crop' },
    { id: '16', name: 'Robinet mitigeur', category: 'sanitaire', subcategory: 'Équipements Sanitaires', brand: 'Hansgrohe', price: 65000, unit: 'pièce', description: 'Mitigeur lavabo chromé', inStock: true, image: 'https://images.unsplash.com/photo-1584622781564-1d987468c7b1?w=300&h=200&fit=crop' },
    { id: '17', name: 'Tube PVC Ø100', category: 'sanitaire', subcategory: 'Plomberie Technique', price: 2500, unit: 'mètre', description: 'Tube PVC évacuation', inStock: true, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop' },
    { id: '18', name: 'Pompe surpresseur', category: 'sanitaire', subcategory: 'Plomberie Technique', brand: 'DAB', price: 125000, unit: 'pièce', description: 'Surpresseur automatique', inStock: true, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop' },

    // Peinture & Finitions
    { id: '19', name: 'Peinture acrylique mate', category: 'peinture', subcategory: 'Peintures', brand: 'Astral', price: 15000, unit: 'pot 15L', description: 'Peinture intérieure mate', inStock: true, promotion: 15, isPopular: true, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop' },
    { id: '20', name: 'Peinture façade', category: 'peinture', subcategory: 'Peintures', brand: 'Astral', price: 18000, unit: 'pot 15L', description: 'Peinture extérieure', inStock: true, promotion: 15, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop' },
    { id: '21', name: 'Enduit de façade', category: 'peinture', subcategory: 'Peintures', price: 12000, unit: 'sac 25kg', description: 'Enduit décoratif extérieur', inStock: true, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop' },
    { id: '22', name: 'Membrane étanchéité', category: 'peinture', subcategory: 'Étanchéité', brand: 'Sika', price: 25000, unit: 'rouleau 10m²', description: 'Membrane bitumineuse', inStock: true, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop' },

    // Outillage & Équipements
    { id: '23', name: 'Perceuse 18V', category: 'outillage', subcategory: 'Outillage Électroportatif', brand: 'Black & Decker', price: 45000, unit: 'pièce', description: 'Perceuse sans fil avec batterie', inStock: true, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop' },
    { id: '24', name: 'Meuleuse 125mm', category: 'outillage', subcategory: 'Outillage Électroportatif', brand: 'Total Tools', price: 35000, unit: 'pièce', description: 'Meuleuse d\'angle 125mm', inStock: true, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop' },
    { id: '25', name: 'Kit outils Stanley', category: 'outillage', subcategory: 'Outillage Manuel', brand: 'Stanley', price: 25000, unit: 'kit', description: 'Kit 50 outils manuels', inStock: true, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop' },

    // Serrurerie & Sécurité
    { id: '26', name: 'Serrure 3 points', category: 'serrurerie', subcategory: 'Serrurerie', price: 85000, unit: 'pièce', description: 'Serrure haute sécurité', inStock: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
    { id: '27', name: 'Coffre-fort numérique', category: 'serrurerie', subcategory: 'Serrurerie', price: 125000, unit: 'pièce', description: 'Coffre-fort électronique', inStock: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
    { id: '28', name: 'Grillage galvanisé', category: 'serrurerie', subcategory: 'Serrurerie', price: 8500, unit: 'm²', description: 'Grillage de clôture', inStock: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },

    // Aménagement Intérieur
    { id: '29', name: 'Plaque plâtre BA13', category: 'amenagement', subcategory: 'Faux Plafonds', price: 2500, unit: 'plaque 2.5x1.2m', description: 'Plaque de plâtre standard', inStock: true, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
    { id: '30', name: 'Rail métallique', category: 'amenagement', subcategory: 'Faux Plafonds', price: 1200, unit: 'mètre', description: 'Rail pour cloison', inStock: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop' },
    { id: '31', name: 'Tringle rideau automatisée', category: 'amenagement', subcategory: 'Articles de Rideaux', brand: 'Somfy', price: 85000, unit: 'kit 3m', description: 'Tringle motorisée', inStock: true, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },

    // Piscine & Extérieur
    { id: '32', name: 'Pompe filtration piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 185000, unit: 'pièce', description: 'Pompe 0.75 CV', inStock: true, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop' },
    { id: '33', name: 'Chlore piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 15000, unit: 'bidon 5kg', description: 'Chlore granulés', inStock: true, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop' },
    { id: '34', name: 'Projecteur LED piscine', category: 'piscine', subcategory: 'Matériel Piscine', brand: 'Astralpool', price: 125000, unit: 'pièce', description: 'Éclairage subaquatique RGB', inStock: true, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop' },

    // Énergie & Groupes Électrogènes
    { id: '35', name: 'Groupe électrogène 5KVA', category: 'energie', subcategory: 'Alimentation Électrique', price: 285000, unit: 'pièce', description: 'Groupe essence 4 temps', inStock: true, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop' },
    { id: '36', name: 'Onduleur 1000W', category: 'energie', subcategory: 'Alimentation Électrique', price: 85000, unit: 'pièce', description: 'Onduleur pure sinus', inStock: true, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop' },
    { id: '37', name: 'Panneau solaire 300W', category: 'energie', subcategory: 'Alimentation Électrique', price: 125000, unit: 'pièce', description: 'Panneau monocristallin', inStock: true, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop' },
    { id: '38', name: 'Batterie 12V 100Ah', category: 'energie', subcategory: 'Alimentation Électrique', price: 65000, unit: 'pièce', description: 'Batterie AGM solaire', inStock: true, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop' }
  ];

  // Get unique brands for filter
  const brands = ['all', ...Array.from(new Set(products.filter(p => p.brand).map(p => p.brand)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

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

  // Notify parent component when selected products change
  useEffect(() => {
    if (onSelectedProductsChange) {
      onSelectedProductsChange(selectedProducts);
    }
  }, [selectedProducts, onSelectedProductsChange]);

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête amélioré */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-batiplus-black-500 mb-4">
            Catalogue Complet Batiplus
          </h2>
          <p className="text-xl text-batiplus-gray-600 max-w-3xl mx-auto mb-6">
            Plus de 1000 références depuis 1998 • Capital 1 milliard FCFA
          </p>
          <div className="flex justify-center space-x-8 text-sm text-batiplus-gray-500">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2 text-batiplus-red-500" />
              10 catégories
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-batiplus-red-500" />
              20+ marques premium
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-batiplus-red-500" />
              Livraison rapide
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres améliorés */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Rechercher un produit, marque, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Toutes les marques" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {brands.slice(1).map((brand) => (
                    <SelectItem key={brand} value={brand!}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filtres par catégorie améliorés */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
              className={selectedCategory === 'all' ? 'bg-batiplus-red-500 hover:bg-batiplus-red-600' : ''}
            >
              Toutes ({products.length})
            </Button>
            {categories.map((category) => {
              const categoryCount = products.filter(p => p.category === category.id).length;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className={selectedCategory === category.id ? 'bg-batiplus-red-500 hover:bg-batiplus-red-600' : ''}
                >
                  {category.name} ({categoryCount})
                </Button>
              );
            })}
          </div>

          {/* Statistiques des résultats */}
          <div className="text-sm text-batiplus-gray-600 mb-4">
            {sortedProducts.length} produits trouvés
            {searchQuery && ` pour "${searchQuery}"`}
            {selectedCategory !== 'all' && ` dans ${categories.find(c => c.id === selectedCategory)?.name}`}
          </div>
        </div>

        {/* Calculateur sélectionné - keep existing code */}
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

        {/* Grille des produits avec images améliorées */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.promotion && (
                    <Badge className="bg-red-500 text-white text-xs">-{product.promotion}%</Badge>
                  )}
                  {product.isPopular && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs bg-white/90">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-batiplus-red-600 transition-colors">
                  {product.name}
                </h3>
                
                {product.brand && (
                  <p className="text-sm text-blue-600 font-medium mb-1">{product.brand}</p>
                )}
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
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
                    className="bg-batiplus-red-500 hover:bg-batiplus-red-600 group-hover:scale-105 transition-transform"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && <PaginationEllipsis />}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche ou de navigation.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                }}
                variant="outline"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComprehensiveProductCatalog;
