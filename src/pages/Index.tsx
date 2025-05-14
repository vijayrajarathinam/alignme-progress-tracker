
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

const Index = () => {
  const navigate = useNavigate();
  const onboardingCompleted = localStorage.getItem("onboarding_completed") === "true";
  
  useEffect(() => {
    if (!onboardingCompleted) {
      navigate("/onboarding");
    }
  }, [navigate, onboardingCompleted]);
  
  return <HomePage />;
};

export default Index;
