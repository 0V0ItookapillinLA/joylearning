import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseCenter from "./pages/CourseCenter";
import PlanDetail from "./pages/PlanDetail";
import ChatPage from "./pages/ChatPage";
import Profile from "./pages/Profile";
import HistoryDetail from "./pages/HistoryDetail";
import PracticeOnboarding from "./pages/PracticeOnboarding";
import PracticePage from "./pages/PracticePage";
import PracticeComplete from "./pages/PracticeComplete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseCenter />} />
          <Route path="/plan/:id" element={<PlanDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
          <Route path="/practice/onboarding" element={<PracticeOnboarding />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/complete" element={<PracticeComplete />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
