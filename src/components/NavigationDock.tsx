import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, MessageCircle, Store, TrendingUp, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationDock = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: Home,
      tooltip: "Dashboard"
    },
    {
      name: "Credit",
      path: "/credit",
      icon: CreditCard,
      tooltip: "Credit Management"
    },
    {
      name: "Laxmi AI",
      path: "/laxmi",
      icon: MessageCircle,
      tooltip: "AI Assistant",
      hasNotification: true
    },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: Store,
      tooltip: "Marketplace"
    },
    {
      name: "Insights",
      path: "/credit/insights",
      icon: BarChart3,
      tooltip: "Credit Insights"
    }
  ];

  return (
    <nav className="nav-dock bg-gradient-to-r from-background/95 to-background/85 backdrop-blur-md border border-border/50">
      <div className="flex items-center space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "nav-dock-item group relative",
                isActive && "active"
              )}
              title={item.tooltip}
            >
              <Icon className="w-5 h-5" />
              {item.hasNotification && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-clen-orange rounded-full animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationDock;