
import React from "react";
import { format } from "date-fns";
import HeaderBar from "@/components/HeaderBar";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Bell, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useAppContext();
  const navigate = useNavigate();
  
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={18} />;
      case 'aligner':
        return <Clock size={18} />;
      default:
        return <Bell size={18} />;
    }
  };
  
  return (
    <div className="pb-20">
      <HeaderBar title="Notifications" />
      
      <div className="p-4 animate-fade-in">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0" 
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={18} className="mr-1" /> Back to Home
        </Button>
        
        <h2 className="text-lg font-semibold mb-4">Your Notifications</h2>
        
        {sortedNotifications.length > 0 ? (
          <div className="space-y-2">
            {sortedNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-4 border rounded-lg flex items-start transition-colors",
                  notification.read 
                    ? "bg-white" 
                    : "bg-alignme-primary/10 border-alignme-primary/30"
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className={cn(
                  "p-2 rounded-full mr-3",
                  notification.read ? "bg-muted" : "bg-alignme-primary/20"
                )}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <div className="font-medium">{notification.title}</div>
                  <p className="text-alignme-darkGray text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(notification.date), 'MMM d, h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-md bg-muted/30">
            <Bell size={32} className="text-muted-foreground mb-2 mx-auto" />
            <p className="text-alignme-darkGray">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
