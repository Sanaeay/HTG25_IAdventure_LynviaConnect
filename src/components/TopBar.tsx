import { Button } from "@/components/ui/button";
import { LogOut, MoreVertical } from "lucide-react";

interface TopBarProps {
  title: string;
  showActions?: boolean;
}

const TopBar = ({ title, showActions = false }: TopBarProps) => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 text-muted-foreground">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="2" />
            <path d="M16 8l-8 8M8 8l8 8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>

      {showActions && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-accent" />
            Save and come back at any time
          </div>
          
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="w-8 h-8 rounded-lg bg-muted" />
          
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Next
          </Button>
          
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Save
          </Button>
        </div>
      )}

      {!showActions && (
        <Button variant="outline" size="sm" className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      )}
    </header>
  );
};

export default TopBar;
