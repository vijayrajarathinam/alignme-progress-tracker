
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { ArrowRight, SkipForward } from "lucide-react";

type OnboardingStep = {
  title: string;
  description: string;
  image: string;
};

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Track Your Progress",
    description: "Easily track your aligner journey with our intuitive timeline view",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=350"
  },
  {
    title: "Schedule Appointments",
    description: "Book and manage your dental appointments with just a few taps",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=500&h=350"
  },
  {
    title: "Visualize Results",
    description: "Take selfies to document your progress throughout your treatment",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500&h=350"
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleComplete = () => {
    // In a real app, you might set a flag in localStorage to not show onboarding again
    localStorage.setItem("onboarding_completed", "true");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex justify-end p-4">
        <Button 
          variant="ghost" 
          className="text-alignme-darkGray flex items-center gap-1" 
          onClick={handleComplete}
        >
          Skip <SkipForward size={16} />
        </Button>
      </div>
      
      <Carousel className="w-full flex-1 flex flex-col" 
        value={{ activeSlideIndex: currentStep }} 
        onValueChange={(value) => setCurrentStep(value.activeSlideIndex)}
      >
        <CarouselContent className="flex-1 h-full">
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="flex flex-col h-full justify-between p-6">
                <div className="mb-6 flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm mb-8">
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-center mb-2 text-gradient">{step.title}</h2>
                  <p className="text-center text-alignme-darkGray">{step.description}</p>
                </div>
                
                <div className="flex flex-col items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    {onboardingSteps.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-2 rounded-full transition-all ${
                          idx === currentStep 
                            ? "w-8 bg-alignme-primary" 
                            : "w-2 bg-alignme-lightGray"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full max-w-xs"
                    onClick={handleNext}
                  >
                    {currentStep < onboardingSteps.length - 1 ? (
                      <>Next <ArrowRight size={16} /></>
                    ) : (
                      "Get Started"
                    )}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Onboarding;
