
import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAppContext } from "@/context/AppContext";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Camera, Plus } from "lucide-react";
import AlignerCard from "@/components/AlignerCard";
import AppointmentCard from "@/components/AppointmentCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, getNextAppointment, getCurrentAligner } = useAppContext();
  
  const currentAligner = getCurrentAligner();
  const nextAppointment = getNextAppointment();
  
  return (
    <div className="pb-20"> {/* Padding bottom for navigation bar */}
      <HeaderBar title="AlignMe" />
      
      <div className="p-4 animate-fade-in">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Welcome back, {profile.name.split(' ')[0]}!</CardTitle>
            <CardDescription>
              Here's your treatment progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-alignme-darkGray mb-2">
                <span>Treatment Progress</span>
                {currentAligner && (
                  <span className="font-semibold">
                    {currentAligner.number}/{profile.totalAligners} aligners
                  </span>
                )}
              </div>
              
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                {currentAligner && (
                  <div 
                    className="h-full bg-gradient-to-r from-alignme-primary to-alignme-secondary transition-all"
                    style={{ width: `${(currentAligner.number / profile.totalAligners) * 100}%` }}
                  ></div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {currentAligner && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Current Aligner</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/timeline')}
              >
                View All
              </Button>
            </div>
            <AlignerCard aligner={currentAligner} />
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Next Appointment</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/appointments')}
            >
              View All
            </Button>
          </div>
          
          {nextAppointment ? (
            <AppointmentCard appointment={nextAppointment} />
          ) : (
            <div className="aligner-card flex flex-col items-center justify-center py-6">
              <p className="text-alignme-darkGray mb-2">No upcoming appointments</p>
              <Button onClick={() => navigate('/appointments/book')}>
                <Plus size={16} className="mr-1" /> Book Appointment
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="col-span-1 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/appointments')}>
            <CardContent className="p-6 flex flex-col items-center">
              <Calendar size={32} className="text-alignme-primary mb-2" />
              <span className="font-medium">Appointments</span>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/timeline')}>
            <CardContent className="p-6 flex flex-col items-center">
              <Clock size={32} className="text-alignme-secondary mb-2" />
              <span className="font-medium">Timeline</span>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/progress')}>
            <CardContent className="p-6 flex flex-col items-center">
              <Camera size={32} className="text-alignme-primary mb-2" />
              <span className="font-medium">Track Progress</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
