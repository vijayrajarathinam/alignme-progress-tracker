
import React, { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import { useAppContext } from "@/context/AppContext";
import { Camera, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProgressImageCard from "@/components/ProgressImageCard";

const ProgressPage: React.FC = () => {
  const { progressImages, aligners, getCurrentAligner, addProgressImage } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAlignerId, setSelectedAlignerId] = useState<string>("");
  const [notes, setNotes] = useState("");
  
  // Mock image URLs
  const mockImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  ];
  
  const currentAligner = getCurrentAligner();
  
  const handleAddProgress = () => {
    if (!selectedAlignerId) return;
    
    // In a real app, we'd upload the image here
    // For now, use a mock image
    const randomImageUrl = mockImages[Math.floor(Math.random() * mockImages.length)];
    
    addProgressImage({
      date: new Date(),
      alignerId: selectedAlignerId,
      imageUrl: randomImageUrl,
      notes: notes.trim() === "" ? undefined : notes,
    });
    
    setIsDialogOpen(false);
    setSelectedAlignerId("");
    setNotes("");
  };
  
  return (
    <div className="pb-20">
      <HeaderBar title="Progress Tracking" />
      
      <div className="p-4 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-1" /> Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Progress Photo</DialogTitle>
                <DialogDescription>
                  Upload a new photo to track your treatment progress
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="flex justify-center py-8 border-2 border-dashed rounded-md bg-muted/30">
                  <div className="flex flex-col items-center">
                    <Camera size={48} className="text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Take a photo or upload from gallery</p>
                    <Button variant="outline" className="mt-2">
                      <Upload size={16} className="mr-1" /> Upload
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aligner">Aligner</Label>
                  <Select value={selectedAlignerId} onValueChange={setSelectedAlignerId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select aligner" />
                    </SelectTrigger>
                    <SelectContent>
                      {aligners.map((aligner) => (
                        <SelectItem 
                          key={aligner.id} 
                          value={aligner.id}
                        >
                          Aligner #{aligner.number} - {aligner.status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about your progress"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddProgress} 
                    disabled={!selectedAlignerId}
                  >
                    Add Photo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {progressImages.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {[...progressImages].reverse().map((image) => (
              <ProgressImageCard key={image.id} image={image} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-md bg-muted/30">
            <div className="flex flex-col items-center">
              <Camera size={48} className="text-muted-foreground mb-2" />
              <p className="text-alignme-darkGray mb-4">No progress photos yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus size={16} className="mr-1" /> Add First Photo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
