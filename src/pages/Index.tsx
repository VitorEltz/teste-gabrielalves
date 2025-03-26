
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Sparkles, BookmarkIcon } from 'lucide-react';
import ExcuseForm from '@/components/ExcuseForm';
import ExcuseCard from '@/components/ExcuseCard';
import SavedExcuses from '@/components/SavedExcuses';
import { Excuse, getSavedExcuses } from '@/utils/excuseGenerator';

const Index = () => {
  const [generatedExcuses, setGeneratedExcuses] = useState<Excuse[]>([]);
  const [savedExcuseIds, setSavedExcuseIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>("generate");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Load saved excuse IDs for checking which excuses are already saved
  useEffect(() => {
    const savedExcuses = getSavedExcuses();
    const ids = new Set(savedExcuses.map(excuse => excuse.id));
    setSavedExcuseIds(ids);
  }, [activeTab]);

  const handleExcusesGenerated = (excuses: Excuse[]) => {
    setGeneratedExcuses(excuses);
    setShowIntro(false);
    
    // Show a success toast
    toast.success('Your creative excuses are ready!', {
      description: 'Choose your favorite or generate more.'
    });
    
    // Update saved IDs to reflect current state
    const savedExcuses = getSavedExcuses();
    const ids = new Set(savedExcuses.map(excuse => excuse.id));
    setSavedExcuseIds(ids);
  };

  const handleExcuseSaved = () => {
    // Update saved IDs to reflect current state
    const savedExcuses = getSavedExcuses();
    const ids = new Set(savedExcuses.map(excuse => excuse.id));
    setSavedExcuseIds(ids);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <header className="w-full px-6 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center text-center animate-slide-down">
        <div className="inline-block mb-4 py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium">
          <span className="flex items-center">
            <Sparkles size={14} className="mr-1.5 animate-pulse-soft" />
            The Inventive Apology Engine
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 text-balance">
          Craft the Perfect Excuse
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground text-balance">
          Transform mundane reasons into brilliantly crafted excuses. Elegant, original, and surprisingly convincing.
        </p>
      </header>
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-8">
        <Tabs 
          defaultValue="generate" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="generate" className="text-base">
              Generate
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-base">
              Saved
              <BookmarkIcon size={16} className="ml-1.5" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="mt-0 space-y-8 animate-fade-in">
            <div className="flex flex-col items-center">
              <ExcuseForm 
                onExcusesGenerated={handleExcusesGenerated} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              
              {showIntro && !isLoading && generatedExcuses.length === 0 && (
                <div className="mt-16 w-full max-w-xl mx-auto p-8 rounded-xl glass animate-fade-in text-center">
                  <h3 className="text-xl font-medium text-foreground/80 mb-2">How it works</h3>
                  <p className="text-muted-foreground mb-6">
                    Just tell us your situation and actual reason, and we'll transform it into a brilliantly crafted excuse.
                  </p>
                  <ul className="text-left space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent mr-3 font-medium">1</span>
                      <span>Enter the situation you need an excuse for</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent mr-3 font-medium">2</span>
                      <span>Tell us your actual reason (we won't judge)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent mr-3 font-medium">3</span>
                      <span>Get multiple creative excuses to choose from</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent mr-3 font-medium">4</span>
                      <span>Save your favorites for future use</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {!isLoading && generatedExcuses.length > 0 && (
                <div className="w-full mt-12 space-y-6 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-foreground/80">Your Excuses</h2>
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setTimeout(() => setShowIntro(true), 300);
                      }}
                    >
                      Generate More
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {generatedExcuses.map((excuse) => (
                      <ExcuseCard 
                        key={excuse.id} 
                        excuse={excuse} 
                        isSaved={savedExcuseIds.has(excuse.id)}
                        onSaved={handleExcuseSaved}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0 animate-fade-in">
            <SavedExcuses />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="w-full px-6 py-8 mt-12">
        <Separator className="mb-6" />
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} The Inventive Apology Engine</p>
          <p className="mt-2 md:mt-0">For entertainment purposes only. Use at your own risk.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
