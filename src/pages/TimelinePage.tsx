
import React, { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import { useAppContext } from "@/context/AppContext";
import AlignerCard from "@/components/AlignerCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimelinePage: React.FC = () => {
  const { aligners, updateAligner } = useAppContext();
  const [activeTab, setActiveTab] = useState("current");
  
  const currentAligners = aligners.filter(aligner => aligner.status === 'in-use');
  const upcomingAligners = aligners.filter(aligner => aligner.status === 'upcoming');
  const completedAligners = aligners.filter(aligner => aligner.status === 'completed' || aligner.status === 'skipped');
  
  return (
    <div className="pb-20">
      <HeaderBar title="Timeline" />
      
      <div className="p-4 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4">Your Aligner Timeline</h2>
        
        <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="mt-4 space-y-4">
            {currentAligners.length > 0 ? (
              currentAligners.map(aligner => (
                <AlignerCard 
                  key={aligner.id} 
                  aligner={aligner}
                  onUpdate={updateAligner}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-alignme-darkGray">No current aligners</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingAligners.length > 0 ? (
              upcomingAligners.map(aligner => (
                <AlignerCard 
                  key={aligner.id} 
                  aligner={aligner}
                  onUpdate={updateAligner}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-alignme-darkGray">No upcoming aligners</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4 space-y-4">
            {completedAligners.length > 0 ? (
              completedAligners.sort((a, b) => b.number - a.number).map(aligner => (
                <AlignerCard 
                  key={aligner.id} 
                  aligner={aligner}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-alignme-darkGray">No completed aligners</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimelinePage;
