import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Smartphone, Building2, DollarSign, Clock, Zap, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreditRepay = () => {
  const [selectedLoan, setSelectedLoan] = useState("1");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const activeLoans = [
    {
      id: "1",
      amount: 15000,
      remaining: 12500,
      nextPayment: 2500,
      dueDate: "Mar 15, 2024",
      daysLeft: 5,
      interestRate: 8.5,
      minimumPayment: 2500
    },
    {
      id: "2",
      amount: 8000,
      remaining: 3750,
      nextPayment: 1250,
      dueDate: "Mar 20, 2024",
      daysLeft: 10,
      interestRate: 7.2,
      minimumPayment: 1250
    }
  ];

  const paymentMethods = [
    { id: "wallet", name: "Crypto Wallet", icon: Wallet, description: "USDT/USDC from connected wallet" },
    { id: "upi", name: "UPI", icon: Smartphone, description: "Pay via UPI apps" },
    { id: "bank", name: "Bank Transfer", icon: Building2, description: "Direct bank transfer" },
    { id: "card", name: "Debit Card", icon: CreditCard, description: "Pay with debit card" }
  ];

  const selectedLoanData = activeLoans.find(loan => loan.id === selectedLoan);
  const cashbackAmount = Math.round((parseFloat(paymentAmount) || 0) * 0.02); // 2% cashback

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Payment Successful! 🎉",
      description: `Payment of ₹${paymentAmount} processed successfully. Cashback of ₹${cashbackAmount} credited.`,
    });
    
    setIsProcessing(false);
    setPaymentAmount("");
  };

  const handleQuickPayment = (amount: number) => {
    setPaymentAmount(amount.toString());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Repay Loan</h1>
        <p className="text-muted-foreground">Make payments and earn cashback rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-clen-blue" />
                <span>Select Loan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLoans.map((loan) => (
                <div
                  key={loan.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedLoan === loan.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedLoan(loan.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">Loan #{loan.id}</h3>
                        <Badge variant={loan.daysLeft <= 5 ? "destructive" : "secondary"}>
                          Due in {loan.daysLeft} days
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Remaining: ₹{loan.remaining.toLocaleString()} • Rate: {loan.interestRate}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">₹{loan.nextPayment.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Minimum due</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Amount */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-clen-green" />
                <span>Payment Amount</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Enter Amount</Label>
                <Input
                  type="number"
                  placeholder="₹0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="text-lg bg-input"
                />
              </div>

              {selectedLoanData && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPayment(selectedLoanData.minimumPayment)}
                  >
                    Minimum
                    <br />₹{selectedLoanData.minimumPayment.toLocaleString()}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPayment(selectedLoanData.minimumPayment * 2)}
                  >
                    Double
                    <br />₹{(selectedLoanData.minimumPayment * 2).toLocaleString()}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPayment(Math.round(selectedLoanData.remaining / 2))}
                  >
                    Half
                    <br />₹{Math.round(selectedLoanData.remaining / 2).toLocaleString()}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPayment(selectedLoanData.remaining)}
                  >
                    Full
                    <br />₹{selectedLoanData.remaining.toLocaleString()}
                  </Button>
                </div>
              )}

              {paymentAmount && (
                <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
                  <div className="flex justify-between">
                    <span>Payment Amount:</span>
                    <span className="font-medium">₹{parseFloat(paymentAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-clen-green">
                    <span>Cashback (2%):</span>
                    <span className="font-medium">₹{cashbackAmount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Net Payment:</span>
                    <span>₹{(parseFloat(paymentAmount) - cashbackAmount).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-secondary">
                  {paymentMethods.map((method) => (
                    <TabsTrigger key={method.id} value={method.id} className="flex flex-col space-y-1 h-16">
                      <method.icon className="w-4 h-4" />
                      <span className="text-xs">{method.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {paymentMethods.map((method) => (
                  <TabsContent key={method.id} value={method.id} className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <method.icon className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>

                      {method.id === "wallet" && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                            <div className="flex items-center justify-between">
                              <span>Connected Wallet</span>
                              <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                                Connected
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">0x1234...5678</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <div>USDT Balance: 1,245.50</div>
                              <div>USDC Balance: 892.30</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {method.id === "upi" && (
                        <div className="space-y-3">
                          <Label>UPI ID</Label>
                          <Input placeholder="yourname@paytm" className="bg-input" />
                        </div>
                      )}

                      {method.id === "bank" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Account Number</Label>
                            <Input placeholder="XXXX XXXX XXXX 1234" className="bg-input" />
                          </div>
                          <div className="space-y-2">
                            <Label>IFSC Code</Label>
                            <Input placeholder="SBIN0001234" className="bg-input" />
                          </div>
                        </div>
                      )}

                      {method.id === "card" && (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Card Number</Label>
                            <Input placeholder="1234 5678 9012 3456" className="bg-input" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Expiry Date</Label>
                              <Input placeholder="MM/YY" className="bg-input" />
                            </div>
                            <div className="space-y-2">
                              <Label>CVV</Label>
                              <Input placeholder="123" className="bg-input" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Loan Summary */}
          {selectedLoanData && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-clen-purple" />
                  <span>Loan Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Original Amount</span>
                  <span className="font-medium">₹{selectedLoanData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Remaining Balance</span>
                  <span className="font-medium">₹{selectedLoanData.remaining.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Interest Rate</span>
                  <span className="font-medium">{selectedLoanData.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Due Date</span>
                  <span className="font-medium">{selectedLoanData.dueDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span>Next Payment</span>
                  <span className="font-bold">₹{selectedLoanData.nextPayment.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rewards & Benefits */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-clen-orange" />
                <span>Rewards & Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-clen-green" />
                <span>2% cashback on all payments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CreditCard className="w-4 h-4 text-clen-blue" />
                <span>No processing fees</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-clen-purple" />
                <span>Instant payment processing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Gift className="w-4 h-4 text-clen-orange" />
                <span>Bonus rewards for early payments</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90" 
            size="lg"
            onClick={handlePayment}
            disabled={!paymentAmount || !paymentMethod || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ₹{paymentAmount || '0'}
              </>
            )}
          </Button>

          {paymentAmount && (
            <div className="text-center text-sm text-muted-foreground">
              You'll earn ₹{cashbackAmount} cashback with this payment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditRepay;