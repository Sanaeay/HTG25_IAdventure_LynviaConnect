import { Card } from "@/components/ui/card";
import { BarChart3, Calendar, Target, Zap } from "lucide-react";

const stats = [
  {
    icon: Target,
    value: "98%",
    label: "Taux de conversion moyen",
    trend: "+12% ce mois",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    value: "15K+",
    label: "Rendez-vous planifiés",
    trend: "+2.4K cette semaine",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    value: "8.7K",
    label: "Leads qualifiés",
    trend: "+18% ce mois",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    value: "<30s",
    label: "Temps de réponse moyen",
    trend: "Instantané 24/7",
    color: "from-orange-500 to-red-500"
  }
];

const Stats = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Des résultats qui{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              parlent d'eux-mêmes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Suivez vos performances en temps réel avec des analytics détaillés
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden p-8 bg-card hover:shadow-large transition-all duration-500 border-border animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {stat.trend}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-large">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Prêt à révolutionner votre gestion de rendez-vous ?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Rejoignez des centaines d'entreprises qui font confiance à Lynvia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow hover:shadow-medium transition-all duration-300 hover:scale-105">
                Essai gratuit 14 jours
              </button>
              <button className="px-8 py-4 bg-background text-foreground rounded-xl font-semibold border-2 border-border hover:border-primary transition-all duration-300">
                Planifier une démo
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
