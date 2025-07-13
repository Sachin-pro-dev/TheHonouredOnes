import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Filter, Search, CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";

const CreditHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const transactions = [
    {
      id: "TXN001",
      date: "2024-03-10",
      type: "payment",
      description: "Loan Payment #1",
      amount: -2500,
      balance: 12500,
      status: "completed",
      paymentMethod: "UPI"
    },
    {
      id: "TXN002",
      date: "2024-03-08",
      type: "loan",
      description: "Personal Loan Disbursed",
      amount: 15000,
      balance: 15000,
      status: "completed",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "TXN003",
      date: "2024-03-05",
      type: "cashback",
      description: "Early Payment Bonus",
      amount: 50,
      balance: 0,
      status: "completed",
      paymentMethod: "Auto Credit"
    },
    {
      id: "TXN004",
      date: "2024-03-01",
      type: "payment",
      description: "Loan Payment #2",
      amount: -1250,
      balance: 3750,
      status: "completed",
      paymentMethod: "Crypto Wallet"
    },
    {
      id: "TXN005",
      date: "2024-02-28",
      type: "payment",
      description: "Loan Payment #2",
      amount: -1250,
      balance: 5000,
      status: "completed",
      paymentMethod: "UPI"
    },
    {
      id: "TXN006",
      date: "2024-02-25",
      type: "cashback",
      description: "Merchant Cashback - Flipkart",
      amount: 75,
      balance: 0,
      status: "completed",
      paymentMethod: "Auto Credit"
    },
    {
      id: "TXN007",
      date: "2024-02-20",
      type: "payment",
      description: "Loan Payment #1",
      amount: -2500,
      balance: 10000,
      status: "completed",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "TXN008",
      date: "2024-02-15",
      type: "loan",
      description: "Emergency Loan",
      amount: 5000,
      balance: 5000,
      status: "completed",
      paymentMethod: "Instant Transfer"
    }
  ];

  const summary = {
    totalLoans: transactions.filter(t => t.type === 'loan').length,
    totalPayments: transactions.filter(t => t.type === 'payment').length,
    totalCashback: transactions.filter(t => t.type === 'cashback').reduce((sum, t) => sum + t.amount, 0),
    averagePayment: Math.abs(transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0) / transactions.filter(t => t.type === 'payment').length)
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'loan': return <CreditCard className="w-4 h-4 text-clen-blue" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-destructive" />;
      case 'cashback': return <TrendingUp className="w-4 h-4 text-clen-green" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">Completed</Badge>;
      case 'pending': return <Badge variant="secondary" className="bg-clen-orange/10 text-clen-orange">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesDate = !selectedDate || transaction.date === format(selectedDate, 'yyyy-MM-dd');
    
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit History</h1>
          <p className="text-muted-foreground">Complete transaction history and records</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-clen-blue" />
              <span className="text-sm text-muted-foreground">Total Loans</span>
            </div>
            <div className="text-2xl font-bold mt-1">{summary.totalLoans}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Total Payments</span>
            </div>
            <div className="text-2xl font-bold mt-1">{summary.totalPayments}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-clen-green" />
              <span className="text-sm text-muted-foreground">Total Cashback</span>
            </div>
            <div className="text-2xl font-bold mt-1">₹{summary.totalCashback}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-clen-purple" />
              <span className="text-sm text-muted-foreground">Avg Payment</span>
            </div>
            <div className="text-2xl font-bold mt-1">₹{Math.round(summary.averagePayment).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-clen-blue" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="loan">Loans</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="cashback">Cashback</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start bg-input">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || filterType !== 'all' || selectedDate) && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                  Search: {searchTerm} ×
                </Badge>
              )}
              {filterType !== 'all' && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setFilterType("all")}>
                  Type: {filterType} ×
                </Badge>
              )}
              {selectedDate && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedDate(undefined)}>
                  Date: {format(selectedDate, "PP")} ×
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filteredTransactions.length} of {transactions.length} transactions
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.id}</span>
                      <span>•</span>
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.amount > 0 ? 'text-clen-green' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    {transaction.type === 'loan' || transaction.type === 'payment' ? (
                      <div className="text-sm text-muted-foreground">
                        Balance: ₹{transaction.balance.toLocaleString()}
                      </div>
                    ) : null}
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No transactions found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {filteredTransactions.length > 0 && (
            <div className="mt-6 flex items-center justify-center">
              <Button variant="outline">
                Load More Transactions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditHistory;