import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, TrendingUp, Clock, Plus, ArrowRight, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CreditHub = () => {
  const [availableCredit] = useState(25000);
  const [usedCredit] = useState(16250);
  const [creditScore] = useState(720);

  const activeLoans = [
    {
      id: 1,
      amount: 15000,
      remaining: 12500,
      nextPayment: 2500,
      dueDate: "Mar 15, 2024",
      interestRate: 8.5,
      status: "active"
    },
    {
      id: 2,
      amount: 8000,
      remaining: 3750,
      nextPayment: 1250,
      dueDate: "Mar 20, 2024",
      interestRate: 7.2,
      status: "active"
    }
  ];

  const recentTransactions = [
    { date: "Mar 10", description: "Loan Payment", amount: -2500, type: "payment" },
    { date: "Mar 8", description: "Loan Disbursed", amount: 15000, type: "loan" },
    { date: "Mar 5", description: "Early Payment Bonus", amount: 50, type: "bonus" },
    { date: "Mar 1", description: "Loan Payment", amount: -1250, type: "payment" },
  ];

  const utilizationPercentage = (usedCredit / availableCredit) * 100;

  return (
    <div className="space-y-6">
      {/* Credit Overview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit Management</h1>
          <p className="text-muted-foreground">Manage your credit lines and loans</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link to="/credit/insights">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Insights
            </Link>
          </Button>
          <Button className="bg-gradient-primary" asChild>
            <Link to="/credit/request">
              <Plus className="w-4 h-4 mr-2" />
              Request Credit
            </Link>
          </Button>
        </div>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-clen-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(availableCredit - usedCredit).toLocaleString()}</div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Used: ₹{usedCredit.toLocaleString()}</span>
                <span>Limit: ₹{availableCredit.toLocaleString()}</span>
              </div>
              <Progress value={utilizationPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {utilizationPercentage.toFixed(1)}% utilization
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-clen-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{usedCredit.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
              <Clock className="w-3 h-3" />
              <span>Next payment in 5 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-clen-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">{creditScore}</div>
            <Badge variant="secondary" className="bg-clen-green/10 text-clen-green mt-2">
              +12 this month
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">Active Loans</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-clen-blue" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-24 flex-col space-y-2" variant="outline" asChild>
                  <Link to="/credit/request">
                    <Plus className="w-6 h-6" />
                    <span>Request Loan</span>
                  </Link>
                </Button>
                <Button className="h-24 flex-col space-y-2" variant="outline" asChild>
                  <Link to="/credit/repay">
                    <CreditCard className="w-6 h-6" />
                    <span>Make Payment</span>
                  </Link>
                </Button>
                <Button className="h-24 flex-col space-y-2" variant="outline">
                  <TrendingUp className="w-6 h-6" />
                  <span>Increase Limit</span>
                </Button>
                <Button className="h-24 flex-col space-y-2" variant="outline">
                  <Shield className="w-6 h-6" />
                  <span>Freeze Credit</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/credit/history">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.type === 'payment' ? 'bg-destructive' :
                        transaction.type === 'loan' ? 'bg-clen-blue' : 'bg-clen-green'
                      }`}></div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.amount > 0 ? 'text-clen-green' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <div className="grid gap-6">
            {activeLoans.map((loan) => (
              <Card key={loan.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Loan #{loan.id}</CardTitle>
                    <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                      {loan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="text-lg font-semibold">₹{loan.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-lg font-semibold">₹{loan.remaining.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment</p>
                      <p className="text-lg font-semibold">₹{loan.nextPayment.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Due: {loan.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-lg font-semibold">{loan.interestRate}%</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex space-x-3">
                      <Button size="sm" asChild>
                        <Link to="/credit/repay">Make Payment</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Modify Terms
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <p className="text-muted-foreground">Complete history of all your credit transactions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.concat([
                  { date: "Feb 28", description: "Loan Payment", amount: -1250, type: "payment" },
                  { date: "Feb 25", description: "Cashback Reward", amount: 75, type: "bonus" },
                  { date: "Feb 20", description: "Loan Payment", amount: -2500, type: "payment" },
                  { date: "Feb 15", description: "Emergency Loan", amount: 5000, type: "loan" },
                ]).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.type === 'payment' ? 'bg-destructive' :
                        transaction.type === 'loan' ? 'bg-clen-blue' : 'bg-clen-green'
                      }`}></div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.amount > 0 ? 'text-clen-green' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Credit Preferences</CardTitle>
                <p className="text-muted-foreground">Manage your credit settings and preferences</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Pay</h4>
                    <p className="text-sm text-muted-foreground">Automatically pay minimum amounts</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payment Reminders</h4>
                    <p className="text-sm text-muted-foreground">Get notified before due dates</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Credit Limit Increase</h4>
                    <p className="text-sm text-muted-foreground">Request automatic limit increases</p>
                  </div>
                  <Button variant="outline" size="sm">Request</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <p className="text-muted-foreground">Protect your credit account</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Freeze Credit</h4>
                    <p className="text-sm text-muted-foreground">Temporarily disable new credit requests</p>
                  </div>
                  <Button variant="outline" size="sm">Freeze</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Transaction Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified of all credit activity</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditHub;