import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, DollarSign, Star, ChevronDown } from "lucide-react";

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Verify Identity", subtitle: "Aadhaar + ZK-proof", icon: Shield },
    { title: "Build Credit Score", subtitle: "AI assessment", icon: TrendingUp },
    { title: "Access Loans", subtitle: "Instant approval", icon: Zap },
    { title: "Repay & Improve", subtitle: "Score optimization", icon: Star }
  ];

  const features = [
    {
      icon: Shield,
      title: "Zero Collateral Required",
      description: "Access credit without traditional security deposits using AI-powered risk assessment"
    },
    {
      icon: Zap,
      title: "AI-Powered Scoring",
      description: "Dynamic credit assessment based on behavior, not just history"
    },
    {
      icon: Globe,
      title: "Web3 Native",
      description: "Decentralized, composable credit infrastructure built for the future"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Users Served" },
    { value: "₹50Cr+", label: "Loans Processed" },
    { value: "95%", label: "Approval Rate" },
    { value: "150+", label: "Avg Score Improvement" }
  ];

  const testimonials = [
    {
      name: "Priya S.",
      location: "Mumbai",
      text: "CLen helped me build my credit score from scratch. Got my first loan in just 5 minutes!",
      score: "+180 points"
    },
    {
      name: "Rahul K.",
      location: "Bangalore",
      text: "The AI assessment was spot-on. No paperwork, no hassle, just instant credit.",
      score: "+210 points"
    },
    {
      name: "Anita M.",
      location: "Delhi",
      text: "Finally, a credit system that understands the real India. Completely changed my financial life.",
      score: "+156 points"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold gradient-text">CLen</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link>
            <Link to="/docs" className="text-sm hover:text-primary transition-colors">Docs</Link>
            <Link to="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth/connect">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
              <Link to="/auth/connect">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            Now Live on Base • Zero Collateral Loans
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Your{" "}
            <span className="gradient-text">Web3 Credit Score</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Access zero-collateral loans through AI-powered credit assessment. 
            No traditional banks, no paperwork, just instant credit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8" asChild>
              <Link to="/auth/connect">
                Start Building Credit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>

          {/* Hero Animation */}
          <div className="mt-16 relative">
            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-left space-y-4">
                <h3 className="text-lg font-semibold">Credit Building Process</h3>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                        index === currentStep ? 'bg-primary/10 border border-primary/20' : 'opacity-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm text-muted-foreground">{step.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-card hover-lift border-border">
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground">Real results from real users across India</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground">See how CLen is changing lives across India</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                    {testimonial.score}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Credit?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Indians who are already building their Web3 credit score. 
            Get started in under 5 minutes.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8" asChild>
            <Link to="/auth/connect">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold gradient-text">CLen</span>
              </div>
              <p className="text-muted-foreground">
                Building the future of credit infrastructure for Web3 India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Credit Scoring</div>
                <div>Instant Loans</div>
                <div>AI Assessment</div>
                <div>DeFi Integration</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/about" className="block hover:text-foreground">About Us</Link>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
                <div>Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 CLen. All rights reserved. Built with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;