import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Wallet, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccount, useDisconnect } from "wagmi";
import NavigationDock from "./NavigationDock";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Brand Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold gradient-text">CLen</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search loans, transactions, or help..."
                className="pl-10 bg-input/50 border-border"
              />
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status */}
            {isConnected ? (
              <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span className="text-xs">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                </span>
                <div className="w-2 h-2 bg-clen-green rounded-full animate-pulse"></div>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center space-x-2"
                onClick={() => navigate('/auth/connect')}
              >
                <Wallet className="w-4 h-4" />
                <span className="text-xs">Connect Wallet</span>
              </Button>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="hidden sm:inline text-sm">Aarav Kumar</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    disconnect();
                    navigate('/');
                  }}
                  disabled={!isConnected}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnected ? 'Disconnect Wallet' : 'No Wallet Connected'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Navigation Dock */}
      <NavigationDock />
    </div>
  );
};

export default Layout;