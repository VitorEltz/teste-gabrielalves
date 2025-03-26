
import { useEffect, useState } from 'react';
import { Excuse, getSavedExcuses } from '@/utils/excuseGenerator';
import ExcuseCard from './ExcuseCard';
import { BookmarkIcon } from 'lucide-react';

const SavedExcuses = () => {
  const [savedExcuses, setSavedExcuses] = useState<Excuse[]>([]);

  useEffect(() => {
    loadSavedExcuses();
  }, []);

  const loadSavedExcuses = () => {
    const excuses = getSavedExcuses();
    setSavedExcuses(excuses);
  };

  const handleExcuseDeleted = () => {
    loadSavedExcuses();
  };

  if (savedExcuses.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-xl glass-dark animate-fade-in text-center flex flex-col items-center">
        <BookmarkIcon size={32} className="text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-medium text-foreground/80 mb-2">No saved excuses</h3>
        <p className="text-muted-foreground">
          Your saved excuses will appear here. Generate and save some excuses to keep them for later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <h2 className="text-xl font-medium text-foreground/80 mb-4">Your Excuse Collection</h2>
      <div className="grid gap-4">
        {savedExcuses.map((excuse) => (
          <ExcuseCard
            key={excuse.id}
            excuse={excuse}
            variant="saved"
            onDeleted={handleExcuseDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedExcuses;
