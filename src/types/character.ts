export type CharacterClassKey =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Druid';

export interface CharacterStats {
  strength: number;
  agility: number;
  intellect: number;
  vitality: number;
  charisma: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClassKey;
  race: string;
  alignment: string;
  health: number;
  mana: number;
  strength: number;
  stats: CharacterStats;
  signatureAbility: string;
  weapon: string;
  loreSnippet: string;
  backstory?: string;
  portraitUrl?: string;
  generatedAt: string;
}

export interface ClassDetails {
  key: CharacterClassKey;
  label: string;
  tagline: string;
  primaryStat: keyof CharacterStats;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  gradient: string;
  accentHex: string;
}
