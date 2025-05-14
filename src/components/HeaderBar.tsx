
import React from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

interface HeaderBarProps {
  title: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  const { notifications } = useAppContext();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gradient">{title}</h1>
      </div>
      <button 
        className="p-2 relative" 
        onClick={() => navigate("/notifications")}
        aria-label="Notifications"
      >
        <Bell size={24} className="text-alignme-darkGray" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-alignme-primary">
            {unreadCount}
          </Badge>
        )}
      </button>
    </div>
  );
};

export default HeaderBar;
