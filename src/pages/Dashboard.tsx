
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Shield, 
  Zap, 
  ArrowUpRight, 
  Plus,
  Wallet,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Target,
  Award,
  TrendingDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWeb3Integration } from "@/hooks/useWeb3Integration";
import DepositForm from "@/components/web3/DepositForm";
import WithdrawForm from "@/components/web3/WithdrawForm";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { formatUSDC } from "@/lib/contracts";

const Dashboard = () => {
  const { address } = useAccount();
  const { 
    usdcBalance, 
    poolStats, 
    userVoucherInfo, 
    userDeposits,
    claimFaucet, 
    isFaucetLoading 
  } = useWeb3Integration();

  const formatCurrency = (value: bigint | undefined) => {
    if (!value) return "0.00";
    return formatUSDC(value);
  };

  const creditUtilization = userVoucherInfo ? 
    (Number(formatUnits(userVoucherInfo.utilized, 6)) / Number(formatUnits(userVoucherInfo.limit, 6))) * 100 : 0;

  const quickActions = [
    {
      title: "Get Test USDC",
      description: "Claim free tokens for testing",
      icon: Plus,
      action: claimFaucet,
      variant: "default" as const,
      gradient: "from-clen-green/20 to-clen-blue/20"
    },
    {
      title: "Request Credit",
      description: "Apply for instant loan",
      icon: CreditCard,
      href: "/credit/request",
      variant: "default" as const,
      gradient: "from-clen-blue/20 to-clen-purple/20"
    },
    {
      title: "Repay Loan",
      description: "Make a payment",
      icon: DollarSign,
      href: "/credit/repay",
      variant: "outline" as const,
      gradient: "from-clen-purple/20 to-clen-orange/20"
    }
  ];

  const recentActivities = [
    {
      type: "deposit",
      description: "USDC Deposit",
      amount: "$1,250.00",
      time: "2 hours ago",
      status: "completed",
      icon: TrendingUp
    },
    {
      type: "loan",
      description: "Credit Request",
      amount: "$5,000.00",
      time: "1 day ago",
      status: "approved",
      icon: CheckCircle
    },
    {
      type: "repay",
      description: "Loan Repayment",
      amount: "$500.00",
      time: "3 days ago",
      status: "completed",
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <span>Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="glass-card bg-gradient-to-r from-clen-green/10 to-clen-blue/10 border-primary/20">
            <div className="w-2 h-2 bg-clen-green rounded-full animate-pulse mr-2" />
            Live on Base
          </Badge>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-border/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">USDC Balance</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-clen-green to-clen-blue flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">
              ${usdcBalance}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="w-4 h-4 text-clen-green" />
              <span className="text-sm text-clen-green">+12.5%</span>
              <span className="text-sm text-muted-foreground">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credit Limit</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-clen-blue to-clen-purple flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">
              ${userVoucherInfo ? formatCurrency(userVoucherInfo.limit) : "0.00"}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Target className="w-4 h-4 text-clen-blue" />
              <span className="text-sm text-muted-foreground">
                ${userVoucherInfo ? formatCurrency(userVoucherInfo.limit - userVoucherInfo.utilized) : "0.00"} available
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Debt</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-clen-purple to-clen-orange flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-clen-orange">
              ${userVoucherInfo ? formatCurrency(userVoucherInfo.debt) : "0.00"}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Next payment in 15 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credit Score</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-clen-orange to-clen-green flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">750</div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="w-4 h-4 text-clen-green" />
              <span className="text-sm text-clen-green">+25 points</span>
              <span className="text-sm text-muted-foreground">this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Credit Utilization */}
      {userVoucherInfo && (
        <Card className="glass-card border-border/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Credit Utilization</CardTitle>
                <CardDescription>
                  ${formatCurrency(userVoucherInfo.utilized)} of ${formatCurrency(userVoucherInfo.limit)} used
                </CardDescription>
              </div>
              <Badge variant={creditUtilization > 80 ? "destructive" : creditUtilization > 50 ? "secondary" : "default"}>
                {creditUtilization.toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress 
              value={creditUtilization} 
              className="h-3"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Excellent utilization is below 30%</span>
              <span>{creditUtilization > 80 ? "High" : creditUtilization > 50 ? "Moderate" : "Good"}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Quick Actions */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${action.gradient} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-white/80 text-sm mb-4">{action.description}</p>
                {action.action ? (
                  <Button 
                    onClick={action.action}
                    variant={action.variant}
                    size="sm"
                    className="glass-button border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                    disabled={isFaucetLoading}
                  >
                    {isFaucetLoading ? "Processing..." : "Execute"}
                  </Button>
                ) : (
                  <Button 
                    variant={action.variant}
                    size="sm"
                    className="glass-button border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to={action.href!}>Execute</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Pool Stats & Web3 Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Pool Statistics</span>
            </CardTitle>
            <CardDescription>Real-time lending pool metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Deposits</div>
                <div className="text-2xl font-bold gradient-text">
                  ${poolStats ? poolStats.totalDeposits : "0.00"}
                </div>
              </div>
              <div className="glass rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Available Liquidity</div>
                <div className="text-2xl font-bold text-clen-green">
                  ${poolStats ? poolStats.availableLiquidity : "0.00"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Borrowed</div>
                <div className="text-2xl font-bold text-clen-blue">
                  ${poolStats ? poolStats.totalBorrowed : "0.00"}
                </div>
              </div>
              <div className="glass rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Repaid</div>
                <div className="text-2xl font-bold text-clen-purple">
                  ${poolStats ? poolStats.totalRepaid : "0.00"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.description}</p>
                      <span className="text-lg font-bold">{activity.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Web3 Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="text-xl">Deposit USDC</CardTitle>
            <CardDescription>Add funds to the lending pool</CardDescription>
          </CardHeader>
          <CardContent>
            <DepositForm />
          </CardContent>
        </Card>

        <Card className="glass-card border-border/30">
          <CardHeader>
            <CardTitle className="text-xl">Withdraw USDC</CardTitle>
            <CardDescription>Withdraw your deposited funds</CardDescription>
          </CardHeader>
          <CardContent>
            <WithdrawForm userDeposits={userDeposits} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
