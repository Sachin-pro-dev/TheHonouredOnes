import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Zap, CreditCard, DollarSign, TrendingUp, Mic, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

const LaxmiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "नमस्ते! I'm Laxmi, your AI credit assistant. I can help you with loans, payments, credit scores, and on-chain transactions. What would you like to do today?",
      timestamp: new Date(),
      actions: [
        { label: "Check Credit Score", action: "check_score" },
        { label: "Apply for Loan", action: "apply_loan" },
        { label: "Make Payment", action: "make_payment" },
        { label: "View Balance", action: "view_balance" }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickActions = [
    { icon: TrendingUp, label: "Credit Score", description: "What's my current score?" },
    { icon: CreditCard, label: "Apply Loan", description: "I need ₹10,000 loan" },
    { icon: DollarSign, label: "Make Payment", description: "Pay my loan EMI" },
    { icon: Zap, label: "Account Balance", description: "Show my wallet balance" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes('credit score') || input.includes('score')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Your current credit score is 720 (Good). You've improved by +12 points this month! Your payment history is excellent at 100%. To improve further, consider reducing your credit utilization from 65% to below 30%.",
        timestamp: new Date(),
        actions: [
          { label: "View Detailed Report", action: "view_report" },
          { label: "Improvement Tips", action: "improvement_tips" }
        ]
      };
    }

    if (input.includes('loan') || input.includes('borrow')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I can help you apply for a loan! Based on your credit profile, you're eligible for up to ₹25,000 at 8.5% interest rate. The application takes just 2 minutes and approval is instant. What amount would you like to apply for?",
        timestamp: new Date(),
        actions: [
          { label: "Apply ₹10,000", action: "apply_10k" },
          { label: "Apply ₹15,000", action: "apply_15k" },
          { label: "Custom Amount", action: "custom_loan" }
        ]
      };
    }

    if (input.includes('payment') || input.includes('pay') || input.includes('emi')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "You have 2 active loans. Next payment due: ₹2,500 in 5 days for Loan #1. I can process the payment now using your connected wallet (USDT/USDC) or UPI. You'll earn 2% cashback on all payments!",
        timestamp: new Date(),
        actions: [
          { label: "Pay ₹2,500 Now", action: "pay_minimum" },
          { label: "Pay Different Amount", action: "custom_payment" },
          { label: "Set Auto-Pay", action: "auto_pay" }
        ]
      };
    }

    if (input.includes('balance') || input.includes('wallet')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Your wallet balances:\n• USDT: 1,245.50\n• USDC: 892.30\n• ETH: 0.245\n\nAvailable credit: ₹8,750 (₹25,000 limit)\nCurrent utilization: 65%",
        timestamp: new Date(),
        actions: [
          { label: "Transfer Funds", action: "transfer" },
          { label: "Add Funds", action: "add_funds" }
        ]
      };
    }

    if (input.includes('help') || input.includes('what can you do')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I can help you with:\n\n🏦 Credit Management\n• Check credit score & history\n• Apply for instant loans\n• Get improvement recommendations\n\n💰 Payments & Transactions\n• Make loan payments\n• Transfer funds\n• Check balances\n\n📊 Analytics\n• View spending patterns\n• Credit utilization insights\n• Payment history\n\n🔗 On-Chain Functions\n• Smart contract interactions\n• DeFi protocol integration\n• Crypto payments\n\nJust ask me anything in English or Hindi!",
        timestamp: new Date()
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: "I understand you're asking about credit-related services. I can help you with credit scores, loan applications, payments, and blockchain transactions. Could you please be more specific about what you'd like to do? You can also use the quick action buttons below for common tasks.",
      timestamp: new Date(),
      actions: [
        { label: "Credit Score", action: "check_score" },
        { label: "Apply Loan", action: "apply_loan" },
        { label: "Make Payment", action: "make_payment" },
        { label: "Help", action: "help" }
      ]
    };
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case 'check_score':
        message = "What's my current credit score?";
        break;
      case 'apply_loan':
        message = "I want to apply for a loan";
        break;
      case 'make_payment':
        message = "Help me make a payment";
        break;
      case 'view_balance':
        message = "Show my account balance";
        break;
      case 'help':
        message = "What can you help me with?";
        break;
      default:
        toast({
          title: "Action Executed",
          description: `Executing: ${action}`,
        });
        return;
    }
    setInputMessage(message);
  };

  const handleActionClick = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `Processing: ${action}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Laxmi AI Assistant</h1>
        <p className="text-muted-foreground">Your intelligent credit and blockchain assistant</p>
        <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
          🟢 Online • Responds in seconds
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="glass-card h-[600px] flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-clen-purple" />
                <span>Laxmi Chat</span>
                <Badge variant="outline" className="ml-auto">AI Powered</Badge>
              </CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-primary text-black'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary border border-border'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      
                      {message.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleActionClick(action.action)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <div className="p-3 rounded-lg bg-secondary border border-border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Ask about loans, payments, credit score... (English/Hindi)"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-input"
                />
                <Button variant="ghost" size="sm">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-clen-blue" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleQuickAction(action.label.toLowerCase().replace(' ', '_'))}
                >
                  <action.icon className="w-4 h-4 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-green rounded-full"></div>
                <span>Natural language understanding</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-blue rounded-full"></div>
                <span>On-chain transaction execution</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-purple rounded-full"></div>
                <span>Multi-language support (Hindi/English)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-orange rounded-full"></div>
                <span>Contextual conversation memory</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-clen-green rounded-full"></div>
                <span>Smart contract interactions</span>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Assistant Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Response Time</span>
                <Badge variant="secondary" className="bg-clen-green/10 text-clen-green">
                  &lt; 2s
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Accuracy</span>
                <Badge variant="secondary" className="bg-clen-blue/10 text-clen-blue">
                  98.5%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Uptime</span>
                <Badge variant="secondary" className="bg-clen-purple/10 text-clen-purple">
                  99.9%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaxmiChat;