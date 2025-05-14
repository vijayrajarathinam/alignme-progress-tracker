
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import NavigationBar from "@/components/NavigationBar";
import HomePage from "@/pages/HomePage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import BookAppointmentPage from "@/pages/BookAppointmentPage";
import TimelinePage from "@/pages/TimelinePage";
import ProgressPage from "@/pages/ProgressPage";
import SettingsPage from "@/pages/SettingsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import OnboardingPage from "@/pages/OnboardingPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check if user has completed onboarding
  const onboardingCompleted = localStorage.getItem("onboarding_completed") === "true";
  
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="max-w-lg mx-auto bg-white min-h-screen relative">
              <Routes>
                <Route path="/" element={onboardingCompleted ? <HomePage /> : <OnboardingPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/appointments/book" element={<BookAppointmentPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {onboardingCompleted && <NavigationBar />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
