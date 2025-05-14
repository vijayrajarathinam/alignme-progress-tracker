
export type Appointment = {
  id: string;
  date: Date;
  time: string;
  notes?: string;
};

export type AlignerStatus = 'upcoming' | 'in-use' | 'completed' | 'skipped';

export type Aligner = {
  id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  status: AlignerStatus;
  notes?: string;
};

export type ProgressImage = {
  id: string;
  date: Date;
  alignerId: string;
  imageUrl: string;
  notes?: string;
};

export type UserProfile = {
  name: string;
  email: string;
  treatmentStartDate: Date;
  totalAligners: number;
  switchFrequency: number; // days
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'appointment' | 'aligner' | 'progress';
};

export type AppSettings = {
  dailyReminders: boolean;
  switchReminders: boolean;
  appointmentReminders: boolean;
  progressReminders: boolean;
};
