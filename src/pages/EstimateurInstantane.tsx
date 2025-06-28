
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Calculator, Plus, Minus, Truck, Clock, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import jsPDF from 'jspdf';

interface DeliveryOption {
  id: string;
  zone: string;
  price: number;
  duration: string;
}

const EstimateurInstantane = () => {
  const navigate = useNavigate();
  const { selectedProducts, addProduct, removeProduct, getTotalPrice, getTotalQuantity } = useProducts();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const deliveryZones: DeliveryOption[] = [
    { id: 'centre', zone: 'Centre-ville', price: 15000, duration: '2-3h' },
    { id: 'akanda', zone: 'Akanda', price: 18000, duration: '3-4h' },
    { id: 'oloumi', zone: 'Oloumi', price: 12000, duration: '1-2h' },
    { id: 'batterie4', zone: 'Batterie IV', price: 20000, duration: '3-4h' },
    { id: 'lalala', zone: 'Lalala', price: 25000, duration: '4-5h' },
    { id: 'nombakel', zone: 'Nombakélé', price: 22000, duration: '4-5h' },
    { id: 'autre', zone: 'Autre zone Libreville', price: 30000, duration: '5-6h' }
  ];

  const getFinalTotal = () => {
    const productsTotal = getTotalPrice();
    const deliveryPrice = selectedDelivery ? selectedDelivery.price : 0;
    return productsTotal + deliveryPrice;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // En-tête amélioré
    doc.setFontSize(22);
    doc.text('BATIPLUS - Estimateur Instantané', 20, 20);
    doc.setFontSize(12);
    doc.text('Zone Industrielle Oloumi & Akanda Beaulieu, Libreville', 20, 30);
    doc.text('Tél: +241 62 02 11 11', 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 40);
    
    // Informations client
    let y = 50;
    if (customerName || customerPhone) {
      doc.setFontSize(14);
      doc.text('INFORMATIONS CLIENT', 20, y);
      y += 8;
      doc.setFontSize(10);
      if (customerName) {
        doc.text(`Nom: ${customerName}`, 20, y);
        y += 5;
      }
      if (customerPhone) {
        doc.text(`Téléphone: ${customerPhone}`, 20, y);
        y += 5;
      }
      y += 5;
    }
    
    // Ligne de séparation
    doc.line(20, y, 190, y);
    y += 10;
    
    // Informations livraison
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
    
    // Total
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(10);
    doc.text(`Sous-total produits: ${getTotalPrice().toLocaleString()} FCFA`, 20, y);
    
    if (selectedDelivery) {
      y += 8;
      doc.text(`Frais de livraison: ${selectedDelivery.price.toLocaleString()} FCFA`, 20, y);
    }
    
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL GÉNÉRAL: ${getFinalTotal().toLocaleString()} FCFA`, 20, y);
    
    // Note de bas de page
    y += 20;
    doc.setFontSize(8);
    doc.text('Estimation valable 48h - À présenter en magasin', 20, y);
    doc.text('Prix indicatifs susceptibles de variations selon stocks', 20, y + 5);
    
    doc.save(`batiplus-estimation-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour au catalogue</span>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold font-montserrat text-batiplus-black-500">
                  Estimateur Instantané
                </h1>
                <p className="text-sm text-batiplus-gray-500">
                  Calculez votre budget en temps réel
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-batiplus-red-600">
                  {getFinalTotal().toLocaleString()} FCFA
                </div>
                <div className="text-sm text-gray-500">
                  {selectedProducts.length} produit{selectedProducts.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section principale - Liste des produits */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Mes Produits Sélectionnés
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun produit sélectionné
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Retournez au catalogue pour ajouter des produits à votre estimation
                    </p>
                    <Button onClick={() => navigate('/')} className="bg-batiplus-red-500 hover:bg-batiplus-red-600">
                      Parcourir le catalogue
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedProducts.map((product) => (
                      <Card key={product.id} className="border-l-4 border-l-batiplus-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                {product.promotion && (
                                  <Badge className="bg-red-100 text-red-800">
                                    -{product.promotion}%
                                  </Badge>
                                )}
                                {product.isPopular && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Star className="h-3 w-3 mr-1" />
                                    Populaire
                                  </Badge>
                                )}
                              </div>
                              {product.brand && (
                                <p className="text-sm text-blue-600 font-medium mb-1">{product.brand}</p>
                              )}
                              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                              <p className="text-xs text-gray-500">Unité: {product.unit}</p>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                {product.promotion ? (
                                  <div>
                                    <div className="text-lg font-bold text-batiplus-red-600">
                                      {(product.price * (1 - product.promotion / 100)).toLocaleString()} F
                                    </div>
                                    <div className="text-sm text-gray-500 line-through">
                                      {product.price.toLocaleString()} F
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-lg font-bold text-gray-900">
                                    {product.price.toLocaleString()} F
                                  </div>
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
                                <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                                  {product.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addProduct(product)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Résumé et options */}
          <div className="space-y-6">
            {/* Informations client */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-900">Mes Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre nom..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-gray-300 focus:border-batiplus-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+241 XX XX XX XX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="border-gray-300 focus:border-batiplus-red-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Options de livraison */}
            {selectedProducts.length > 0 && (
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-gray-900">
                    <Truck className="h-5 w-5 mr-2 text-batiplus-red-600" />
                    Livraison à Domicile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse complète
                    </label>
                    <Input
                      type="text"
                      placeholder="Votre adresse de livraison..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="border-gray-300 focus:border-batiplus-red-500"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Zone de livraison
                    </label>
                    {deliveryZones.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedDelivery(zone)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedDelivery?.id === zone.id
                            ? 'border-batiplus-red-500 bg-red-50 ring-2 ring-batiplus-red-200'
                            : 'border-gray-200 hover:border-batiplus-red-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{zone.zone}</div>
                            <div className="text-xs text-gray-600 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {zone.duration}
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-batiplus-red-600">
                            {zone.price.toLocaleString()} F
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Résumé de l'estimation */}
            {selectedProducts.length > 0 && (
              <Card className="bg-white border-batiplus-red-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-batiplus-red-500 to-batiplus-red-600 text-white rounded-t-lg">
                  <CardTitle className="text-white font-semibold">
                    Résumé de l'Estimation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Sous-total produits:</span>
                    <span className="font-bold text-gray-900 text-lg">
                      {getTotalPrice().toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  {selectedDelivery && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">Livraison {selectedDelivery.zone}:</span>
                      <span className="font-bold text-gray-900 text-lg">
                        {selectedDelivery.price.toLocaleString()} FCFA
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-batiplus-red-200 pt-4">
                    <div className="flex justify-between text-xl font-bold bg-batiplus-red-50 p-3 rounded-lg">
                      <span className="text-batiplus-red-800">Total Général:</span>
                      <span className="text-batiplus-red-800">{getFinalTotal().toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={generatePDF} 
                      className="w-full bg-batiplus-red-500 hover:bg-batiplus-red-600 text-white font-semibold py-3"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger l'Estimation PDF
                    </Button>
                    
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg space-y-2">
                      <div className="flex items-center justify-center font-medium">
                        <Shield className="h-3 w-3 mr-1 text-green-600" />
                        Estimation valable 48h
                      </div>
                      <div className="text-center">À présenter en magasin pour finaliser votre achat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateurInstantane;
