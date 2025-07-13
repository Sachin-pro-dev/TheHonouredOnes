import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key, Shield, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DIDSetup = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto">
            <Key className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold">Create Your DID</h1>
          <p className="text-muted-foreground">
            Decentralized Identity for complete control over your data
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>DID Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-clen-green" />
              <div>
                <p className="font-medium">Self-Sovereign Identity</p>
                <p className="text-sm text-muted-foreground">You own and control your identity</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-clen-blue" />
              <div>
                <p className="font-medium">Verifiable Credentials</p>
                <p className="text-sm text-muted-foreground">Cryptographically secure credentials</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-clen-purple" />
              <div>
                <p className="font-medium">Privacy Preserving</p>
                <p className="text-sm text-muted-foreground">Share only what's necessary</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Badge variant="secondary" className="w-full justify-center py-2 bg-clen-green/10 text-clen-green">
            ✓ DID Generated: did:clen:0x1234...5678
          </Badge>
          <Badge variant="secondary" className="w-full justify-center py-2 bg-clen-blue/10 text-clen-blue">
            ✓ Identity Credentials Issued
          </Badge>
          <Badge variant="secondary" className="w-full justify-center py-2 bg-clen-purple/10 text-clen-purple">
            ✓ Privacy Settings Configured
          </Badge>
        </div>

        <Button className="w-full bg-gradient-primary" asChild>
          <Link to="/onboarding/assessment">
            Continue to Credit Assessment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DIDSetup;