import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, TrendingUp } from "lucide-react";
import featureConversations from "@/assets/feature-conversations.png";
import featureCalendar from "@/assets/feature-calendar.png";

const features = [
  {
    icon: MessageSquare,
    title: "Conversations IA automatisées",
    description: "Vos assistants IA qualifient les leads et prennent des rendez-vous automatiquement, 24h/24 et 7j/7.",
    image: featureConversations,
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Calendrier synchronisé intelligent",
    description: "Planification automatique des créneaux selon vos disponibilités avec synchronisation complète.",
    image: featureCalendar,
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Analytics en temps réel",
    description: "Suivez vos KPIs : taux de conversion, rendez-vous pris, leads qualifiés et performances par secteur.",
    color: "from-green-500 to-emerald-500"
  }
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Une plateforme complète pour{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              automatiser vos rendez-vous
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Des outils puissants conçus pour maximiser votre efficacité et vos conversions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden p-8 bg-card hover:shadow-large transition-all duration-500 border-border animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                {feature.image && (
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-soft">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
