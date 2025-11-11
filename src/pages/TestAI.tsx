import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Bot, User, Send, Trash2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const TestAI = () => {
  const [selectedAgent, setSelectedAgent] = useState("solar");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant IA Solar. Comment puis-je vous aider avec votre projet d'installation solaire ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Excellent ! Je vais vous aider avec ça. Pouvez-vous me donner plus de détails sur votre situation ?",
        "Bien sûr, je comprends votre besoin. Laissez-moi vous proposer quelques créneaux disponibles.",
        "C'est parfait ! Nous avons plusieurs options qui pourraient vous convenir. Puis-je vous poser quelques questions pour mieux vous orienter ?",
        "Merci pour ces informations ! Je vais planifier un rendez-vous avec l'un de nos experts. Êtes-vous disponible cette semaine ?"
      ];
      
      const aiMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleClearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "Bonjour ! Je suis votre assistant IA Solar. Comment puis-je vous aider avec votre projet d'installation solaire ?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Test AI" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6 h-full">
            {/* Left Panel - Settings */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Configuration du test</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Agent IA</label>
                      <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solar">Solar</SelectItem>
                          <SelectItem value="bathrooms">Bathrooms</SelectItem>
                          <SelectItem value="roofing">Roofing</SelectItem>
                          <SelectItem value="kitchens">Kitchens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Messages envoyés</span>
                        <span className="font-semibold text-foreground">
                          {messages.filter(m => m.role === "user").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Réponses IA</span>
                        <span className="font-semibold text-foreground">
                          {messages.filter(m => m.role === "assistant").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Temps de réponse moyen</span>
                        <span className="font-semibold text-foreground">1.2s</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={handleClearConversation}
                    >
                      <Trash2 className="w-4 h-4" />
                      Nouvelle conversation
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-3">Suggestions de test</h4>
                <div className="space-y-2">
                  {[
                    "Je suis intéressé par le solaire",
                    "Combien coûte une installation ?",
                    "Quels sont vos délais ?",
                    "Je voudrais un rendez-vous"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInputValue(suggestion)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm text-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Panel - Chat */}
            <div className="lg:col-span-2">
              <Card className="h-[calc(100vh-10rem)] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground capitalize">{selectedAgent} Agent</h3>
                      <p className="text-xs text-accent">En ligne</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === "assistant" 
                          ? "bg-gradient-primary" 
                          : "bg-secondary"
                      }`}>
                        {message.role === "assistant" ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-foreground" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
                        <div
                          className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${
                            message.role === "assistant"
                              ? "bg-card border border-border"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
                          }`}>
                            {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Écrivez votre message..."
                      className="bg-secondary"
                    />
                    <Button onClick={handleSendMessage} className="bg-gradient-primary text-white">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAI;
