
import React from "react";
import { format } from "date-fns";
import { Appointment } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppContext } from "@/context/AppContext";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const { id, date, time, notes } = appointment;
  const { deleteAppointment } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const formattedDate = format(new Date(date), "EEEE, MMMM d, yyyy");
  const formattedTime = time;
  
  return (
    <div className="material-elevation-2 rounded-xl p-4 transition-all hover:material-elevation-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Appointment</h3>
        <span className="text-xs bg-alignme-accent px-2 py-1 rounded-full text-alignme-darkGray">#{id.split('-')[1]}</span>
      </div>
      
      <div className="flex items-center text-alignme-darkGray mb-3 bg-muted/50 p-3 rounded-lg">
        <Calendar size={18} className="mr-2 text-alignme-primary" />
        <div>
          <div className="font-medium">{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      </div>
      
      {notes && <p className="text-sm text-alignme-darkGray mb-3 italic bg-muted/30 p-2 rounded-lg">{notes}</p>}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm" className="w-full mt-2 rounded-full shadow-sm">
            Cancel Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-full">
              Keep Appointment
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                deleteAppointment(id);
                setIsDialogOpen(false);
              }}
              className="rounded-full"
            >
              Cancel Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCard;
