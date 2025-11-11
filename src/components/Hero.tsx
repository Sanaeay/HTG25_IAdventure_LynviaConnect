import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-60" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border shadow-soft">
              <Sparkles className="w-4 h-4 text-primary animate-glow" />
              <span className="text-sm font-medium text-foreground">Intelligence artificielle multisectorielle</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
              Automatisez vos conversations dans{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                tous les secteurs
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Lynvia transforme votre gestion de rendez-vous et qualification de leads grâce à des assistants IA spécialisés pour le marketing, les RH, l'immobilier, la santé et l'éducation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="shadow-glow hover:shadow-medium transition-all duration-300 group">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                Voir la démo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Taux de conversion</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilité</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Secteurs couverts</div>
              </div>
            </div>
          </div>
          
          {/* Right visual */}
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img 
              src={heroDashboard} 
              alt="Lynvia Dashboard"
              className="relative z-10 w-full rounded-2xl shadow-large"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
