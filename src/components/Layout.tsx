
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Settings, User, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-clen-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-clen-blue/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 glass backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between px-6">
          {/* Enhanced Brand Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                <span className="text-black font-bold text-lg">C</span>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-clen-green animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">CLen</span>
              <span className="text-xs text-muted-foreground font-medium">Credit Protocol</span>
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-12">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search loans, transactions, or get help..."
                className="pl-12 pr-4 h-12 glass-input border-border/30 group-focus-within:border-primary/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-clen-green/10 to-clen-blue/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Enhanced User Controls */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Wallet Connect */}
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button
                            onClick={openConnectModal}
                            className="glass-button border-primary/30 hover:border-primary/60 bg-gradient-to-r from-clen-green/10 to-clen-blue/10 hover:from-clen-green/20 hover:to-clen-blue/20 transition-all duration-300"
                            size="sm"
                          >
                            Connect Wallet
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button
                            onClick={openChainModal}
                            variant="destructive"
                            size="sm"
                            className="animate-pulse"
                          >
                            Wrong Network
                          </Button>
                        );
                      }

                      return (
                        <div className="flex gap-3">
                          <Button
                            onClick={openChainModal}
                            variant="outline"
                            size="sm"
                            className="glass-button border-border/30 hover:border-primary/30 hidden sm:flex items-center space-x-2"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 16,
                                  height: 16,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 16, height: 16 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            className="glass-button border-primary/30 hover:border-primary/60 bg-gradient-to-r from-clen-green/10 to-clen-blue/10 hover:from-clen-green/20 hover:to-clen-blue/20 transition-all duration-300"
                            size="sm"
                          >
                            <span className="text-sm font-medium">
                              {account.displayName}
                            </span>
                            <div className="w-2 h-2 bg-clen-green rounded-full animate-pulse ml-2"></div>
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            {/* Enhanced Notifications */}
            <Button variant="ghost" size="sm" className="relative glass-button hover:bg-primary/10 transition-colors duration-300">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-clen-orange to-destructive rounded-full text-xs flex items-center justify-center text-white font-bold animate-bounce">
                3
              </span>
            </Button>

            {/* Enhanced User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-3 glass-button hover:bg-primary/10 transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold">Aarav Kumar</span>
                    <span className="text-xs text-muted-foreground">Premium Member</span>
                  </div>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card border-border/30">
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors duration-200">
                  <User className="w-4 h-4 mr-3" />
                  <div className="flex flex-col">
                    <span>Profile Settings</span>
                    <span className="text-xs text-muted-foreground">Manage your account</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors duration-200">
                  <Settings className="w-4 h-4 mr-3" />
                  <div className="flex flex-col">
                    <span>Preferences</span>
                    <span className="text-xs text-muted-foreground">Customize your experience</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    if (isConnected) {
                      disconnect();
                    }
                    navigate('/');
                  }}
                  className="hover:bg-destructive/10 text-destructive transition-colors duration-200"
                >
                  {isConnected ? 'Disconnect & Logout' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-6 py-8 pb-32 relative z-10">
        <div className="glass-card rounded-3xl p-8 shadow-elegant border-border/20">
          {children}
        </div>
      </main>

      {/* Navigation Dock */}
      <NavigationDock />
    </div>
  );
};

export default Layout;
