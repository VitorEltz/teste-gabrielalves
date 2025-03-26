
import { useState } from 'react';
import { Excuse, saveExcuse, deleteExcuse } from '@/utils/excuseGenerator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookmarkIcon, Share2Icon, CopyIcon, CheckIcon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ExcuseCardProps {
  excuse: Excuse;
  isSaved?: boolean;
  onSaved?: () => void;
  onDeleted?: () => void;
  variant?: 'default' | 'saved';
}

const ExcuseCard = ({ 
  excuse, 
  isSaved = false, 
  onSaved, 
  onDeleted,
  variant = 'default' 
}: ExcuseCardProps) => {
  const [copied, setCopied] = useState(false);
  const [animateDelete, setAnimateDelete] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(excuse.text);
    setCopied(true);
    toast.success('Excuse copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSave = () => {
    saveExcuse(excuse);
    toast.success('Excuse saved to your collection');
    if (onSaved) onSaved();
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Inventive Apology Engine',
        text: excuse.text,
        url: window.location.href,
      }).then(() => {
        toast.success('Excuse shared successfully');
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback to copy
        handleCopy();
      });
    } else {
      // Fallback to copy
      handleCopy();
      toast.info('Excuse copied to clipboard for sharing');
    }
  };
  
  const handleDelete = () => {
    setAnimateDelete(true);
    
    setTimeout(() => {
      deleteExcuse(excuse.id);
      if (onDeleted) onDeleted();
      toast.success('Excuse deleted from your collection');
    }, 300);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-450 bezier-smooth",
        variant === 'default' 
          ? "bg-white hover:shadow-medium border-muted/50" 
          : "bg-muted/30 backdrop-blur-sm border-muted",
        animateDelete ? "opacity-0 transform translate-x-10" : "opacity-100"
      )}
    >
      <CardContent className="p-6">
        <p className="text-xl font-medium text-foreground/90 mb-4 text-balance">
          {excuse.text}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Situation:</span> {excuse.situation}
          </div>
          
          <div className="flex items-center gap-2">
            {variant === 'saved' ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
                title="Delete excuse"
              >
                <TrashIcon size={18} />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full", 
                  isSaved 
                    ? "text-accent/80 hover:text-accent hover:bg-accent/10" 
                    : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                )}
                onClick={handleSave}
                disabled={isSaved}
                title={isSaved ? "Already saved" : "Save excuse"}
              >
                <BookmarkIcon size={18} className={isSaved ? "fill-accent/80" : ""} />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={handleShare}
              title="Share excuse"
            >
              <Share2Icon size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcuseCard;
