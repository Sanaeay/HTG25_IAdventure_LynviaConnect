"use client";

import React, { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sparkles,
  User,
  MessageCircle,
  Clock,
  Shield,
  Flag,
  Briefcase,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EditStrategy = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();

  // ✅ Décodage pour éviter les problèmes avec espaces, "/" etc.
  const decodedId = decodeURIComponent(agentId || "");

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    agentName: "",
    secteur: "",
    contexte: "",
    instructions: "",
    objection: 50,
    qualification: 33,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Si on est sur /agents/edit/:id (et pas "new"), on préremplit avec localStorage
  useEffect(() => {
    if (decodedId && decodedId !== "new") {
      try {
        const storedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
        const found = storedAgents.find(
          (a: any) => a.name.toLowerCase() === decodedId.toLowerCase()
        );
        if (found) {
          setFormData({
            agentName: found.name || "",
            secteur: found.sector || "",
            contexte: found.context || "",
            instructions: found.instructions || "",
            objection: found.sliders?.objection || 50,
            qualification: found.sliders?.qualification || 33,
          });
        }
      } catch (err) {
        console.error("⚠️ Erreur lors du chargement de l'agent :", err);
      }
    }
  }, [decodedId]);

  // 🚀 Envoi du formulaire vers n8n
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const payload = {
        name: formData.agentName,
        sector: formData.secteur,
        context: formData.contexte,
        goal: "Générer des leads qualifiés avec un ton amical et persuasif.",
        delay: { hr: 0, min: 0, sec: 30 },
        sliders: {
          objection: formData.objection,
          qualification: formData.qualification,
        },
        prompt: formData.instructions,
      };

      console.log("🚀 Envoi au backend / n8n :", payload);

      const res = await fetch("https://iadventure.app.n8n.cloud/webhook/strategie-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur lors de la génération");

      console.log("✅ Réponse n8n :", data);
      setResponse(data.strategy || data);

      // ✅ Enregistre ou met à jour l’agent dans localStorage
      const existing = JSON.parse(localStorage.getItem("agents") || "[]");

      const newAgent = {
        id: crypto.randomUUID(),
        name: formData.agentName,
        sector: formData.secteur,
        context: formData.contexte,
        status: "Active",
        conversations: 0,
        bookings: 0,
        instructions: formData.instructions,
        sliders: {
          objection: formData.objection,
          qualification: formData.qualification,
        },
      };

      let updatedAgents;
      if (decodedId && decodedId !== "new") {
        // 🔁 Mise à jour d’un agent existant
        updatedAgents = existing.map((a: any) =>
          a.name.toLowerCase() === decodedId.toLowerCase() ? newAgent : a
        );
      } else {
        // ➕ Création d’un nouvel agent
        updatedAgents = [...existing, newAgent];
      }

      localStorage.setItem("agents", JSON.stringify(updatedAgents));
      window.dispatchEvent(new Event("agentsUpdated"));

      alert(
        decodedId && decodedId !== "new"
          ? "✅ Agent mis à jour avec succès !"
          : "✅ Nouvel agent ajouté !"
      );

      navigate("/agents"); // Retourne à la page des agents
    } catch (err: any) {
      console.error("❌ Erreur :", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Edit Strategy" showActions />

      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations Agent */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Informations de l'Agent
                </h3>

                <div className="space-y-4">
                  {/* Nom */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nom de l'Agent
                    </Label>
                    <Input
                      placeholder="Ex: Agent Solar"
                      value={formData.agentName}
                      onChange={(e) => handleChange("agentName", e.target.value)}
                      required
                    />
                  </div>

                  {/* Secteur */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      Secteur d'activité
                    </Label>
                    <Select
                      value={formData.secteur}
                      onValueChange={(val) => handleChange("secteur", val)}
                    >
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Choisissez un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="immobilier">Immobilier</SelectItem>
                        <SelectItem value="rh">Ressources Humaines</SelectItem>
                        <SelectItem value="closer">Closer</SelectItem>
                        <SelectItem value="setter">Setter</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contexte */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      Contexte de travail
                    </Label>
                    <Textarea
                      placeholder="Décrivez le contexte de votre activité..."
                      className="min-h-[120px] bg-secondary border-border resize-none"
                      value={formData.contexte}
                      onChange={(e) => handleChange("contexte", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Instructions
                  </Label>
                  <Button
                    type="submit"
                    className="bg-gradient-primary text-white shadow-glow hover:opacity-90"
                    disabled={isLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isLoading ? "Envoi..." : "Envoyer à n8n"}
                  </Button>
                </div>

                <Textarea
                  className="min-h-[400px] bg-secondary border-border font-mono text-sm resize-none"
                  placeholder="Décrivez les instructions de votre agent IA ici..."
                  value={formData.instructions}
                  onChange={(e) => handleChange("instructions", e.target.value)}
                  required
                />
              </div>

              {response && (
                <div className="bg-card rounded-xl border border-border p-6 mt-4 space-y-3">
                  <h4 className="font-semibold text-lg">🧠 Stratégie générée :</h4>
                  <pre className="bg-secondary p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-800 font-medium">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Réglages</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      Objection Handling
                    </Label>
                    <Slider
                      defaultValue={[formData.objection]}
                      max={100}
                      step={1}
                      onValueChange={(val) => handleChange("objection", val[0])}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Flag className="w-4 h-4 text-muted-foreground" />
                      Qualification Priority
                    </Label>
                    <Slider
                      defaultValue={[formData.qualification]}
                      max={100}
                      step={1}
                      onValueChange={(val) => handleChange("qualification", val[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStrategy;
