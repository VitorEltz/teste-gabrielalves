
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateMultipleExcuses } from "@/utils/excuseGenerator";
import { Sparkles } from 'lucide-react';

interface ExcuseFormProps {
  onExcusesGenerated: (excuses: any[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const ExcuseForm: React.FC<ExcuseFormProps> = ({ 
  onExcusesGenerated, 
  isLoading,
  setIsLoading
}) => {
  const [situation, setSituation] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!situation.trim() || !reason.trim()) {
      setError('Please fill in both fields');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const generatedExcuses = generateMultipleExcuses(situation, reason);
        onExcusesGenerated(generatedExcuses);
      } catch (error) {
        console.error('Error generating excuses:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 800); // Simulate a slight delay for better UX
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 animate-fade-in">
      <div className="space-y-3">
        <Label htmlFor="situation" className="text-base font-medium">
          What's the situation?
        </Label>
        <Input 
          id="situation"
          className="input-glass h-12 text-base placeholder:text-muted-foreground/70"
          placeholder="Meeting, deadline, social event..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="reason" className="text-base font-medium">
          What's your actual reason?
        </Label>
        <Textarea
          id="reason"
          className="input-glass min-h-24 text-base placeholder:text-muted-foreground/70 resize-none"
          placeholder="Overslept, forgot, didn't want to..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      {error && (
        <div className="text-destructive text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-350 bezier-smooth shadow-soft hover:shadow-medium"
        disabled={isLoading}
      >
        <Sparkles size={18} className={`${isLoading ? "animate-pulse" : "animate-float"}`} />
        <span>{isLoading ? "Crafting your excuses..." : "Generate Excuses"}</span>
      </Button>
    </form>
  );
};

export default ExcuseForm;
