
import React from "react";
import { format } from "date-fns";
import { Aligner } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlignerCardProps {
  aligner: Aligner;
  onUpdate?: (id: string, updates: Partial<Aligner>) => void;
}

const AlignerCard: React.FC<AlignerCardProps> = ({ aligner, onUpdate }) => {
  const { id, number, startDate, endDate, status, notes } = aligner;
  
  const statusColors = {
    'upcoming': 'bg-gray-100 text-gray-600',
    'in-use': 'bg-alignme-primary text-white',
    'completed': 'bg-green-100 text-green-700',
    'skipped': 'bg-red-100 text-red-700'
  };
  
  const statusIcons = {
    'upcoming': <Clock size={16} />,
    'in-use': <Clock size={16} />,
    'completed': <Check size={16} />,
    'skipped': <X size={16} />
  };
  
  const handleStatusChange = (newStatus: Aligner['status']) => {
    if (onUpdate) {
      onUpdate(id, { status: newStatus });
    }
  };
  
  return (
    <div className={cn(
      "aligner-card flex flex-col",
      status === 'in-use' ? "border-l-4 border-l-alignme-primary" : ""
    )}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Aligner #{number}</h3>
        <Badge className={statusColors[status]}>
          <span className="flex items-center gap-1">
            {statusIcons[status]} {status === 'in-use' ? 'Current' : status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </Badge>
      </div>
      
      <div className="text-sm text-alignme-darkGray mb-2">
        <div>Start: {format(startDate, 'MMM d, yyyy')}</div>
        <div>End: {format(endDate, 'MMM d, yyyy')}</div>
      </div>
      
      {notes && <p className="text-sm italic mt-1">{notes}</p>}
      
      {onUpdate && status !== 'completed' && status !== 'skipped' && (
        <div className="flex gap-2 mt-3">
          <button 
            className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors flex items-center gap-1"
            onClick={() => handleStatusChange('completed')}
          >
            <Check size={14} /> Mark Complete
          </button>
          <button 
            className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors flex items-center gap-1"
            onClick={() => handleStatusChange('skipped')}
          >
            <X size={14} /> Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default AlignerCard;
