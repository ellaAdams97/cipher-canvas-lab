import { BookOpen, Lock, Shield } from "lucide-react";
import { WalletConnector } from "./WalletConnector";

export const Header = () => {
  return (
    <header className="bg-notebook-paper border-b border-notebook-line shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-research-blue" />
              <Shield className="absolute -top-1 -right-1 h-4 w-4 text-research-green" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                FHE Secured Research
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Confidential Research Collaboration
              </p>
            </div>
          </div>
          
          {/* Wallet Component */}
          <WalletConnector />
        </div>
      </div>
    </header>
  );
};