import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-medium">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Lynvia
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Fonctionnalités</a>
            <a href="#" className="hover:text-primary transition-colors">Tarifs</a>
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 Lynvia. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
