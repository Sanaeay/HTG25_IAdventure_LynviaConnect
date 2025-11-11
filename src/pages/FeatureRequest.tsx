import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, CheckCircle2, Clock, Lightbulb } from "lucide-react";

const featuresRequests = [
  { 
    id: 1, 
    title: "Support des appels vocaux IA",
    description: "Permettre aux agents IA de gérer des appels téléphoniques en plus des conversations textuelles",
    votes: 142,
    comments: 23,
    status: "En cours",
    category: "Fonctionnalité"
  },
  { 
    id: 2, 
    title: "Intégration Telegram",
    description: "Ajouter le support de Telegram pour gérer les conversations via cette plateforme",
    votes: 98,
    comments: 15,
    status: "Planifié",
    category: "Intégration"
  },
  { 
    id: 3, 
    title: "Mode multi-langues automatique",
    description: "Détection automatique de la langue du prospect et réponse dans cette langue",
    votes: 87,
    comments: 12,
    status: "En révision",
    category: "IA"
  },
  { 
    id: 4, 
    title: "Templates de conversations pré-configurés",
    description: "Bibliothèque de templates pour différents secteurs d'activité",
    votes: 76,
    comments: 18,
    status: "Complété",
    category: "Fonctionnalité"
  },
  { 
    id: 5, 
    title: "API publique Lynvia",
    description: "Exposer une API REST pour intégrer Lynvia dans des applications tierces",
    votes: 134,
    comments: 31,
    status: "En cours",
    category: "Développeur"
  }
];

const FeatureRequest = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Feature Requests" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Demandes de fonctionnalités
              </h2>
              <p className="text-muted-foreground">
                Votez pour vos fonctionnalités préférées ou proposez de nouvelles idées
              </p>
            </div>
            <Button className="bg-gradient-primary text-white shadow-glow">
              <Lightbulb className="w-4 h-4 mr-2" />
              Nouvelle demande
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">248</div>
                  <div className="text-sm text-muted-foreground">Demandes totales</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">42</div>
                  <div className="text-sm text-muted-foreground">Complétées</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">18</div>
                  <div className="text-sm text-muted-foreground">En cours</div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1.2K</div>
                  <div className="text-sm text-muted-foreground">Votes totaux</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="review">En révision</SelectItem>
                <SelectItem value="planned">Planifié</SelectItem>
                <SelectItem value="progress">En cours</SelectItem>
                <SelectItem value="completed">Complété</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="votes">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="votes">Plus de votes</SelectItem>
                <SelectItem value="recent">Plus récentes</SelectItem>
                <SelectItem value="comments">Plus commentées</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feature Requests List */}
          <div className="space-y-4">
            {featuresRequests.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-medium transition-all">
                <div className="flex gap-6">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-auto flex-col gap-1 px-3 py-2 hover:bg-primary/10 hover:text-primary hover:border-primary"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-bold text-sm">{request.votes}</span>
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                          {request.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {request.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          request.status === "Complété" ? "bg-accent/10 text-accent border-accent/20" :
                          request.status === "En cours" ? "bg-primary/10 text-primary border-primary/20" :
                          request.status === "Planifié" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                          "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-secondary rounded text-xs font-medium">
                        {request.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {request.comments} commentaires
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Submit Feature Card */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-6">Proposer une nouvelle fonctionnalité</h3>
            <div className="space-y-4 max-w-3xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Titre de la fonctionnalité</label>
                <Input 
                  placeholder="Ex: Support des appels vocaux IA"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Catégorie</label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Fonctionnalité</SelectItem>
                    <SelectItem value="integration">Intégration</SelectItem>
                    <SelectItem value="ai">IA</SelectItem>
                    <SelectItem value="developer">Développeur</SelectItem>
                    <SelectItem value="ui">Interface</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea 
                  placeholder="Décrivez en détail la fonctionnalité que vous souhaitez voir ajoutée..."
                  className="bg-background min-h-[120px]"
                />
              </div>
              <Button className="bg-gradient-primary text-white">
                Soumettre la demande
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequest;
