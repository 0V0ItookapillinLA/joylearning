import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AntdProvider from "@/components/AntdProvider";
import Home from "./pages/Home";
import VideoFeed from "./pages/VideoFeed";
import CourseCenter from "./pages/CourseCenter";
import PlanDetail from "./pages/PlanDetail";
import GrowthChart from "./pages/GrowthChart";
import ChatPage from "./pages/ChatPage";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import HistoryDetail from "./pages/HistoryDetail";
import PracticeOnboarding from "./pages/PracticeOnboarding";
import PracticeDetail from "./pages/PracticeDetail";
import PracticePage from "./pages/PracticePage";
import PracticeTextChat from "./pages/PracticeTextChat";
import PracticeComplete from "./pages/PracticeComplete";
import CheckInCalendar from "./pages/CheckInCalendar";
import ScenarioDetail from "./pages/ScenarioDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AntdProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoFeed />} />
          <Route path="/courses" element={<CourseCenter />} />
          <Route path="/plan/:id" element={<PlanDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
          <Route path="/practice/onboarding" element={<PracticeOnboarding />} />
          <Route path="/practice/detail" element={<PracticeDetail />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/text" element={<PracticeTextChat />} />
          <Route path="/practice/complete" element={<PracticeComplete />} />
          <Route path="/checkin" element={<CheckInCalendar />} />
          <Route path="/scenario/:id" element={<ScenarioDetail />} />
          <Route path="/growth" element={<GrowthChart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AntdProvider>
  </QueryClientProvider>
);

export default App;
