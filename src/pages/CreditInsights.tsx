import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Download, RefreshCw, Target, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from "recharts";

const CreditInsights = () => {
  const [creditScore] = useState(720);
  const [scoreHistory] = useState([
    { month: 'Oct', score: 650 },
    { month: 'Nov', score: 665 },
    { month: 'Dec', score: 680 },
    { month: 'Jan', score: 695 },
    { month: 'Feb', score: 710 },
    { month: 'Mar', score: 720 },
  ]);

  const scoreFactors = [
    { factor: "Payment History", weight: 35, score: 85, description: "Excellent payment record" },
    { factor: "Credit Utilization", weight: 30, score: 65, description: "Currently high at 65%" },
    { factor: "Credit History Length", weight: 15, score: 70, description: "8 months average age" },
    { factor: "Credit Mix", weight: 10, score: 80, description: "Good variety of credit types" },
    { factor: "New Credit", weight: 10, score: 75, description: "Moderate recent activity" }
  ];

  const creditMix = [
    { name: "Personal Loans", value: 60, color: "#4ade80" },
    { name: "Credit Cards", value: 25, color: "#3b82f6" },
    { name: "Emergency Credit", value: 15, color: "#8b5cf6" }
  ];

  const improvements = [
    {
      action: "Reduce Credit Utilization to 30%",
      impact: "+25 points",
      timeline: "1-2 months",
      priority: "High",
      description: "Pay down ₹8,750 to reach optimal utilization"
    },
    {
      action: "Set Up Automatic Payments",
      impact: "+15 points",
      timeline: "Immediate",
      priority: "Medium",
      description: "Never miss a payment with auto-pay"
    },
    {
      action: "Maintain Low Balances",
      impact: "+10 points",
      timeline: "3-6 months",
      priority: "Medium",
      description: "Keep balances low consistently"
    },
    {
      action: "Add Another Credit Type",
      impact: "+8 points",
      timeline: "6+ months",
      priority: "Low",
      description: "Diversify your credit portfolio"
    }
  ];

  const monthlyInsights = [
    { month: 'Jan', utilization: 45, payments: 3, onTime: 100 },
    { month: 'Feb', utilization: 55, payments: 4, onTime: 100 },
    { month: 'Mar', utilization: 65, payments: 2, onTime: 100 },
  ];

  const getScoreRating = (score: number) => {
    if (score >= 800) return { rating: "Excellent", color: "text-clen-green" };
    if (score >= 740) return { rating: "Very Good", color: "text-clen-blue" };
    if (score >= 670) return { rating: "Good", color: "text-clen-purple" };
    if (score >= 580) return { rating: "Fair", color: "text-clen-orange" };
    return { rating: "Poor", color: "text-destructive" };
  };

  const { rating, color } = getScoreRating(creditScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit Insights</h1>
          <p className="text-muted-foreground">Detailed analysis of your credit profile</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-clen-blue" />
              <span>Credit Score Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis domain={[600, 800]} stroke="rgba(255,255,255,0.5)" />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--clen-green))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--clen-green))", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center">Current Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold gradient-text">{creditScore}</div>
            <Badge variant="secondary" className={`${color.replace('text-', 'bg-')}/10 ${color}`}>
              {rating}
            </Badge>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4 text-clen-green" />
                <span className="text-sm text-clen-green">+70 points this year</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Better than 78% of users
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="factors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="factors">Score Factors</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="simulation">Simulator</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-6">
          {/* Score Factors Breakdown */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Score Factors Breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">
                Understanding what affects your credit score
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {scoreFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{factor.factor}</span>
                      <Badge variant="outline" className="text-xs">
                        {factor.weight}% weight
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{factor.score}/100</span>
                      {factor.score >= 80 ? (
                        <TrendingUp className="w-4 h-4 text-clen-green" />
                      ) : factor.score >= 60 ? (
                        <TrendingUp className="w-4 h-4 text-clen-orange" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Credit Mix */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-clen-purple" />
                <span>Credit Portfolio Mix</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={creditMix}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {creditMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {creditMix.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-clen-orange" />
                <span>Personalized Improvement Plan</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Follow these recommendations to improve your credit score
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {improvements.map((improvement, index) => (
                <Card key={index} className="border-border bg-secondary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{improvement.action}</h4>
                          <Badge 
                            variant={improvement.priority === 'High' ? 'destructive' : 
                                   improvement.priority === 'Medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {improvement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{improvement.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-clen-green font-medium">{improvement.impact}</span>
                          <span className="text-muted-foreground">{improvement.timeline}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Credit Utilization Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyInsights}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Bar dataKey="utilization" fill="hsl(var(--clen-blue))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Payment Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-clen-green">100%</div>
                  <p className="text-sm text-muted-foreground">On-time payment rate</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Payments</span>
                    <span className="font-medium">9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">On-time Payments</span>
                    <span className="font-medium text-clen-green">9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Late Payments</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Missed Payments</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-clen-purple" />
                <span>Credit Score Simulator</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                See how different actions would affect your credit score
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">What-If Scenarios</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Pay off all debt → +45 points
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Reduce utilization to 10% → +25 points
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Miss one payment → -35 points
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Open new credit line → +8 points
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Projected Score</h4>
                  <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
                    <div className="text-4xl font-bold gradient-text mb-2">765</div>
                    <p className="text-sm text-muted-foreground">
                      With recommended actions in 3 months
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-clen-green/10 text-clen-green">
                      +45 points improvement
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditInsights;