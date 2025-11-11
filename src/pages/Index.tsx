import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AIAgents from "@/components/AIAgents";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <AIAgents />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
