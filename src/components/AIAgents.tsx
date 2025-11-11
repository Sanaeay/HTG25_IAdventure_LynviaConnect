import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Home, Heart, BookOpen } from "lucide-react";
import featureAgents from "@/assets/feature-agents.png";

const agents = [
  {
    icon: TrendingUp,
    name: "AI Sales Setter",
    sector: "Marketing & Ventes",
    description: "Qualifie vos leads et planifie vos rendez-vous commerciaux automatiquement",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    name: "AI Recruiter",
    sector: "Ressources Humaines",
    description: "Automatise la planification des entretiens et le screening des candidats",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Home,
    name: "AI Property Assistant",
    sector: "Immobilier",
    description: "Organise les visites et qualifie les prospects immobiliers",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    name: "AI Medical Assistant",
    sector: "Santé",
    description: "Gère les rendez-vous médicaux et les rappels de consultations",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    name: "AI Education Advisor",
    sector: "Éducation",
    description: "Planifie les sessions de coaching et accompagne les étudiants",
    color: "from-indigo-500 to-violet-500"
  }
];

const AIAgents = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-primary opacity-10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Des assistants IA spécialisés pour{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              chaque secteur
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Chaque agent est entraîné pour comprendre les spécificités de votre domaine
          </p>
        </div>
        
        {/* Visual representation */}
        <div className="max-w-2xl mx-auto mb-16 animate-float">
          <img 
            src={featureAgents} 
            alt="AI Agents multisecteurs"
            className="w-full rounded-2xl shadow-large"
          />
        </div>
        
        {/* Agents grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden p-6 bg-card hover:shadow-medium transition-all duration-300 border-border animate-scale-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300`}>
                  <agent.icon className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-3">
                    {agent.sector}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
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

export default AIAgents;
