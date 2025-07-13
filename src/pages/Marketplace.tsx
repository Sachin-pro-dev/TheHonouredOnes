import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Store, Gift, Percent, Star, Clock, Zap, ShoppingCart, Heart, Filter, QrCode } from "lucide-react";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 199.99,
      originalPrice: 249.99,
      cashback: 15,
      rating: 4.8,
      reviews: 1247,
      image: product1,
      category: "electronics",
      featured: true,
      freeShipping: true,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smartphone 128GB",
      price: 599.99,
      originalPrice: 699.99,
      cashback: 45,
      rating: 4.6,
      reviews: 2891,
      image: product2,
      category: "electronics",
      featured: true,
      freeShipping: true,
      badge: "Hot Deal"
    },
    {
      id: 3,
      name: "Gaming Laptop",
      price: 1299.99,
      originalPrice: 1499.99,
      cashback: 85,
      rating: 4.9,
      reviews: 567,
      image: product3,
      category: "computers",
      featured: false,
      freeShipping: true,
      badge: "Limited Time"
    },
    {
      id: 4,
      name: "Fitness Tracker Watch",
      price: 159.99,
      originalPrice: 199.99,
      cashback: 12,
      rating: 4.4,
      reviews: 834,
      image: product4,
      category: "health",
      featured: false,
      freeShipping: false,
      badge: null
    },
    {
      id: 5,
      name: "Gaming Mouse RGB",
      price: 79.99,
      originalPrice: 99.99,
      cashback: 6,
      rating: 4.7,
      reviews: 1923,
      image: product5,
      category: "computers",
      featured: false,
      freeShipping: true,
      badge: null
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 89.99,
      originalPrice: 119.99,
      cashback: 7,
      rating: 4.5,
      reviews: 672,
      image: product6,
      category: "electronics",
      featured: false,
      freeShipping: true,
      badge: null
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: "🏪" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "computers", name: "Computers", icon: "💻" },
    { id: "health", name: "Health & Fitness", icon: "💪" },
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "home", name: "Home & Garden", icon: "🏠" }
  ];

  const stats = [
    { label: "Total Earned", value: "1,250 USDT", icon: Gift, color: "text-green-500" },
    { label: "Products Available", value: "10,000+", icon: Store, color: "text-blue-500" },
    { label: "Avg Cashback", value: "8.5%", icon: Percent, color: "text-purple-500" },
    { label: "This Month", value: "350 USDT", icon: Zap, color: "text-orange-500" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Crypto Marketplace</h1>
          <p className="text-muted-foreground">Shop with crypto and earn USDT cashback</p>
        </div>
        <Button className="bg-gradient-primary">
          <QrCode className="w-4 h-4 mr-2" />
          Pay with Crypto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-xl font-bold mt-1">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
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
            <Button variant="outline" className="md:w-auto w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Products */}
      {selectedCategory === 'all' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-orange-500" />
              <span>Featured Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="border-border bg-secondary/30 hover-lift group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-orange-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-bold">{product.price} USDT</span>
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice} USDT</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          +{product.cashback} USDT
                        </Badge>
                      </div>
                      {product.freeShipping && (
                        <p className="text-xs text-green-600 mb-3">FREE Shipping</p>
                      )}
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-gradient-primary">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="glass-card hover-lift group">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.badge && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    {product.badge}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-orange-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold">{product.price} USDT</span>
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice} USDT</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 mb-3">
                  Earn {product.cashback} USDT back
                </Badge>
                {product.freeShipping && (
                  <p className="text-xs text-green-600 mb-3">FREE Shipping</p>
                )}
                <Button className="w-full bg-gradient-primary">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Marketplace;