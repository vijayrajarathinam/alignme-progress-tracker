
import React, { useState } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AvailableSlot = {
  time: string;
  formatted: string;
};

const BookAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAppointment } = useAppContext();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  
  // Mock available time slots
  const availableSlots: AvailableSlot[] = [
    { time: "09:00", formatted: "9:00 AM" },
    { time: "10:00", formatted: "10:00 AM" },
    { time: "11:00", formatted: "11:00 AM" },
    { time: "13:30", formatted: "1:30 PM" },
    { time: "14:30", formatted: "2:30 PM" },
    { time: "15:30", formatted: "3:30 PM" }
  ];
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    
    addAppointment({
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim() === "" ? undefined : notes
    });
    
    navigate('/appointments');
  };
  
  return (
    <div className="pb-20">
      <HeaderBar title="Book Appointment" />
      
      <div className="p-4 animate-fade-in">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0" 
          onClick={() => navigate('/appointments')}
        >
          <ChevronLeft size={18} className="mr-1" /> Back to Appointments
        </Button>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow-sm p-3 pointer-events-auto"
            disabled={(date) => {
              // Disable past dates, Sundays, and dates beyond 30 days
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              const thirtyDaysFromNow = addDays(today, 30);
              return date < today || 
                     date.getDay() === 0 || 
                     date > thirtyDaysFromNow;
            }}
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Time</h2>
          <div className="grid grid-cols-2 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                className={cn(
                  "p-3 rounded-md border text-center transition-all",
                  selectedTime === slot.time
                    ? "bg-alignme-primary text-white border-alignme-primary"
                    : "hover:border-alignme-primary"
                )}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.formatted}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Notes (Optional)</h2>
          <Textarea
            placeholder="Add any notes for your dentist"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24"
          />
        </div>
        
        <div className="mt-8">
          <Button 
            className="w-full"
            disabled={!selectedDate || !selectedTime}
            onClick={handleBookAppointment}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
