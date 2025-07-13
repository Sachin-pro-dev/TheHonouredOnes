import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Store, Gift, Percent, Star, Clock, Zap, ShoppingCart, Heart, Filter, QrCode } from "lucide-react";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredOffers = [
    {
      id: 1,
      merchant: "Flipkart",
      title: "Up to 10% Cashback",
      description: "Shop electronics, fashion, and more",
      cashback: "5-10%",
      image: "🛒",
      category: "shopping",
      featured: true,
      validUntil: "Mar 31, 2024"
    },
    {
      id: 2,
      merchant: "Swiggy",
      title: "5% Cashback on Food Orders",
      description: "Order your favorite meals",
      cashback: "5%",
      image: "🍔",
      category: "food",
      featured: true,
      validUntil: "Mar 25, 2024"
    },
    {
      id: 3,
      merchant: "Amazon",
      title: "Extra 7% on Prime Orders",
      description: "Prime members get additional rewards",
      cashback: "7%",
      image: "📦",
      category: "shopping",
      featured: true,
      validUntil: "Apr 5, 2024"
    }
  ];

  const merchants = [
    {
      name: "Flipkart",
      category: "E-commerce",
      cashback: "5-10%",
      rating: 4.5,
      image: "🛒",
      description: "India's leading e-commerce platform",
      offers: 15
    },
    {
      name: "Swiggy",
      category: "Food Delivery",
      cashback: "5%",
      rating: 4.3,
      image: "🍔",
      description: "Food delivery and dining",
      offers: 8
    },
    {
      name: "Amazon",
      category: "E-commerce",
      cashback: "3-7%",
      rating: 4.6,
      image: "📦",
      description: "Global marketplace",
      offers: 12
    },
    {
      name: "Zomato",
      category: "Food Delivery",
      cashback: "4%",
      rating: 4.2,
      image: "🍕",
      description: "Food delivery and restaurant discovery",
      offers: 6
    },
    {
      name: "BookMyShow",
      category: "Entertainment",
      cashback: "8%",
      rating: 4.1,
      image: "🎬",
      description: "Movie and event tickets",
      offers: 4
    },
    {
      name: "Myntra",
      category: "Fashion",
      cashback: "6%",
      rating: 4.4,
      image: "👕",
      description: "Fashion and lifestyle",
      offers: 10
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: "🏪" },
    { id: "shopping", name: "Shopping", icon: "🛒" },
    { id: "food", name: "Food & Dining", icon: "🍔" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "travel", name: "Travel", icon: "✈️" },
    { id: "utilities", name: "Utilities", icon: "⚡" }
  ];

  const recentEarnings = [
    { merchant: "Flipkart", amount: 250, date: "2 days ago", type: "Purchase" },
    { merchant: "Swiggy", amount: 45, date: "3 days ago", type: "Food Order" },
    { merchant: "Amazon", amount: 180, date: "5 days ago", type: "Prime Order" },
    { merchant: "BookMyShow", amount: 60, date: "1 week ago", type: "Movie Tickets" }
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           merchant.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Discover cashback offers and merchant partners</p>
        </div>
        <Button className="bg-gradient-primary">
          <QrCode className="w-4 h-4 mr-2" />
          Scan & Pay
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-clen-green" />
              <span className="text-sm text-muted-foreground">Total Earned</span>
            </div>
            <div className="text-2xl font-bold mt-1">₹1,250</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Store className="w-4 h-4 text-clen-blue" />
              <span className="text-sm text-muted-foreground">Partner Merchants</span>
            </div>
            <div className="text-2xl font-bold mt-1">50+</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-clen-purple" />
              <span className="text-sm text-muted-foreground">Avg Cashback</span>
            </div>
            <div className="text-2xl font-bold mt-1">6.5%</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-clen-orange" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <div className="text-2xl font-bold mt-1">₹350</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Offers */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-clen-orange" />
            <span>Featured Offers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredOffers.map((offer) => (
              <Card key={offer.id} className="border-border bg-secondary/30 hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{offer.image}</div>
                    <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                      {offer.cashback}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{offer.merchant}</h3>
                  <p className="text-sm font-medium mb-1">{offer.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Until {offer.validUntil}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="merchants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="offers">All Offers</TabsTrigger>
          <TabsTrigger value="earnings">My Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="merchants" className="space-y-6">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search merchants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Merchants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{merchant.image}</div>
                    <Badge variant="secondary" className="bg-clen-blue/10 text-clen-blue">
                      {merchant.cashback}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{merchant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{merchant.category}</p>
                  <p className="text-sm mb-4">{merchant.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-clen-orange fill-current" />
                      <span className="text-sm font-medium">{merchant.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{merchant.offers} offers</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      View Offers
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <div className="grid gap-4">
            {featuredOffers.concat([
              {
                id: 4,
                merchant: "Zomato",
                title: "4% Cashback on All Orders",
                description: "Food delivery from your favorite restaurants",
                cashback: "4%",
                image: "🍕",
                category: "food",
                featured: false,
                validUntil: "Mar 30, 2024"
              },
              {
                id: 5,
                merchant: "Myntra",
                title: "6% Cashback on Fashion",
                description: "Latest fashion trends and styles",
                cashback: "6%",
                image: "👕",
                category: "fashion",
                featured: false,
                validUntil: "Apr 10, 2024"
              }
            ]).map((offer) => (
              <Card key={offer.id} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{offer.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{offer.merchant}</h3>
                          <p className="font-medium">{offer.title}</p>
                          <p className="text-sm text-muted-foreground">{offer.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                          {offer.cashback}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Valid until {offer.validUntil}</span>
                        </div>
                        <Button size="sm">Activate Offer</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{earning.merchant}</p>
                      <p className="text-sm text-muted-foreground">{earning.type} • {earning.date}</p>
                    </div>
                    <div className="text-clen-green font-medium">
                      +₹{earning.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="font-medium">₹350</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Month</span>
                  <span className="font-medium">₹420</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Earned</span>
                  <span className="font-medium">₹1,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-medium text-clen-orange">₹85</span>
                </div>
                <Button className="w-full mt-4">
                  Redeem Earnings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;