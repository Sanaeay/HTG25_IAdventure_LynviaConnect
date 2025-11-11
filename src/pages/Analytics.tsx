import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResumeAudioPlayer from "@/components/ResumeAudioPlayer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, MessageSquare, Calendar, Users, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const conversationData = [
  { name: "Lun", conversations: 45, bookings: 32 },
  { name: "Mar", conversations: 52, bookings: 38 },
  { name: "Mer", conversations: 48, bookings: 35 },
  { name: "Jeu", conversations: 61, bookings: 45 },
  { name: "Ven", conversations: 55, bookings: 41 },
  { name: "Sam", conversations: 38, bookings: 28 },
  { name: "Dim", conversations: 42, bookings: 30 },
];

const agentPerformance = [
  { name: "Solar", value: 340 },
  { name: "Bathrooms", value: 280 },
  { name: "Roofing", value: 220 },
  { name: "Kitchens", value: 160 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

const Analytics = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Analytics" />
      
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Performance des agents IA</h2>
              <p className="text-muted-foreground">Analyse détaillée de vos conversations et conversions</p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="7days">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 derniers jours</SelectItem>
                  <SelectItem value="30days">30 derniers jours</SelectItem>
                  <SelectItem value="90days">90 derniers jours</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                Exporter
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { 
                icon: MessageSquare, 
                label: "Conversations totales", 
                value: "1,284", 
                change: "+12.5%",
                positive: true,
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Calendar, 
                label: "Rendez-vous pris", 
                value: "342", 
                change: "+8.2%",
                positive: true,
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: Target, 
                label: "Taux de conversion", 
                value: "26.6%", 
                change: "-2.1%",
                positive: false,
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: Users, 
                label: "Leads qualifiés", 
                value: "456", 
                change: "+15.3%",
                positive: true,
                color: "from-orange-500 to-red-500"
              },
            ].map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.positive ? "text-accent" : "text-destructive"
                  }`}>
                    {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Conversations & Bookings Chart */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">Conversations & Rendez-vous</h3>
                <p className="text-sm text-muted-foreground">Évolution sur les 7 derniers jours</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Conversations"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Rendez-vous"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Agent Performance Chart */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">Performance par agent</h3>
                <p className="text-sm text-muted-foreground">Répartition des conversations</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={agentPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {agentPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Hourly Distribution */}
            <Card className="p-6 lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">Distribution horaire des conversations</h3>
                <p className="text-sm text-muted-foreground">Activité par tranche horaire</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { hour: "00-04h", count: 12 },
                  { hour: "04-08h", count: 28 },
                  { hour: "08-12h", count: 145 },
                  { hour: "12-16h", count: 178 },
                  { hour: "16-20h", count: 156 },
                  { hour: "20-00h", count: 89 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Daily Summary */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Résumé de la journée</h3>
                <p className="text-sm text-muted-foreground">Analyse de l'activité et utilisation des agents IA</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const audio = new Audio("/audios/resume.mp3");
                  audio.play();
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Écouter le résumé
              </Button>
            </div> {/* ✅ fermeture manquante du header */}

            <div className="space-y-4">
              {/* Written Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Aujourd'hui, {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h4>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    🎯 <span className="font-medium text-foreground">Performance globale:</span> Vos agents IA ont géré 10 conversations avec un taux de conversion de 50%. 
                    L'agent "Formation UX/UI" a été particulièrement performant avec 5 rendez-vous pris aujourd'hui.
                  </p>

                  <p>
                    💬 <span className="font-medium text-foreground">Conversations:</span> Le pic d'activité s'est situé entre 14h et 16h avec 4 conversations simultanées. 
                    Les temps de réponse moyens sont restés sous les 2 secondes.
                  </p>
                  <p>
                    📅 <span className="font-medium text-foreground">Rendez-vous:</span> 5 nouveaux rendez-vous ont été planifiés automatiquement. 
                    Les créneaux de 9h-11h sont les plus demandés par vos clients.
                  </p>
                  <p>
                    ⭐ <span className="font-medium text-foreground">Points clés:</span> 1 nouvelle intégration GoHighLevel a été activée avec succès.
                  </p>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Dernières actions</h4>
                {[
                  { agent: "Formation UX/UI", action: "Rendez-vous pris", time: "Il y a 5 min", status: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                        {activity.agent[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{activity.agent}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
