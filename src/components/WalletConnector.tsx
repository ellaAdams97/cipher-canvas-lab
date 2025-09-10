import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ChevronDown, Copy, LogOut } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletConnector = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const disconnectWallet = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    });
  };

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Connected
      </Badge>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 px-3">
            <Wallet className="h-4 w-4" />
            <span className="font-mono text-sm">
              {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuItem onClick={copyAddress} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet} className="gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};