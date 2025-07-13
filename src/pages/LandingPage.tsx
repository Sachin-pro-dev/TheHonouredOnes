import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, DollarSign, Star, ChevronDown, Sparkles, CheckCircle, ArrowUpRight, Play } from "lucide-react";

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Verify Identity", subtitle: "Aadhaar + ZK-proof", icon: Shield, color: "from-clen-green to-clen-blue" },
    { title: "Build Credit Score", subtitle: "AI assessment", icon: TrendingUp, color: "from-clen-blue to-clen-purple" },
    { title: "Access Loans", subtitle: "Instant approval", icon: Zap, color: "from-clen-purple to-clen-orange" },
    { title: "Repay & Improve", subtitle: "Score optimization", icon: Star, color: "from-clen-orange to-clen-green" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Zero Collateral Required",
      description: "Access credit without traditional security deposits using AI-powered risk assessment",
      gradient: "from-clen-green/20 to-clen-blue/20"
    },
    {
      icon: Zap,
      title: "AI-Powered Scoring",
      description: "Dynamic credit assessment based on behavior, not just history",
      gradient: "from-clen-blue/20 to-clen-purple/20"
    },
    {
      icon: Globe,
      title: "Web3 Native",
      description: "Decentralized, composable credit infrastructure built for the future",
      gradient: "from-clen-purple/20 to-clen-orange/20"
    }
  ];

  const stats = [
    { value: "₹50Cr+", label: "Total Value Locked", icon: DollarSign },
    { value: "10,000+", label: "Active Users", icon: Users },
    { value: "95%", label: "Approval Rate", icon: CheckCircle },
    { value: "150+", label: "Avg Score Boost", icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra", 
      text: "CLen revolutionized my financial journey. From zero credit history to getting my first business loan in just 5 minutes!",
      score: "+180 points",
      avatar: "PS",
      rating: 5
    },
    {
      name: "Rahul Krishnan",
      location: "Bangalore, Karnataka",
      text: "The AI assessment was incredibly accurate. No paperwork hassles, just instant credit based on my real potential.",
      score: "+210 points", 
      avatar: "RK",
      rating: 5
    },
    {
      name: "Anita Mehta",
      location: "Delhi, India",
      text: "Finally, a credit system that understands modern India. It completely transformed how I manage my finances.",
      score: "+156 points",
      avatar: "AM", 
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-clen-green/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-clen-blue/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-clen-purple/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 glass backdrop-blur-2xl border-b border-border/30">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-clen-green animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">CLen</span>
              <span className="text-xs text-muted-foreground font-medium">Credit Protocol</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-sm hover:text-primary transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/docs" className="text-sm hover:text-primary transition-colors duration-300 relative group">
              Docs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/blog" className="text-sm hover:text-primary transition-colors duration-300 relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="glass-button hover:bg-primary/10 transition-all duration-300">
              <Link to="/auth/connect">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 shadow-glow hover:shadow-elegant transition-all duration-300 group" asChild>
              <Link to="/auth/connect">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-6 glass-card border-primary/30 bg-gradient-to-r from-clen-green/10 to-clen-blue/10">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-green rounded-full animate-pulse"></div>
                <span>Now Live on Base • Zero Collateral Loans</span>
              </span>
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              Build Your{" "}
              <span className="gradient-text relative">
                Web3 Credit Score
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-primary opacity-30 rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access zero-collateral loans through AI-powered credit assessment. 
              No traditional banks, no paperwork, just instant credit that grows with you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-10 py-4 shadow-glow hover:shadow-elegant transition-all duration-300 group" asChild>
              <Link to="/auth/connect">
                Start Building Credit
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 glass-button border-border/30 hover:border-primary/30 group">
              <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced Hero Animation */}
          <div className="mt-20 relative">
            <div className="glass-strong rounded-3xl p-10 max-w-lg mx-auto shadow-elegant hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
              <div className="text-left space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Credit Building Process</h3>
                  <div className="flex space-x-1">
                    {steps.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-primary w-6' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                        index === currentStep 
                          ? `bg-gradient-to-r ${step.color} bg-opacity-10 border border-primary/20 scale-105` 
                          : 'opacity-50 hover:opacity-75'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-base">{step.title}</div>
                        <div className="text-sm text-muted-foreground">{step.subtitle}</div>
                      </div>
                      {index === currentStep && (
                        <ArrowUpRight className="w-5 h-5 text-primary animate-bounce" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose CLen?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary credit infrastructure designed for the modern digital economy
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-strong hover-lift border-border/30 group overflow-hidden">
                <CardHeader className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Thousands</h2>
          <p className="text-xl text-muted-foreground">Real impact, real results across India</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h2>
          <p className="text-xl text-muted-foreground">Real people, real transformations</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-strong border-border/30 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                      <span className="text-black font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.location}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-clen-green/10 text-clen-green border-clen-green/20">
                    {testimonial.score}
                  </Badge>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-clen-orange text-clen-orange" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="glass-strong rounded-3xl p-12 md:p-20 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-clen-green/5 via-clen-blue/5 to-clen-purple/5 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Credit?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of Indians who are already building their Web3 credit score. 
              Get started in under 5 minutes and unlock your financial potential.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-xl px-12 py-6 shadow-glow hover:shadow-elegant transition-all duration-300 group" asChild>
              <Link to="/auth/connect">
                Start Your Journey
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/30 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-black font-bold text-xl">C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text">CLen</span>
                  <span className="text-xs text-muted-foreground">Credit Protocol</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Building the future of credit infrastructure for Web3 India. 
                Empowering financial inclusion through decentralized technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">𝕏</span>
                </div>
                <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">TG</span>
                </div>
                <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">DC</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="hover:text-foreground transition-colors cursor-pointer">Credit Scoring</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Instant Loans</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">AI Assessment</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">DeFi Integration</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <div className="space-y-3 text-muted-foreground">
                <Link to="/about" className="block hover:text-foreground transition-colors">About Us</Link>
                <div className="hover:text-foreground transition-colors cursor-pointer">Careers</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Press</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Legal</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Cookie Policy</div>
                <div className="hover:text-foreground transition-colors cursor-pointer">Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground">
              © 2024 CLen. All rights reserved. Built with ❤️ in India for the world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
