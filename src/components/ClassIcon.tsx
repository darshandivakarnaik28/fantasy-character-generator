import React from 'react';
import { 
  Swords, 
  Sparkles, 
  Footprints, 
  ShieldAlert, 
  Target, 
  SunMedium, 
  Music2, 
  Leaf 
} from 'lucide-react';
import { CharacterClassKey } from '../types/character';

interface ClassIconProps {
  characterClass: CharacterClassKey;
  className?: string;
  size?: number;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ characterClass, className = 'w-6 h-6', size = 24 }) => {
  switch (characterClass) {
    case 'Warrior':
      return <Swords className={className} size={size} />;
    case 'Mage':
      return <Sparkles className={className} size={size} />;
    case 'Rogue':
      return <Footprints className={className} size={size} />;
    case 'Paladin':
      return <ShieldAlert className={className} size={size} />;
    case 'Ranger':
      return <Target className={className} size={size} />;
    case 'Cleric':
      return <SunMedium className={className} size={size} />;
    case 'Bard':
      return <Music2 className={className} size={size} />;
    case 'Druid':
      return <Leaf className={className} size={size} />;
    default:
      return <Swords className={className} size={size} />;
  }
};
