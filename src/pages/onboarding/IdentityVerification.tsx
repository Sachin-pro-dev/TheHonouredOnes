import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const IdentityVerification = () => {
  const [step, setStep] = useState(1);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const steps = [
    { id: 1, title: "Aadhaar Verification", icon: Shield },
    { id: 2, title: "Biometric Check", icon: Eye },
    { id: 3, title: "Document Verification", icon: FileText },
    { id: 4, title: "Verification Complete", icon: CheckCircle }
  ];

  const handleAadhaarSubmit = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Identity Verification</h1>
          <p className="text-muted-foreground">
            Verify your identity securely using zero-knowledge proofs
          </p>
          <Progress value={(step / steps.length) * 100} className="w-full" />
        </div>

        {/* Steps */}
        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className={`flex flex-col items-center space-y-2 ${
                step >= s.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= s.id ? 'border-primary bg-primary/10' : 'border-border'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center">{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-clen-green" />
              <span>Aadhaar ZK Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Aadhaar Number</Label>
                  <Input
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="bg-input"
                  />
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                  <h4 className="font-medium text-sm">🔒 Privacy Guaranteed</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Your Aadhaar number is never stored</li>
                    <li>• Zero-knowledge proofs protect your identity</li>
                    <li>• Only age (18+) and state are verified</li>
                    <li>• Compliant with data protection laws</li>
                  </ul>
                </div>

                <Button 
                  className="w-full bg-gradient-primary" 
                  onClick={handleAadhaarSubmit}
                  disabled={!aadhaarNumber || isVerifying}
                >
                  {isVerifying ? "Generating ZK Proof..." : "Verify with ZK Proof"}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto">
                  <Eye className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Verification Complete!</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                    ✓ Age verified (18+)
                  </Badge>
                  <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                    ✓ Identity uniqueness confirmed
                  </Badge>
                  <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                    ✓ Residence state verified
                  </Badge>
                </div>
                <Button className="w-full bg-gradient-primary" asChild>
                  <Link to="/onboarding/did">Continue to DID Setup</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/auth/connect" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Wallet Connection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;