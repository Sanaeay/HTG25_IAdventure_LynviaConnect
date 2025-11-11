import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, CreditCard, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "mois",
    description: "Parfait pour démarrer avec l'IA conversationnelle",
    features: [
      "1 agent IA",
      "500 conversations/mois",
      "Support email",
      "Intégrations de base",
      "Analytics basiques"
    ],
    current: false
  },
  {
    name: "Professional",
    price: "149",
    period: "mois",
    description: "Pour les équipes qui veulent performer",
    features: [
      "5 agents IA",
      "5000 conversations/mois",
      "Support prioritaire",
      "Toutes les intégrations",
      "Analytics avancées",
      "Webhooks personnalisés",
      "White label"
    ],
    current: true,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    description: "Solutions sur mesure pour grandes entreprises",
    features: [
      "Agents IA illimités",
      "Conversations illimitées",
      "Support dédié 24/7",
      "Intégrations personnalisées",
      "SLA garanti",
      "Formation équipe",
      "Déploiement on-premise"
    ],
    current: false
  }
];

const invoices = [
  { id: "INV-2025-001", date: "01/03/2025", amount: "149,00 €", status: "Payé" },
  { id: "INV-2025-002", date: "01/02/2025", amount: "149,00 €", status: "Payé" },
  { id: "INV-2025-003", date: "01/01/2025", amount: "149,00 €", status: "Payé" },
  { id: "INV-2024-012", date: "01/12/2024", amount: "149,00 €", status: "Payé" },
];

const Billing = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Billing" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Abonnement actuel</h3>
                <p className="text-muted-foreground">Gérez votre plan et vos paiements</p>
              </div>
              <Button variant="outline" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Modifier le moyen de paiement
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Plan actuel</p>
                <p className="text-2xl font-bold text-foreground">Professional</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Prix mensuel</p>
                <p className="text-2xl font-bold text-foreground">149 € / mois</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Prochain paiement</p>
                <p className="text-2xl font-bold text-foreground">01 avril 2025</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Utilisation ce mois-ci : 3,247 / 5,000 conversations</span>
              </div>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
          </Card>

          {/* Plans */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Tous les plans</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.name}
                  className={`p-6 relative ${
                    plan.current ? "border-primary border-2" : ""
                  } ${plan.popular ? "shadow-large" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white">
                      Le plus populaire
                    </Badge>
                  )}
                  {plan.current && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent">
                      Plan actuel
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-foreground mb-2">{plan.name}</h4>
                    <div className="mb-2">
                      {typeof plan.price === "string" && plan.price !== "Sur devis" ? (
                        <>
                          <span className="text-4xl font-bold text-foreground">{plan.price}€</span>
                          <span className="text-muted-foreground">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full"
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Plan actuel" : plan.name === "Enterprise" ? "Nous contacter" : "Changer de plan"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Historique de facturation</h3>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Télécharger tout
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Facture</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Montant</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Statut</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{invoice.id}</td>
                      <td className="py-4 px-4 text-muted-foreground">{invoice.date}</td>
                      <td className="py-4 px-4 text-foreground font-semibold">{invoice.amount}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
