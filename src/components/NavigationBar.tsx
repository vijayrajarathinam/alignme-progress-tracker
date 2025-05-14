
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Clock, Camera, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Clock, label: "Timeline", path: "/timeline" },
    { icon: Camera, label: "Progress", path: "/progress" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-alignme-lightGray p-2 flex justify-around z-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center p-2 text-xs"
          >
            <div className={cn(
              "p-2 rounded-full mb-1 transition-colors",
              isActive 
                ? "bg-alignme-primary text-white" 
                : "text-alignme-darkGray hover:bg-alignme-lightGray"
            )}>
              <item.icon size={20} />
            </div>
            <span className={isActive ? "text-alignme-primary font-medium" : "text-alignme-darkGray"}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
