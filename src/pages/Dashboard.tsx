import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, TrendingUp, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // ✅ pour détecter le rendu client

  // ✅ On attend que le composant soit monté dans le navigateur
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🧠 Chargement des agents après montage client
  useEffect(() => {
    if (!isClient) return;

    const loadAgents = () => {
      try {
        const stored = localStorage.getItem("agents");
        if (!stored) {
          setAgents([]);
          return;
        }

        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAgents(parsed);
        } else {
          console.warn("⚠️ Données agents invalides dans localStorage");
          setAgents([]);
        }
      } catch (error) {
        console.error("❌ Erreur chargement agents :", error);
        setAgents([]);
      }
    };

    loadAgents();
    window.addEventListener("agentsUpdated", loadAgents);
    return () => window.removeEventListener("agentsUpdated", loadAgents);
  }, [isClient]);

  const handleCreateNewAgent = () => {
    navigate("/agents/edit/new");
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="AI Agents" />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Your AI Agents
              </h2>
              <p className="text-muted-foreground">
                Manage and configure your intelligent assistants
              </p>
            </div>
            <Button
              onClick={handleCreateNewAgent}
              className="bg-gradient-primary text-white shadow-glow hover:shadow-medium transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Agent
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                icon: Bot,
                label: "Active Agents",
                value: agents.length.toString(),
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: MessageSquare,
                label: "Conversations",
                value: agents
                  .reduce((acc, a) => acc + (a.conversations || 0), 0)
                  .toString(),
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Calendar,
                label: "Bookings",
                value: agents
                  .reduce((acc, a) => acc + (a.bookings || 0), 0)
                  .toString(),
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: TrendingUp,
                label: "Conversion",
                value: agents.length ? "98%" : "0%",
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, i) => (
              <Card key={i} className="p-6 hover:shadow-medium transition-all">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Agents */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Recent Agents</h3>
            {agents.length === 0 ? (
              <p className="text-muted-foreground">Aucun agent pour le moment.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {agents.map((agent, index) => (
                  <Card
                    key={agent.id || index}
                    // ✅ encodeURIComponent empêche les erreurs si le nom contient un espace ou un “/”
                    onClick={() =>
                      navigate(
                        `/agents/edit/${encodeURIComponent(agent.name.toLowerCase())}`
                      )
                    }
                    className="p-6 hover:shadow-medium transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {agent.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {agent.sector || "IA Agent"}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                        {agent.status || "Active"}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Conversations:
                        </span>
                        <span className="ml-2 font-semibold text-foreground">
                          {agent.conversations || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bookings:</span>
                        <span className="ml-2 font-semibold text-foreground">
                          {agent.bookings || 0}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
