import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, CreditCard, DollarSign, Gift, Plus, Eye, Zap, Target, ExternalLink, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useWeb3Integration } from "@/hooks/useWeb3Integration";
import { DepositForm } from "@/components/web3/DepositForm";
import { WithdrawForm } from "@/components/web3/WithdrawForm";

const Dashboard = () => {
  // Web3 Integration
  const {
    isConnected,
    usdcBalance,
    poolStats,
    userVoucherInfo,
    userDeposits,
    claimFaucet,
    isFaucetLoading
  } = useWeb3Integration();

  const scoreData = [
    { month: 'Jan', score: 650 },
    { month: 'Feb', score: 670 },
    { month: 'Mar', score: 680 },
    { month: 'Apr', score: 695 },
    { month: 'May', score: 710 },
    { month: 'Jun', score: 720 },
  ];

  const activities = [
    { type: 'payment', description: 'Loan repayment of 5,000 USDT', time: '2 hours ago', impact: '+5 points' },
    { type: 'loan', description: 'New loan approved - 15,000 USDT', time: '1 day ago', impact: 'No impact' },
    { type: 'cashback', description: 'Cashback earned from Flipkart', time: '2 days ago', impact: '+150 USDT' },
    { type: 'score', description: 'Credit score updated', time: '3 days ago', impact: '+12 points' },
  ];

  const creditHistory = [
    {
      id: 1,
      lender: "CLen Protocol",
      amount: "15,000 USDT",
      date: "2024-06-15",
      status: "Active",
      walletAddress: "0x1234...5678",
      interestRate: "8.5%",
      dueDate: "2024-12-15",
      category: "Personal Loan"
    },
    {
      id: 2,
      lender: "DeFi Lender DAO",
      amount: "8,500 USDT",
      date: "2024-05-20",
      status: "Paid",
      walletAddress: "0xabcd...efgh",
      interestRate: "9.2%",
      dueDate: "2024-11-20",
      category: "Business Loan"
    },
    {
      id: 3,
      lender: "Crypto Credit Union",
      amount: "3,200 USDT",
      date: "2024-04-10",
      status: "Overdue",
      walletAddress: "0x9876...5432",
      interestRate: "12.0%",
      dueDate: "2024-10-10",
      category: "Emergency Loan"
    }
  ];

  const recommendations = [
    {
      title: "Optimize Credit Utilization",
      description: "Your utilization is at 65%. Keep it below 30% for better scores.",
      impact: "+15-25 points",
      action: "Pay 8,000 USDT"
    },
    {
      title: "Set Auto-Pay",
      description: "Never miss a payment with automatic repayments.",
      impact: "+10-20 points",
      action: "Enable Now"
    },
    {
      title: "Upgrade Voucher Tier",
      description: "Unlock higher limits with Premium tier.",
      impact: "50% more credit",
      action: "Upgrade"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'paid':
        return <Badge className="bg-blue-100 text-blue-700">Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Calculate metrics from Web3 data
  const creditScore = 720;
  const availableCredit = userVoucherInfo ? parseFloat(userVoucherInfo.limit) - parseFloat(userVoucherInfo.utilized) : 0;
  const activeLoans = userVoucherInfo && parseFloat(userVoucherInfo.debt) > 0 ? 1 : 0;
  const utilizationPercent = userVoucherInfo ? 
    (parseFloat(userVoucherInfo.utilized) / parseFloat(userVoucherInfo.limit)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Aarav!</h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>
        <div className="flex space-x-3">
          {isConnected && (
            <Button
              onClick={claimFaucet}
              disabled={isFaucetLoading}
              variant="outline"
              className="glass-button"
            >
              <Coins className="w-4 h-4 mr-2" />
              {isFaucetLoading ? 'Claiming...' : 'Get Test USDT'}
            </Button>
          )}
          <Button className="bg-gradient-primary" asChild>
            <Link to="/credit/request">
              <Plus className="w-4 h-4 mr-2" />
              Request Loan
            </Link>
          </Button>
        </div>
      </div>

      {/* USDC Balance Card */}
      {isConnected && (
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-clen-green" />
              <span>USDT Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-clen-green">${usdcBalance}</div>
            <p className="text-sm text-muted-foreground">Available in your wallet</p>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-clen-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">{creditScore}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                +12 this month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Available Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-clen-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{availableCredit.toLocaleString()} USDT</div>
            <Progress value={utilizationPercent} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{utilizationPercent.toFixed(1)}% utilized</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-clen-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeLoans}</div>
            <p className="text-xs text-muted-foreground">
              {userVoucherInfo?.debt && parseFloat(userVoucherInfo.debt) > 0 
                ? `Outstanding: $${userVoucherInfo.debt}` 
                : 'No active loans'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pool Deposits</CardTitle>
            <Gift className="h-4 w-4 text-clen-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${userDeposits}</div>
            <p className="text-xs text-muted-foreground">Your contribution to pool</p>
          </CardContent>
        </Card>
      </div>

      {/* Web3 Actions */}
      {isConnected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DepositForm />
          <WithdrawForm userDeposits={userDeposits} />
        </div>
      )}

      {/* Pool Stats */}
      {poolStats && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Pool Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-clen-green">${poolStats.totalDeposits}</div>
                <div className="text-sm text-muted-foreground">Total Deposits</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-clen-blue">${poolStats.totalBorrowed}</div>
                <div className="text-sm text-muted-foreground">Total Borrowed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-clen-purple">${poolStats.totalRepaid}</div>
                <div className="text-sm text-muted-foreground">Total Repaid</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-clen-orange">${poolStats.availableLiquidity}</div>
                <div className="text-sm text-muted-foreground">Available Liquidity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credit Score Visualization & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-clen-green" />
              <span className="text-white">Credit Score Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--clen-green))" 
                  fill="hsl(var(--clen-green))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-clen-blue" />
              <span className="text-white">Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start glass-button" variant="ghost" asChild>
              <Link to="/credit/request">
                <Plus className="w-4 h-4 mr-3" />
                Request New Loan
              </Link>
            </Button>
            <Button className="w-full justify-start glass-button" variant="ghost" asChild>
              <Link to="/credit/repay">
                <CreditCard className="w-4 h-4 mr-3" />
                Make Payment
              </Link>
            </Button>
            <Button className="w-full justify-start glass-button" variant="ghost" asChild>
              <Link to="/credit/insights">
                <Eye className="w-4 h-4 mr-3" />
                View Credit Report
              </Link>
            </Button>
            <Button className="w-full justify-start glass-button" variant="ghost" asChild>
              <Link to="/marketplace">
                <Gift className="w-4 h-4 mr-3" />
                Browse Offers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Credit History Details */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-clen-blue" />
            <span className="text-white">Credit History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Lender</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Interest Rate</TableHead>
                <TableHead className="text-white">Due Date</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Wallet Address</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditHistory.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium text-white">{loan.lender}</TableCell>
                  <TableCell className="text-white">{loan.amount}</TableCell>
                  <TableCell className="text-white">{loan.date}</TableCell>
                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                  <TableCell className="text-white">{loan.interestRate}</TableCell>
                  <TableCell className="text-white">{loan.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/20 text-white">{loan.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded text-white">
                      {loan.walletAddress}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" className="glass-button">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Insights & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-clen-purple" />
              <span className="text-white">AI Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg glass border border-white/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-white">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white">{rec.impact}</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="glass-button">
                    {rec.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-clen-green rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-white">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white">
                      {activity.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
