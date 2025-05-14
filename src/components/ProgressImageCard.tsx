
import React from "react";
import { format } from "date-fns";
import { ProgressImage } from "@/types";
import { useAppContext } from "@/context/AppContext";

interface ProgressImageCardProps {
  image: ProgressImage;
}

const ProgressImageCard: React.FC<ProgressImageCardProps> = ({ image }) => {
  const { date, imageUrl, notes, alignerId } = image;
  const { aligners } = useAppContext();
  
  const aligner = aligners.find(a => a.id === alignerId);
  
  return (
    <div className="aligner-card">
      <img 
        src={imageUrl} 
        alt={`Progress on ${format(date, 'MMM d, yyyy')}`}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium">
          {format(date, 'MMMM d, yyyy')}
        </h3>
        {aligner && (
          <span className="text-xs bg-alignme-secondary text-white px-2 py-1 rounded-full">
            Aligner #{aligner.number}
          </span>
        )}
      </div>
      
      {notes && <p className="text-sm text-alignme-darkGray italic">{notes}</p>}
    </div>
  );
};

export default ProgressImageCard;
