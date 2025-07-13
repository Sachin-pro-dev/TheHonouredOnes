import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CreditAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 0,
      question: "What is your monthly income?",
      type: "select",
      options: ["Below ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"]
    },
    {
      id: 1,
      question: "What is your employment type?",
      type: "select",
      options: ["Salaried", "Self-employed", "Business Owner", "Freelancer", "Student"]
    },
    {
      id: 2,
      question: "How long have you been in your current role?",
      type: "select",
      options: ["Less than 6 months", "6 months - 1 year", "1-3 years", "3+ years"]
    },
    {
      id: 3,
      question: "Do you have any existing loans or credit cards?",
      type: "select",
      options: ["No existing credit", "1-2 credit accounts", "3-5 credit accounts", "5+ credit accounts"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate final score
      const finalScore = 650 + Math.floor(Math.random() * 100); // Simulate AI scoring
      setScore(finalScore);
      setIsComplete(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-black">{score}</span>
            </div>
            <h1 className="text-3xl font-bold">Credit Score Generated!</h1>
            <p className="text-muted-foreground">AI has analyzed your profile</p>
          </div>

          <Card className="glass-card">
            <CardContent className="p-6 text-center space-y-4">
              <Badge variant="secondary" className="bg-clen-green/10 text-clen-green text-lg px-4 py-2">
                Good Credit Score
              </Badge>
              <div className="space-y-2">
                <p className="text-sm">Based on your responses, you qualify for:</p>
                <div className="text-2xl font-bold">₹25,000</div>
                <p className="text-sm text-muted-foreground">Maximum credit limit</p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-gradient-primary" asChild>
            <Link to="/onboarding/vouchers">
              Select Your Voucher Tier
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold">AI Credit Assessment</h1>
          <p className="text-muted-foreground">
            Answer a few questions for personalized credit scoring
          </p>
          <Progress value={progress} className="w-full" />
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <TrendingUp className="w-5 h-5 text-clen-green" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg">{questions[currentQuestion].question}</Label>
              <Select onValueChange={handleAnswer} value={answers[currentQuestion] || ""}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {questions[currentQuestion].options.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-gradient-primary" 
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? "Generate Credit Score" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditAssessment;