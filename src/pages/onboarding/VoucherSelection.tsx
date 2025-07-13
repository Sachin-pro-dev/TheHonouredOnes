import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const VoucherSelection = () => {
  const [selectedTier, setSelectedTier] = useState("premium");

  const tiers = [
    {
      id: "basic",
      name: "Basic",
      price: "₹99",
      limit: "₹10,000",
      interest: "9.5%",
      icon: Zap,
      color: "clen-blue",
      features: ["Basic credit access", "Standard interest rates", "Monthly credit reports", "Email support"]
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹299",
      limit: "₹25,000",
      interest: "8.5%",
      icon: Star,
      color: "clen-green",
      popular: true,
      features: ["Higher credit limits", "Lower interest rates", "Real-time credit updates", "Priority support", "Cashback rewards"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "₹599",
      limit: "₹50,000",
      interest: "7.5%",
      icon: Crown,
      color: "clen-purple",
      features: ["Maximum credit access", "Lowest interest rates", "Instant approvals", "Dedicated support", "Premium cashback", "DeFi integrations"]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Choose Your Voucher Tier</h1>
          <p className="text-muted-foreground">
            Select a tier that matches your credit needs and unlock instant access
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            
            return (
              <Card 
                key={tier.id} 
                className={`glass-card hover-lift cursor-pointer relative ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-black">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">one-time fee</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-semibold">Credit Limit: {tier.limit}</div>
                    <div className="text-sm text-muted-foreground">Interest: {tier.interest} p.a.</div>
                  </div>
                  
                  <div className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full ${isSelected ? 'bg-gradient-primary' : ''}`}
                  >
                    {isSelected ? "Selected" : "Select Tier"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Your voucher NFT will be minted on Base network and grants you access to the selected credit tier.
              You can upgrade anytime by purchasing a higher tier.
            </p>
          </div>
          
          <Button size="lg" className="bg-gradient-primary" asChild>
            <Link to="/dashboard">
              Mint {tiers.find(t => t.id === selectedTier)?.name} Voucher - {tiers.find(t => t.id === selectedTier)?.price}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoucherSelection;