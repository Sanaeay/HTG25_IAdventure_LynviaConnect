import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, DollarSign, Share2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Affiliates = () => {
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://lynvia.app/ref/LYNVIA2025";

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Programme d'affiliation" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Hero Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Gagnez jusqu'à 30% de commission récurrente
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Recommandez Lynvia à votre réseau et gagnez des commissions sur chaque abonnement actif
              </p>
              <Button className="bg-gradient-primary text-white shadow-glow">
                Devenir affilié
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Parrainages actifs", value: "12", color: "from-blue-500 to-cyan-500" },
              { icon: TrendingUp, label: "Taux de conversion", value: "18%", color: "from-purple-500 to-pink-500" },
              { icon: DollarSign, label: "Revenus ce mois", value: "534€", color: "from-green-500 to-emerald-500" },
              { icon: DollarSign, label: "Total gagné", value: "3,240€", color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <Card key={index} className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Affiliate Link */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Votre lien d'affiliation</h3>
            <div className="flex gap-3">
              <Input 
                value={affiliateLink}
                readOnly
                className="bg-secondary font-mono text-sm"
              />
              <Button onClick={handleCopy} className="gap-2">
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            </div>
          </Card>

          {/* Commission Tiers */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Structure des commissions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { tier: "Bronze", min: "0-5", rate: "20%", color: "from-orange-400 to-orange-600" },
                { tier: "Silver", min: "6-15", rate: "25%", color: "from-gray-400 to-gray-600" },
                { tier: "Gold", min: "16+", rate: "30%", color: "from-yellow-400 to-yellow-600" }
              ].map((tier, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 text-white font-bold text-xl`}>
                    {tier.rate}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{tier.tier}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.min} clients actifs
                  </p>
                  <p className="text-sm text-foreground">
                    Commission récurrente sur chaque abonnement
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Referrals */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Parrainages récents</h3>
            <div className="space-y-4">
              {[
                { name: "Jean D.", status: "Actif", plan: "Professional", commission: "44,70€", date: "15/03/2025" },
                { name: "Marie L.", status: "Actif", plan: "Starter", commission: "14,70€", date: "12/03/2025" },
                { name: "Paul M.", status: "En attente", plan: "Professional", commission: "-", date: "10/03/2025" },
                { name: "Sophie R.", status: "Actif", plan: "Professional", commission: "44,70€", date: "08/03/2025" }
              ].map((referral, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{referral.name}</p>
                      <p className="text-sm text-muted-foreground">{referral.plan} • {referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      referral.status === "Actif" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {referral.status}
                    </span>
                    <span className="font-bold text-foreground min-w-[80px] text-right">
                      {referral.commission}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resources */}
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Ressources pour affiliés
              </h3>
              <p className="text-muted-foreground">
                Accédez à des bannières, templates d'emails et guides pour maximiser vos conversions
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Télécharger le kit affilié
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;
