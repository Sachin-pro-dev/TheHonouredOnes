
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, CreditCard, Zap, Shield, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeb3Integration } from "@/hooks/useWeb3Integration";
import { CreditRequestForm } from "@/components/web3/CreditRequestForm";

const CreditRequest = () => {
  const [loanAmount, setLoanAmount] = useState([10000]);
  const [duration, setDuration] = useState("6");
  const [purpose, setPurpose] = useState("");
  const [isEligible, setIsEligible] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();
  
  // Web3 Integration
  const { isConnected, userVoucherInfo, poolStats } = useWeb3Integration();

  const interestRate = loanAmount[0] <= 1500 ? 8.5 : loanAmount[0] <= 3000 ? 9.2 : 10.1;
  const monthlyPayment = Math.round((loanAmount[0] * (1 + (interestRate / 100) * (parseInt(duration) / 12))) / parseInt(duration));
  const totalAmount = monthlyPayment * parseInt(duration);

  const eligibilityFactors = [
    { factor: "Credit Score", status: "good", value: "720 (Good)" },
    { factor: "Payment History", status: "excellent", value: "100% on-time" },
    { factor: "Credit Utilization", status: "warning", value: "65% (High)" },
    { factor: "Account Age", status: "good", value: "8 months" },
  ];

  const loanPurposes = [
    "Personal Expenses",
    "Medical Emergency",
    "Education",
    "Home Improvement",
    "Business Investment",
    "Debt Consolidation",
    "Wedding",
    "Travel",
    "Other"
  ];

  const handleLoanRequest = async () => {
    setIsApplying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Loan Approved! 🎉",
      description: `Your loan of ${loanAmount[0].toLocaleString()} USDT has been approved and will be disbursed to your wallet shortly.`,
    });
    
    setIsApplying(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Request Credit</h1>
        <p className="text-muted-foreground">Get instant approval with our AI-powered assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Web3 Credit Request */}
          {isConnected && !userVoucherInfo?.voucherId && (
            <CreditRequestForm />
          )}

          {/* Loan Calculator */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-clen-blue" />
                <span className="text-white">Loan Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-white">Loan Amount</Label>
                <div className="px-4">
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    max={userVoucherInfo ? parseFloat(userVoucherInfo.limit) : 5000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>100 USDT</span>
                  <span className="text-2xl font-bold text-clen-green">{loanAmount[0].toLocaleString()} USDT</span>
                  <span>{userVoucherInfo ? parseFloat(userVoucherInfo.limit).toLocaleString() : '5,000'} USDT</span>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-white">Loan Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="glass border border-white/20">
                    <SelectItem value="3" className="text-white hover:bg-white/10">3 months</SelectItem>
                    <SelectItem value="6" className="text-white hover:bg-white/10">6 months</SelectItem>
                    <SelectItem value="12" className="text-white hover:bg-white/10">12 months</SelectItem>
                    <SelectItem value="18" className="text-white hover:bg-white/10">18 months</SelectItem>
                    <SelectItem value="24" className="text-white hover:bg-white/10">24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Purpose */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-white">Loan Purpose</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent className="glass border border-white/20">
                    {loanPurposes.map((p) => (
                      <SelectItem key={p} value={p.toLowerCase().replace(/ /g, '-')} className="text-white hover:bg-white/10">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loan Summary */}
              <div className="p-4 rounded-lg glass border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white">Interest Rate:</span>
                  <span className="font-medium text-white">{interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Monthly Payment:</span>
                  <span className="font-medium text-white">{monthlyPayment.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Total Amount:</span>
                  <span className="font-medium text-white">{totalAmount.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total Interest:</span>
                  <span>{(totalAmount - loanAmount[0]).toLocaleString()} USDT</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income" className="text-white">Monthly Income</Label>
                  <Input id="income" placeholder="5,000 USDT" className="glass-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employment" className="text-white">Employment Type</Label>
                  <Select>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="glass border border-white/20">
                      <SelectItem value="salaried" className="text-white hover:bg-white/10">Salaried</SelectItem>
                      <SelectItem value="self-employed" className="text-white hover:bg-white/10">Self Employed</SelectItem>
                      <SelectItem value="business" className="text-white hover:bg-white/10">Business Owner</SelectItem>
                      <SelectItem value="freelancer" className="text-white hover:bg-white/10">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-white">Crypto Wallet Details</Label>
                <div className="grid grid-cols-1 gap-4">
                  <Input placeholder="USDT Wallet Address (ERC-20)" className="glass-input" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Loan will be disbursed to your USDT wallet address
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-white">
                  I agree to the terms and conditions and authorize CLen to access my credit information
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eligibility Check */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-clen-green" />
                <span className="text-white">Eligibility Check</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-clen-green mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Approval Probability</div>
              </div>

              <div className="space-y-3">
                {eligibilityFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-white">{factor.factor}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{factor.value}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        factor.status === 'excellent' ? 'bg-clen-green' :
                        factor.status === 'good' ? 'bg-clen-blue' :
                        factor.status === 'warning' ? 'bg-clen-orange' : 'bg-destructive'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Zap className="w-4 h-4 text-clen-blue" />
                  <span className="text-white">Instant approval available</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-clen-purple" />
                  <span className="text-white">Funds in 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-clen-green" />
                  <span className="text-white">No collateral required</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-clen-purple" />
                <span className="text-white">Your Credit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-white">Credit Score</span>
                <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">720</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white">Available Credit</span>
                <span className="text-sm font-medium text-white">
                  {userVoucherInfo ? `$${(parseFloat(userVoucherInfo.limit) - parseFloat(userVoucherInfo.utilized)).toFixed(2)}` : '875 USDT'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white">Current Utilization</span>
                <span className="text-sm font-medium text-white">
                  {userVoucherInfo ? 
                    `${((parseFloat(userVoucherInfo.utilized) / parseFloat(userVoucherInfo.limit)) * 100).toFixed(1)}%` : 
                    '65%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-white">Payment History</span>
                <span className="text-sm font-medium text-white">100%</span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90" 
            size="lg"
            onClick={handleLoanRequest}
            disabled={!purpose || isApplying || !isConnected}
          >
            {isApplying ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Request Loan
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this application, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditRequest;
