
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis l'assistant Batiplus. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    "Prix du ciment",
    "Calculer béton",
    "Zones de livraison",
    "Devis rapide",
    "Horaires magasin"
  ];

  const botResponses = {
    "prix du ciment": "Le ciment CPA 55 coûte 6.500 FCFA le sac de 50kg. Nous avons également du ciment Portland à 7.200 FCFA. Voulez-vous un devis personnalisé ?",
    "calculer béton": "Utilisez notre calculateur béton gratuit ! Indiquez-moi les dimensions de votre dalle (longueur x largeur x épaisseur) et je calcule vos besoins.",
    "zones de livraison": "Nous livrons dans tout Libreville : Centre-ville, Akandé, Oloumi, Batterie IV, Lalala, Nombakélé. Frais de livraison : 15.000-25.000 FCFA selon la zone.",
    "devis rapide": "Pour un devis personnalisé, j'ai besoin de quelques informations : Type de projet ? Surface approximative ? Matériaux souhaités ?",
    "horaires magasin": "Nos horaires : Lundi-Vendredi 8h-18h, Samedi 8h-12h30. Fermé le dimanche. Service d'urgence 24h/24 au +241 62 02 11 11."
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let botResponse = "Je comprends votre demande. Pour une assistance personnalisée, appelez-nous au +241 62 02 11 11 ou visitez notre magasin Avenue Akandé.";

      // Check for keywords
      Object.keys(botResponses).forEach(key => {
        if (lowerInput.includes(key)) {
          botResponse = botResponses[key as keyof typeof botResponses];
        }
      });

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-batiplus-orange-500 hover:bg-batiplus-orange-600 rounded-full w-14 h-14 shadow-lg animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 shadow-2xl animate-slide-in-right">
          <CardHeader className="bg-batiplus-blue-500 text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Assistant Batiplus</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-batiplus-blue-600 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-batiplus-blue-500 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isBot ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="bg-batiplus-orange-500 hover:bg-batiplus-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
