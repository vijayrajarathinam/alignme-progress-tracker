
import React, { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCard from "@/components/AppointmentCard";

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointments } = useAppContext();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const today = new Date();
  
  const upcomingAppointments = appointments
    .filter(appointment => new Date(appointment.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastAppointments = appointments
    .filter(appointment => new Date(appointment.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="pb-20">
      <HeaderBar title="Appointments" />
      
      <div className="p-4 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gradient">Your Appointments</h2>
          <Button onClick={() => navigate('/appointments/book')} className="rounded-full shadow-sm">
            <Plus size={16} className="mr-1" /> Book
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 rounded-xl mb-4">
            <TabsTrigger value="upcoming" className="rounded-lg">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8 bg-muted rounded-xl">
                <p className="text-alignme-darkGray mb-4">No upcoming appointments</p>
                <Button onClick={() => navigate('/appointments/book')} className="rounded-full shadow-sm">
                  <Plus size={16} className="mr-1" /> Book Appointment
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-4 space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-8 bg-muted rounded-xl">
                <p className="text-alignme-darkGray">No past appointments</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentsPage;
