import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, Globe, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Building the Future of{" "}
            <span className="gradient-text">Credit Infrastructure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CLen is revolutionizing access to credit in India through AI-powered assessment, 
            zero-collateral loans, and Web3-native financial infrastructure.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-clen-green" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to credit for millions of Indians by building 
                a transparent, AI-powered, and Web3-native credit infrastructure that 
                eliminates traditional barriers and biases.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-6 h-6 text-clen-blue" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where creditworthiness is determined by behavior and potential, 
                not just history, enabling financial inclusion for the next billion users 
                in the Web3 economy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center space-y-3">
                <Shield className="w-12 h-12 text-clen-green mx-auto" />
                <h3 className="text-xl font-semibold">Trust & Security</h3>
                <p className="text-muted-foreground">
                  Built with privacy-first principles and zero-knowledge proofs
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center space-y-3">
                <Zap className="w-12 h-12 text-clen-blue mx-auto" />
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  Leveraging AI and blockchain for next-generation finance
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6 text-center space-y-3">
                <Users className="w-12 h-12 text-clen-purple mx-auto" />
                <h3 className="text-xl font-semibold">Inclusion</h3>
                <p className="text-muted-foreground">
                  Making credit accessible to everyone, regardless of background
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Join the Revolution?</h2>
          <Button size="lg" className="bg-gradient-primary" asChild>
            <Link to="/auth/connect">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;