
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Appointment, 
  Aligner, 
  ProgressImage, 
  UserProfile, 
  Notification,
  AppSettings
} from "@/types";
import { addDays, format } from "date-fns";
import { toast } from "sonner";

interface AppContextType {
  // User profile
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  // Aligners
  aligners: Aligner[];
  addAligner: (aligner: Omit<Aligner, "id">) => void;
  updateAligner: (id: string, aligner: Partial<Aligner>) => void;
  
  // Progress images
  progressImages: ProgressImage[];
  addProgressImage: (image: Omit<ProgressImage, "id">) => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Utils
  getCurrentAligner: () => Aligner | undefined;
  getNextAppointment: () => Appointment | undefined;
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  email: "john@example.com",
  treatmentStartDate: new Date(),
  totalAligners: 20,
  switchFrequency: 14
};

const defaultSettings: AppSettings = {
  dailyReminders: true,
  switchReminders: true,
  appointmentReminders: true,
  progressReminders: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [aligners, setAligners] = useState<Aligner[]>([]);
  const [progressImages, setProgressImages] = useState<ProgressImage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Initialize data
  useEffect(() => {
    // Generate initial aligners based on profile
    if (aligners.length === 0 && profile) {
      const newAligners: Aligner[] = [];
      const { treatmentStartDate, totalAligners, switchFrequency } = profile;

      for (let i = 1; i <= totalAligners; i++) {
        const startDate = addDays(treatmentStartDate, (i - 1) * switchFrequency);
        const endDate = addDays(startDate, switchFrequency - 1);
        
        // Determine status based on dates
        const today = new Date();
        let status: AlignerStatus = 'upcoming';
        
        if (today >= startDate && today <= endDate) {
          status = 'in-use';
        } else if (today > endDate) {
          status = 'completed';
        }
        
        newAligners.push({
          id: `aligner-${i}`,
          number: i,
          startDate,
          endDate,
          status
        });
      }
      
      setAligners(newAligners);
    }
    
    // Add some example appointments
    if (appointments.length === 0) {
      const tomorrow = addDays(new Date(), 1);
      tomorrow.setHours(14, 0, 0, 0); // 2 PM
      
      const nextWeek = addDays(new Date(), 7);
      nextWeek.setHours(10, 30, 0, 0); // 10:30 AM
      
      setAppointments([
        {
          id: "appt-1",
          date: tomorrow,
          time: "14:00",
          notes: "Regular checkup"
        },
        {
          id: "appt-2",
          date: nextWeek,
          time: "10:30",
          notes: "New aligner pickup"
        }
      ]);
    }

    // Generate some example notifications
    if (notifications.length === 0) {
      setNotifications([
        {
          id: "notif-1",
          title: "Aligner Switch",
          message: "Time to switch to aligner #2",
          date: addDays(new Date(), -1),
          read: true,
          type: 'aligner'
        },
        {
          id: "notif-2",
          title: "Upcoming Appointment",
          message: `You have an appointment tomorrow at ${format(tomorrow, 'h:mm a')}`,
          date: new Date(),
          read: false,
          type: 'appointment'
        }
      ]);
    }
  }, []);

  // Profile management
  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
    toast.success("Profile updated successfully");
  };

  // Appointment management
  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: `appt-${Date.now()}`
    };
    setAppointments(prev => [...prev, newAppointment]);
    toast.success("Appointment booked successfully");
  };

  const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(appt => 
        appt.id === id ? { ...appt, ...updatedAppointment } : appt
      )
    );
    toast.success("Appointment updated successfully");
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appt => appt.id !== id));
    toast.success("Appointment cancelled successfully");
  };

  // Aligner management
  const addAligner = (aligner: Omit<Aligner, "id">) => {
    const newAligner = {
      ...aligner,
      id: `aligner-${aligner.number}`
    };
    setAligners(prev => [...prev, newAligner]);
  };

  const updateAligner = (id: string, updatedAligner: Partial<Aligner>) => {
    setAligners(prev => 
      prev.map(aligner => 
        aligner.id === id ? { ...aligner, ...updatedAligner } : aligner
      )
    );
    
    if (updatedAligner.status === 'completed') {
      toast.success(`Aligner ${aligners.find(a => a.id === id)?.number} marked as completed!`);
    }
  };

  // Progress image management
  const addProgressImage = (image: Omit<ProgressImage, "id">) => {
    const newImage = {
      ...image,
      id: `img-${Date.now()}`
    };
    setProgressImages(prev => [...prev, newImage]);
    toast.success("Progress image added successfully");
  };

  // Notification management
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Settings management
  const updateSettings = (updatedSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
    toast.success("Settings updated successfully");
  };

  // Utility functions
  const getCurrentAligner = (): Aligner | undefined => {
    return aligners.find(aligner => aligner.status === 'in-use');
  };

  const getNextAppointment = (): Appointment | undefined => {
    const today = new Date();
    return appointments
      .filter(appt => new Date(appt.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  return (
    <AppContext.Provider value={{
      profile,
      updateProfile,
      appointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      aligners,
      addAligner,
      updateAligner,
      progressImages,
      addProgressImage,
      notifications,
      markNotificationAsRead,
      settings,
      updateSettings,
      getCurrentAligner,
      getNextAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
