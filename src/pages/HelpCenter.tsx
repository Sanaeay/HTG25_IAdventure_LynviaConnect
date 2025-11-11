import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, MessageCircle, Video, FileText, HelpCircle } from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    title: "Démarrage",
    description: "Premiers pas avec Lynvia",
    articles: 12,
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: MessageCircle,
    title: "Configuration des agents",
    description: "Paramétrez vos assistants IA",
    articles: 18,
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Video,
    title: "Tutoriels vidéo",
    description: "Guides vidéo pas à pas",
    articles: 8,
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: FileText,
    title: "Intégrations",
    description: "Connectez vos outils",
    articles: 15,
    color: "from-orange-500 to-red-500"
  }
];

const popularArticles = [
  { title: "Comment créer votre premier agent IA ?", views: "2.4K", category: "Démarrage" },
  { title: "Configurer les webhooks pour automatiser vos workflows", views: "1.8K", category: "Intégrations" },
  { title: "Optimiser le taux de conversion de vos agents", views: "1.5K", category: "Configuration" },
  { title: "Synchronisation avec Google Calendar", views: "1.2K", category: "Intégrations" },
  { title: "Comprendre les analytics et métriques", views: "1.1K", category: "Analytics" }
];

const HelpCenter = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Help Center" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Search Section */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Comment pouvons-nous vous aider ?</h2>
              <p className="text-muted-foreground">Recherchez dans notre base de connaissances ou parcourez par catégorie</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher dans les articles, tutoriels, guides..."
                  className="pl-12 h-14 text-lg bg-card border-border"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Parcourir par catégorie</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-medium transition-all cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category.articles} articles
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Articles populaires</h3>
            <Card className="divide-y divide-border">
              {popularArticles.map((article, index) => (
                <div 
                  key={index}
                  className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{article.category}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{article.views} vues</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Lire
                  </Button>
                </div>
              ))}
            </Card>
          </div>

          {/* Contact Support */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto shadow-glow">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Vous ne trouvez pas ce que vous cherchez ?
              </h3>
              <p className="text-muted-foreground">
                Notre équipe support est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-gradient-primary text-white shadow-glow">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contacter le support
                </Button>
                <Button variant="outline">
                  Prendre rendez-vous
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
