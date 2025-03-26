
// Types
export type Excuse = {
  id: string;
  situation: string;
  reason: string;
  text: string;
  createdAt: Date;
};

type ExcuseTemplates = {
  professional: string[];
  personal: string[];
  social: string[];
  default: string[];
};

// Template sentences for generating excuses
const excuseTemplates: ExcuseTemplates = {
  professional: [
    "I couldn't attend the meeting because {reason}, which led to an unexpected quantum fluctuation in my calendar.",
    "The deadline was missed because {reason}. My productivity algorithm needs a critical update.",
    "I'll need to reschedule because {reason}. My personal AI assistant double-booked me.",
    "The project is delayed because {reason}. My neural pathways were temporarily rerouted to solve a cosmic mystery.",
    "I can't make it to work today because {reason}. My biorhythm synchronization is undergoing maintenance.",
    "The report will be late because {reason}. My cognitive bandwidth was temporarily allocated elsewhere.",
    "I missed your email because {reason}. My digital perception filters were calibrated incorrectly.",
  ],
  personal: [
    "I forgot your birthday because {reason}. My memory banks were undergoing a critical update.",
    "I didn't call back because {reason}. My communication protocols were corrupted by a surge of emotions.",
    "I'm running late because {reason}. My temporal perception matrix is experiencing glitches today.",
    "I couldn't make it to dinner because {reason}. My teleportation device malfunctioned at the last moment.",
    "I didn't do the dishes because {reason}. My domestic responsibility algorithm needed recalibration.",
    "I forgot to pick up the groceries because {reason}. My errand-execution subroutine encountered a critical error.",
    "I haven't texted back because {reason}. My digital response generator is experiencing unexpected latency.",
  ],
  social: [
    "I'm leaving the party early because {reason}. My social energy reserves have reached critical levels.",
    "I can't attend your event because {reason}. My social calendar experienced a catastrophic overflow error.",
    "I didn't RSVP because {reason}. My decision-making cortex was temporarily offline.",
    "I've been quiet lately because {reason}. My extroversion circuits required extensive maintenance.",
    "I'll have to skip the gathering because {reason}. My social interaction battery needs recharging.",
    "I was late to the meetup because {reason}. My navigation algorithms were recalibrating to the area's quantum fluctuations.",
    "I didn't join the video call because {reason}. My digital presence matrix was experiencing dimensional instability.",
  ],
  default: [
    "I couldn't do it because {reason}. The universe conspired against me in the most spectacular fashion.",
    "It didn't happen because {reason}. The cosmic timing wasn't aligned with my personal energy field.",
    "I failed to deliver because {reason}. My reality distortion field unexpectedly malfunctioned.",
    "I missed it because {reason}. An unexpected glitch in the space-time continuum occurred.",
    "I didn't manage because {reason}. My quantum entanglement with the task was temporarily severed.",
    "It slipped my mind because {reason}. A temporary hiatus in my consciousness continuum occurred.",
    "I overlooked it because {reason}. My attention was diverted by an anomaly in the fabric of reality.",
  ],
};

// Enhanced excuses with ridiculous descriptors
const enhancers = [
  "remarkably inconvenient",
  "cosmically unfortunate",
  "absurdly timed",
  "existentially challenging",
  "metaphysically disruptive",
  "quantumly improbable",
  "philosophically perplexing",
  "universally ill-timed",
  "paradoxically predictable",
  "ironically perfect",
];

// Function to categorize the situation
const categorizeInput = (input: string): keyof ExcuseTemplates => {
  const input_lower = input.toLowerCase();
  
  const professionalKeywords = ['work', 'job', 'meeting', 'deadline', 'project', 'client', 'office', 'boss', 'colleague', 'email', 'professional'];
  const personalKeywords = ['family', 'friend', 'home', 'birthday', 'dinner', 'personal', 'date', 'relationship', 'dishes', 'chores'];
  const socialKeywords = ['party', 'event', 'gathering', 'social', 'meetup', 'hangout', 'club', 'drink', 'lunch', 'coffee'];
  
  if (professionalKeywords.some(keyword => input_lower.includes(keyword))) {
    return 'professional';
  } else if (personalKeywords.some(keyword => input_lower.includes(keyword))) {
    return 'personal';
  } else if (socialKeywords.some(keyword => input_lower.includes(keyword))) {
    return 'social';
  } else {
    return 'default';
  }
};

// Generate a random enhancer
const getRandomEnhancer = (): string => {
  return enhancers[Math.floor(Math.random() * enhancers.length)];
};

// Generate a random excuse template based on the situation
const getRandomTemplate = (category: keyof ExcuseTemplates): string => {
  const templates = excuseTemplates[category];
  return templates[Math.floor(Math.random() * templates.length)];
};

// Generate an excuse
export const generateExcuse = (situation: string, reason: string): Excuse => {
  // Generate a unique ID using timestamp and random string
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  
  // Categorize the input
  const category = categorizeInput(situation);
  
  // Get a random template
  const template = getRandomTemplate(category);
  
  // Create the enhanced reason
  const enhancedReason = `a ${getRandomEnhancer()} ${reason}`;
  
  // Create the excuse text
  const excuseText = template.replace('{reason}', enhancedReason);
  
  return {
    id,
    situation,
    reason,
    text: excuseText,
    createdAt: new Date(),
  };
};

// Helper to generate multiple excuses for variety
export const generateMultipleExcuses = (
  situation: string,
  reason: string,
  count: number = 3
): Excuse[] => {
  const excuses: Excuse[] = [];
  
  for (let i = 0; i < count; i++) {
    excuses.push(generateExcuse(situation, reason));
  }
  
  return excuses;
};

// Local storage helpers
export const saveExcuse = (excuse: Excuse): void => {
  const savedExcuses = getSavedExcuses();
  const updatedExcuses = [excuse, ...savedExcuses];
  
  localStorage.setItem('savedExcuses', JSON.stringify(updatedExcuses));
};

export const getSavedExcuses = (): Excuse[] => {
  const savedExcusesJson = localStorage.getItem('savedExcuses');
  if (!savedExcusesJson) return [];
  
  try {
    const parsedExcuses = JSON.parse(savedExcusesJson);
    return Array.isArray(parsedExcuses) ? parsedExcuses : [];
  } catch (error) {
    console.error('Error parsing saved excuses:', error);
    return [];
  }
};

export const deleteExcuse = (excuseId: string): void => {
  const savedExcuses = getSavedExcuses();
  const updatedExcuses = savedExcuses.filter(excuse => excuse.id !== excuseId);
  
  localStorage.setItem('savedExcuses', JSON.stringify(updatedExcuses));
};
