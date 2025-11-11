import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar, Mail, MessageSquare, Webhook, Database, Cloud, CheckCircle2 } from "lucide-react";

const integrations = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Synchronisez automatiquement vos rendez-vous avec Google Calendar",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    connected: true,
    category: "Calendrier"
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Intégration complète avec Outlook pour la gestion des emails et calendriers",
    icon: Mail,
    color: "from-blue-600 to-blue-700",
    connected: false,
    category: "Email"
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Recevez et gérez vos conversations WhatsApp directement dans Lynvia",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-600",
    connected: true,
    category: "Messagerie"
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Configurez des webhooks personnalisés pour vos automatisations",
    icon: Webhook,
    color: "from-purple-500 to-pink-500",
    connected: true,
    category: "Automatisation"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Synchronisez vos leads et opportunités avec Salesforce CRM",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    connected: false,
    category: "CRM"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Intégration native avec HubSpot pour la gestion de vos contacts",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    connected: false,
    category: "CRM"
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    description: "Synchronisez vos leads et automatisations avec GoHighLevel CRM",
    icon: Database,
    color: "from-green-600 to-emerald-600",
    connected: true,
    category: "CRM"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Recevez des notifications en temps réel sur vos channels Slack",
    icon: MessageSquare,
    color: "from-purple-600 to-pink-600",
    connected: false,
    category: "Communication"
  }
];

const Integrations = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Integrations" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Connectez Lynvia à vos outils
            </h2>
            <p className="text-muted-foreground">
              Synchronisez vos données et automatisez vos workflows avec vos applications préférées
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {integrations.filter(i => i.connected).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Intégrations actives</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {integrations.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Intégrations disponibles</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Webhook className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1.2K</div>
                  <div className="text-sm text-muted-foreground">Événements synchronisés</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Integrations Grid */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Toutes les intégrations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => (
                <Card 
                  key={integration.id} 
                  className="p-6 hover:shadow-medium transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                      <integration.icon className="w-7 h-7 text-white" />
                    </div>
                    <Switch checked={integration.connected} />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground">{integration.name}</h4>
                      {integration.connected && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {integration.category}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {integration.description}
                    </p>
                  </div>

                  <Button 
                    variant={integration.connected ? "outline" : "default"}
                    className="w-full"
                  >
                    {integration.connected ? "Configurer" : "Connecter"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Integration CTA */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto shadow-glow">
                <Webhook className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Besoin d'une intégration personnalisée ?
              </h3>
              <p className="text-muted-foreground">
                Notre équipe peut vous aider à créer des intégrations sur mesure pour vos besoins spécifiques
              </p>
              <Button className="bg-gradient-primary text-white shadow-glow">
                Contacter l'équipe technique
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
