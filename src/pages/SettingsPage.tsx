
import React, { useState } from "react";
import { format } from "date-fns";
import HeaderBar from "@/components/HeaderBar";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { profile, updateProfile, settings, updateSettings } = useAppContext();
  
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [treatmentStartDate, setTreatmentStartDate] = useState<Date>(profile.treatmentStartDate);
  const [totalAligners, setTotalAligners] = useState(profile.totalAligners.toString());
  const [switchFrequency, setSwitchFrequency] = useState(profile.switchFrequency.toString());
  
  const handleSave = () => {
    updateProfile({
      name,
      email,
      treatmentStartDate,
      totalAligners: parseInt(totalAligners),
      switchFrequency: parseInt(switchFrequency)
    });
  };
  
  return (
    <div className="pb-20">
      <HeaderBar title="Settings" />
      
      <div className="p-4 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="treatmentStartDate">Treatment Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="treatmentStartDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !treatmentStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {treatmentStartDate ? (
                      format(treatmentStartDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={treatmentStartDate}
                    onSelect={(date) => date && setTreatmentStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalAligners">Total Number of Aligners</Label>
              <Input 
                id="totalAligners"
                type="number" 
                min="1"
                value={totalAligners} 
                onChange={(e) => setTotalAligners(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="switchFrequency">Aligner Switch Frequency (days)</Label>
              <Select 
                value={switchFrequency} 
                onValueChange={setSwitchFrequency}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="10">10 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="mt-4 w-full" onClick={handleSave}>
            Save Profile
          </Button>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dailyReminder">Daily Wear Reminder</Label>
                <p className="text-xs text-alignme-darkGray">
                  Get daily reminders to wear your aligners
                </p>
              </div>
              <Switch 
                id="dailyReminder"
                checked={settings.dailyReminders} 
                onCheckedChange={(checked) => updateSettings({ dailyReminders: checked })} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="switchReminder">Aligner Switch Reminder</Label>
                <p className="text-xs text-alignme-darkGray">
                  Receive notifications when it's time to switch aligners
                </p>
              </div>
              <Switch 
                id="switchReminder"
                checked={settings.switchReminders} 
                onCheckedChange={(checked) => updateSettings({ switchReminders: checked })} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentReminder">Appointment Reminders</Label>
                <p className="text-xs text-alignme-darkGray">
                  Get notifications about upcoming appointments
                </p>
              </div>
              <Switch 
                id="appointmentReminder"
                checked={settings.appointmentReminders} 
                onCheckedChange={(checked) => updateSettings({ appointmentReminders: checked })} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="progressReminder">Progress Photo Reminders</Label>
                <p className="text-xs text-alignme-darkGray">
                  Get weekly reminders to take progress photos
                </p>
              </div>
              <Switch 
                id="progressReminder"
                checked={settings.progressReminders} 
                onCheckedChange={(checked) => updateSettings({ progressReminders: checked })} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
