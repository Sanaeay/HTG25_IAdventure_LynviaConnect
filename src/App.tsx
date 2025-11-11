import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EditStrategy from "./pages/EditStrategy";
import TestAI from "./pages/TestAI";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Billing from "./pages/Billing";
import HelpCenter from "./pages/HelpCenter";
import Affiliates from "./pages/Affiliates";
import FeatureRequest from "./pages/FeatureRequest";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Index />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/agents" replace />} />
            <Route path="agents" element={<Dashboard />} />
            <Route path="agents/edit/new" element={<EditStrategy />} /> {/* ➕ pour création */}
            <Route path="agents/edit/:agentId" element={<EditStrategy />} /> {/* ➕ pour édition */}
            <Route path="test" element={<TestAI />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="billing" element={<Billing />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="affiliates" element={<Affiliates />} />
            <Route path="feature-request" element={<FeatureRequest />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
