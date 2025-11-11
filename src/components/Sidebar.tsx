import { NavLink } from "@/components/NavLink";
import { 
  Sparkles,
  Bot, 
  TestTube, 
  BarChart3, 
  Plug, 
  CreditCard, 
  HelpCircle, 
  Users, 
  MessageSquare,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { icon: Bot, label: "AI Agents", path: "/agents" },
  { icon: TestTube, label: "Test AI", path: "/test" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Plug, label: "Integrations", path: "/integrations" },
];

const supportItems = [
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: HelpCircle, label: "Help Center", path: "/help" },
  { icon: Users, label: "Affiliates", path: "/affiliates" },
  { icon: MessageSquare, label: "Feature Request", path: "/feature-request" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-medium">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">LYNVIA Connect</span>
        </div>
      </div>

      {/* Account Selector */}
      <div className="p-4 border-b border-border">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <span className="flex-1 text-left font-medium text-foreground">Lynvia</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Menu
          </p>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              activeClassName="bg-secondary text-primary font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Support Section */}
        <div className="p-4 space-y-1 border-t border-border mt-4">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Support
          </p>
          {supportItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              activeClassName="bg-secondary text-primary font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Support CTA */}
      <div className="p-4 border-t border-border">
        <div className="bg-secondary rounded-xl p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Need some help?</p>
          <p className="text-xs text-muted-foreground">Book a 1-on-1 support call:</p>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            + Get Support
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
