
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Package, Palette, Hammer, Download } from 'lucide-react';

interface CalculatorSectionProps {
  activeCalculator: string | null;
  setActiveCalculator: (calculator: string | null) => void;
}

const CalculatorSection = ({ activeCalculator, setActiveCalculator }: CalculatorSectionProps) => {
  const [betonInputs, setBetonInputs] = useState({
    longueur: '',
    largeur: '',
    epaisseur: ''
  });

  const [peintureInputs, setPeintureInputs] = useState({
    surface: '',
    couches: '2'
  });

  const [ferInputs, setFerInputs] = useState({
    longueur: '',
    largeur: '',
    hauteur: '',
    section: '12'
  });

  const calculateBeton = () => {
    const volume = (parseFloat(betonInputs.longueur) * parseFloat(betonInputs.largeur) * parseFloat(betonInputs.epaisseur)) / 1000;
    const ciment = Math.ceil(volume * 350); // kg de ciment
    const sable = Math.ceil(volume * 0.5); // m³ de sable
    const gravier = Math.ceil(volume * 0.8); // m³ de gravier
    return { volume, ciment, sable, gravier };
  };

  const calculatePeinture = () => {
    const surface = parseFloat(peintureInputs.surface);
    const couches = parseInt(peintureInputs.couches);
    const litres = Math.ceil((surface * couches) / 12); // 1L pour 12m²
    const pots = Math.ceil(litres / 2.5); // Pots de 2.5L
    return { litres, pots, surface };
  };

  const calculateFer = () => {
    const longueur = parseFloat(ferInputs.longueur);
    const largeur = parseFloat(ferInputs.largeur);
    const hauteur = parseFloat(ferInputs.hauteur);
    const section = parseInt(ferInputs.section);
    
    // Calcul simplifié pour semelle + poteaux
    const perimetreBase = 2 * (longueur + largeur);
    const ferSemelle = perimetreBase * 1.2; // avec recouvrements
    const ferPoteaux = 4 * hauteur * 4; // 4 poteaux avec 4 barres chacun
    const totalMetres = ferSemelle + ferPoteaux;
    const poids = totalMetres * (section === 8 ? 0.395 : section === 10 ? 0.617 : section === 12 ? 0.888 : 1.208);
    
    return { totalMetres: Math.ceil(totalMetres), poids: Math.ceil(poids) };
  };

  return (
    <section id="calculators" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-batiplus-orange-100 px-4 py-2 rounded-full mb-4">
            <Calculator className="h-5 w-5 text-batiplus-orange-600" />
            <span className="text-sm font-medium text-batiplus-orange-600">Outils Gratuits</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Calculateurs Intelligents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estimez précisément vos besoins en matériaux avec nos calculateurs professionnels
            et obtenez votre devis personnalisé instantanément.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="beton" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="beton" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Béton</span>
              </TabsTrigger>
              <TabsTrigger value="peinture" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Peinture</span>
              </TabsTrigger>
              <TabsTrigger value="fer" className="flex items-center space-x-2">
                <Hammer className="h-4 w-4" />
                <span>Fer à Béton</span>
              </TabsTrigger>
            </TabsList>

            {/* Calculateur Béton */}
            <TabsContent value="beton">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-6 w-6 text-batiplus-blue-500" />
                    <span>Calculateur Béton</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-4">Dimensions de la dalle (cm)</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Longueur</label>
                        <Input
                          type="number"
                          placeholder="500"
                          value={betonInputs.longueur}
                          onChange={(e) => setBetonInputs({...betonInputs, longueur: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Largeur</label>
                        <Input
                          type="number"
                          placeholder="300"
                          value={betonInputs.largeur}
                          onChange={(e) => setBetonInputs({...betonInputs, largeur: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Épaisseur</label>
                        <Input
                          type="number"
                          placeholder="15"
                          value={betonInputs.epaisseur}
                          onChange={(e) => setBetonInputs({...betonInputs, epaisseur: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Matériaux nécessaires</h4>
                      {betonInputs.longueur && betonInputs.largeur && betonInputs.epaisseur && (
                        <div className="space-y-3">
                          {(() => {
                            const result = calculateBeton();
                            return (
                              <>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Volume de béton:</span>
                                  <span className="font-medium">{result.volume.toFixed(2)} m³</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Ciment (sacs 50kg):</span>
                                  <span className="font-medium text-batiplus-blue-600">{Math.ceil(result.ciment/50)} sacs</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Sable:</span>
                                  <span className="font-medium text-batiplus-blue-600">{result.sable.toFixed(1)} m³</span>
                                </div>
                                <div className="flex justify-between py-2">
                                  <span>Gravier:</span>
                                  <span className="font-medium text-batiplus-blue-600">{result.gravier.toFixed(1)} m³</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                      <Button className="w-full mt-4 bg-batiplus-orange-500 hover:bg-batiplus-orange-600">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger le Devis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calculateur Peinture */}
            <TabsContent value="peinture">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-6 w-6 text-batiplus-blue-500" />
                    <span>Calculateur Peinture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-4">Surface à peindre</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Surface totale (m²)</label>
                        <Input
                          type="number"
                          placeholder="100"
                          value={peintureInputs.surface}
                          onChange={(e) => setPeintureInputs({...peintureInputs, surface: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de couches</label>
                        <Input
                          type="number"
                          placeholder="2"
                          value={peintureInputs.couches}
                          onChange={(e) => setPeintureInputs({...peintureInputs, couches: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Peinture nécessaire</h4>
                      {peintureInputs.surface && (
                        <div className="space-y-3">
                          {(() => {
                            const result = calculatePeinture();
                            return (
                              <>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Surface totale:</span>
                                  <span className="font-medium">{result.surface} m²</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Peinture nécessaire:</span>
                                  <span className="font-medium text-batiplus-blue-600">{result.litres} litres</span>
                                </div>
                                <div className="flex justify-between py-2">
                                  <span>Pots de 2.5L:</span>
                                  <span className="font-medium text-batiplus-blue-600">{result.pots} pots</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                      <Button className="w-full mt-4 bg-batiplus-orange-500 hover:bg-batiplus-orange-600">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger le Devis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calculateur Fer */}
            <TabsContent value="fer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hammer className="h-6 w-6 text-batiplus-blue-500" />
                    <span>Calculateur Fer à Béton</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-4">Dimensions structure (m)</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Longueur</label>
                        <Input
                          type="number"
                          placeholder="10"
                          value={ferInputs.longueur}
                          onChange={(e) => setFerInputs({...ferInputs, longueur: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Largeur</label>
                        <Input
                          type="number"
                          placeholder="8"
                          value={ferInputs.largeur}
                          onChange={(e) => setFerInputs({...ferInputs, largeur: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hauteur</label>
                        <Input
                          type="number"
                          placeholder="3"
                          value={ferInputs.hauteur}
                          onChange={(e) => setFerInputs({...ferInputs, hauteur: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Diamètre (mm)</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={ferInputs.section}
                          onChange={(e) => setFerInputs({...ferInputs, section: e.target.value})}
                        >
                          <option value="8">8 mm</option>
                          <option value="10">10 mm</option>
                          <option value="12">12 mm</option>
                          <option value="14">14 mm</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Fer nécessaire</h4>
                      {ferInputs.longueur && ferInputs.largeur && ferInputs.hauteur && (
                        <div className="space-y-3">
                          {(() => {
                            const result = calculateFer();
                            return (
                              <>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Longueur totale:</span>
                                  <span className="font-medium">{result.totalMetres} m</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                  <span>Poids total:</span>
                                  <span className="font-medium text-batiplus-blue-600">{result.poids} kg</span>
                                </div>
                                <div className="flex justify-between py-2">
                                  <span>Barres de 12m:</span>
                                  <span className="font-medium text-batiplus-blue-600">{Math.ceil(result.totalMetres/12)} barres</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                      <Button className="w-full mt-4 bg-batiplus-orange-500 hover:bg-batiplus-orange-600">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger le Devis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
