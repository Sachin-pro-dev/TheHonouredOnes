import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Store, Gift, Percent, Star, Clock, Zap, ShoppingCart, Heart, Filter, QrCode, Ticket, CreditCard } from "lucide-react";

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

  const vouchers = [
    {
      id: 1,
      merchant: "Amazon",
      title: "Amazon Gift Card",
      value: 50,
      discount: 5,
      finalPrice: 47.5,
      cashback: 2.5,
      category: "gift-card",
      image: product1,
      validUntil: "2024-12-31",
      terms: "Valid for all products on Amazon",
      featured: true
    },
    {
      id: 2,
      merchant: "Flipkart",
      title: "Flipkart Shopping Voucher",
      value: 100,
      discount: 10,
      finalPrice: 90,
      cashback: 5,
      category: "voucher",
      image: product2,
      validUntil: "2024-11-30",
      terms: "Valid for electronics and fashion",
      featured: true
    },
    {
      id: 3,
      merchant: "Swiggy",
      title: "Food Delivery Coupon",
      value: 25,
      discount: 15,
      finalPrice: 21.25,
      cashback: 1.25,
      category: "coupon",
      image: product3,
      validUntil: "2024-10-15",
      terms: "Valid for orders above 15 USDT",
      featured: false
    },
    {
      id: 4,
      merchant: "Netflix",
      title: "Netflix Subscription Card",
      value: 15,
      discount: 8,
      finalPrice: 13.8,
      cashback: 0.75,
      category: "gift-card",
      image: product4,
      validUntil: "2024-12-31",
      terms: "1 month premium subscription",
      featured: false
    },
    {
      id: 5,
      merchant: "Uber",
      title: "Uber Ride Credits",
      value: 30,
      discount: 12,
      finalPrice: 26.4,
      cashback: 1.5,
      category: "voucher",
      image: product5,
      validUntil: "2024-11-15",
      terms: "Valid for rides in major cities",
      featured: false
    },
    {
      id: 6,
      merchant: "Starbucks",
      title: "Coffee Shop Discount",
      value: 20,
      discount: 20,
      finalPrice: 16,
      cashback: 1,
      category: "coupon",
      image: product6,
      validUntil: "2024-09-30",
      terms: "Valid at all Starbucks locations",
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: "🏪" },
    { id: "gift-card", name: "Gift Cards", icon: "🎁" },
    { id: "voucher", name: "Vouchers", icon: "🎫" },
    { id: "coupon", name: "Coupons", icon: "🏷️" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "computers", name: "Computers", icon: "💻" },
    { id: "health", name: "Health & Fitness", icon: "💪" },
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "home", name: "Home & Garden", icon: "🏠" }
  ];

  const stats = [
    { label: "Total Earned", value: "1,250 USDT", icon: Gift, color: "text-green-500" },
    { label: "Vouchers Available", value: "500+", icon: Ticket, color: "text-blue-500" },
    { label: "Avg Cashback", value: "8.5%", icon: Percent, color: "text-purple-500" },
    { label: "This Month", value: "350 USDT", icon: Zap, color: "text-orange-500" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voucher.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || voucher.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredVouchers = vouchers.filter(voucher => voucher.featured);

  const VoucherCard = ({ voucher }: { voucher: any }) => (
    <Card className="glass-card hover-lift group">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={voucher.image} 
            alt={voucher.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            {voucher.discount}% OFF
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="text-xs">{voucher.merchant}</Badge>
            <Badge variant="secondary" className="text-xs capitalize">{voucher.category.replace('-', ' ')}</Badge>
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">{voucher.title}</h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold">{voucher.finalPrice} USDT</span>
            <span className="text-sm text-muted-foreground line-through">{voucher.value} USDT</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              +{voucher.cashback} USDT back
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            <p>Valid until: {voucher.validUntil}</p>
            <p>{voucher.terms}</p>
          </div>
          <Button className="w-full bg-gradient-primary">
            <CreditCard className="w-4 h-4 mr-2" />
            Buy with USDT
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
                placeholder="Search for products, vouchers, or merchants..."
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

      {/* Tabs for Products and Vouchers */}
      <Tabs defaultValue="vouchers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vouchers">Vouchers & Gift Cards</TabsTrigger>
          <TabsTrigger value="products">Physical Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vouchers" className="space-y-6">
          {/* Featured Vouchers */}
          {selectedCategory === 'all' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Featured Deals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredVouchers.map((voucher) => (
                    <VoucherCard key={voucher.id} voucher={voucher} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Vouchers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVouchers.map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </div>

          {filteredVouchers.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No vouchers found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Keep existing products implementation but simplified */}
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
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold">{product.price} USDT</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice} USDT</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 mb-3">
                      Earn {product.cashback} USDT back
                    </Badge>
                    <Button className="w-full bg-gradient-primary">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;
