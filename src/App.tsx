import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreditHub from "./pages/CreditHub";
import CreditRequest from "./pages/CreditRequest";
import CreditRepay from "./pages/CreditRepay";
import CreditInsights from "./pages/CreditInsights";
import CreditHistory from "./pages/CreditHistory";
import LaxmiChat from "./pages/LaxmiChat";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import ConnectWallet from "./pages/auth/ConnectWallet";
import IdentityVerification from "./pages/onboarding/IdentityVerification";
import DIDSetup from "./pages/onboarding/DIDSetup";
import CreditAssessment from "./pages/onboarding/CreditAssessment";
import VoucherSelection from "./pages/onboarding/VoucherSelection";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          
          {/* Authentication */}
          <Route path="/auth/connect" element={<ConnectWallet />} />
          
          {/* Onboarding */}
          <Route path="/onboarding/identity" element={<IdentityVerification />} />
          <Route path="/onboarding/did" element={<DIDSetup />} />
          <Route path="/onboarding/assessment" element={<CreditAssessment />} />
          <Route path="/onboarding/vouchers" element={<VoucherSelection />} />
          
          {/* Dashboard and Protected Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/credit" element={<Layout><CreditHub /></Layout>} />
          <Route path="/credit/request" element={<Layout><CreditRequest /></Layout>} />
          <Route path="/credit/repay" element={<Layout><CreditRepay /></Layout>} />
          <Route path="/credit/insights" element={<Layout><CreditInsights /></Layout>} />
          <Route path="/credit/history" element={<Layout><CreditHistory /></Layout>} />
          <Route path="/laxmi" element={<Layout><LaxmiChat /></Layout>} />
          <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
