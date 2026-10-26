import { Character, CharacterClassKey, ClassDetails, CharacterStats } from '../types/character';

export const CLASSES: Record<CharacterClassKey, ClassDetails> = {
  Warrior: {
    key: 'Warrior',
    label: 'Warrior',
    tagline: 'Stalwart frontline champion of tempered steel and resolute valor',
    primaryStat: 'strength',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
    badgeText: 'text-red-400',
    borderColor: 'border-red-500/40',
    gradient: 'from-amber-700/20 via-red-950/40 to-neutral-950/80',
    accentHex: '#ef4444',
  },
  Mage: {
    key: 'Mage',
    label: 'Mage',
    tagline: 'Master of the arcane weave, channeling primal elements and reality-bending spells',
    primaryStat: 'intellect',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    badgeText: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    gradient: 'from-blue-700/20 via-indigo-950/40 to-neutral-950/80',
    accentHex: '#3b82f6',
  },
  Rogue: {
    key: 'Rogue',
    label: 'Rogue',
    tagline: 'Silent shadowdancer striking from the gloom with lethal precision and cunning',
    primaryStat: 'agility',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    badgeText: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    gradient: 'from-emerald-700/20 via-teal-950/40 to-neutral-950/80',
    accentHex: '#10b981',
  },
  Paladin: {
    key: 'Paladin',
    label: 'Paladin',
    tagline: 'Holy crusader sworn to sacred oaths of righteous fury and radiant defense',
    primaryStat: 'strength',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    badgeText: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    gradient: 'from-amber-600/20 via-yellow-950/40 to-neutral-950/80',
    accentHex: '#f59e0b',
  },
  Ranger: {
    key: 'Ranger',
    label: 'Ranger',
    tagline: 'Peerless scout and tracker attuned to the untamed rhythms of the wild frontiers',
    primaryStat: 'agility',
    badgeBg: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
    badgeText: 'text-lime-400',
    borderColor: 'border-lime-500/40',
    gradient: 'from-lime-700/20 via-stone-950/40 to-neutral-950/80',
    accentHex: '#84cc16',
  },
  Cleric: {
    key: 'Cleric',
    label: 'Cleric',
    tagline: 'Chosen conduit of divine deities, healing the wounded and smiting darkness',
    primaryStat: 'vitality',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    badgeText: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    gradient: 'from-cyan-700/20 via-sky-950/40 to-neutral-950/80',
    accentHex: '#06b6d4',
  },
  Bard: {
    key: 'Bard',
    label: 'Bard',
    tagline: 'Silver-tongued virtuoso weaving enchantments and rousing legends with verse',
    primaryStat: 'charisma',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    badgeText: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    gradient: 'from-purple-700/20 via-fuchsia-950/40 to-neutral-950/80',
    accentHex: '#a855f7',
  },
  Druid: {
    key: 'Druid',
    label: 'Druid',
    tagline: 'Guardian of elder groves who communes with beasts and summons storm and flora',
    primaryStat: 'intellect',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    badgeText: 'text-teal-400',
    borderColor: 'border-teal-500/40',
    gradient: 'from-teal-700/20 via-green-950/40 to-neutral-950/80',
    accentHex: '#14b8a6',
  },
};

export const FIRST_NAMES = [
  'Aeloria', 'Theron', 'Kaelen', 'Lyra', 'Vaelin', 'Morrigan', 'Drakon', 'Seraphina',
  'Cassian', 'Isolde', 'Gideon', 'Rowan', 'Zephyr', 'Balthazar', 'Valerius', 'Faelan',
  'Elysia', 'Garrick', 'Sylvan', 'Eldrin', 'Brynna', 'Corvus', 'Thorgar', 'Mirella',
  'Alistair', 'Fenris', 'Kaelen', 'Vespera', 'Torin', 'Nyssa', 'Darius', 'Maeve',
  'Cedric', 'Astrid', 'Evander', 'Rhiannon', 'Aldous', 'Selene', 'Grimwald', 'Talia',
  'Orion', 'Kallista', 'Branok', 'Sariel', 'Gwyneira', 'Varian', 'Morwenna', 'Doran',
  'Elspeth', 'Zephyrus', 'Aurelius', 'Yvaine', 'Kragthor', 'Thea', 'Xanthos', 'Caelum'
];

export const SURNAMES = [
  'Shadowalker', 'Ironheart', 'Stormcaller', 'Moonwhisper', 'Firebrand', 'Silverhand',
  'Ravencrest', 'Frostborn', 'Spellweaver', 'Oakenshield', 'Dawnseeker', 'Nightshade',
  'Drakesbane', 'Lightbringer', 'Blackthorn', 'Deepdelver', 'Windstrider', 'Bloodthorn',
  'Emberfall', 'Sunstrider', 'Wintervale', 'Gloomhaven', 'Starfire', 'Runebound'
];

export const TITLES = [
  'the Undaunted', 'the Spellbound', 'the Silent Blade', 'of the Whispering Crags',
  'the Ironwilled', 'the Astromancer', 'of the Ashen Wastes', 'the Swiftfeather',
  'Keeper of the Grove', 'the Vigilant', 'the Golden Lion', 'Scourge of Goblins',
  'the Veilstrider', 'the Sovereign', 'of the Frostpeaks', 'the Everlasting'
];

export const RACES = [
  'High Elf', 'Mountain Dwarf', 'Human', 'Tiefling', 'Dragonborn',
  'Wood Elf', 'Halfling', 'Half-Orc', 'Gnome', 'Aasimar'
];

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil'
];

export const CLASS_WEAPONS: Record<CharacterClassKey, string[]> = {
  Warrior: ['Tempered Greatsword', 'Runed Battleaxe', 'Flanged War Warhammer & Tower Shield', 'Bastard Sword of Solitude'],
  Mage: ['Crystal-Tipped Oak Staff', 'Tome of Celestial Embers', 'Orb of Arcane Singularity', 'Wand of Prismatic Light'],
  Rogue: ['Dual Serrated Daggers', 'Silent Repeating Hand Crossbow', 'Shadow-forged Stiletto', 'Poisoned Rapier'],
  Paladin: ['Sun-blessed Claymore', 'Radiant Mace & Kite Shield', 'Holy Halberd of Dawn', 'Silvered Bastard Blade'],
  Ranger: ['Recurve Longbow of the Wilds', 'Twin Elven Shortswords', 'Yew Compound Bow', 'Bramblewood Crossbow'],
  Cleric: ['Gilded Morningstar & Sacred Reliquary', 'Censer of Purifying Grace', 'War Scepter of the Heavens'],
  Bard: ['Lute of Resonant Winds', 'Enchanted Rapier', 'Bladed Flute', 'Lyre of Mesmerizing Harmonies'],
  Druid: ['Living Ashwood Quarterstaff', 'Sickle of the Full Moon', 'Totem of the Primal Bear'],
};

export const CLASS_ABILITIES: Record<CharacterClassKey, string[]> = {
  Warrior: ['Shield Wall', 'Colossus Strike', 'Whirlwind Blade', 'Battle Cry', 'Iron Fortress'],
  Mage: ['Arcane Singularity', 'Chain Lightning', 'Pyroclastic Meteor', 'Time Dilation', 'Frost Nova'],
  Rogue: ['Shadow Step', 'Assassinate', 'Smoke Bomb', 'Flurry of Daggers', 'Vanish'],
  Paladin: ['Radiant Smite', 'Lay on Hands', 'Aura of Protection', 'Consecrated Ground'],
  Ranger: ['Hail of Arrows', 'Hunter\'s Mark', 'Beast Bond', 'Volley', 'Camouflage'],
  Cleric: ['Divine Intervention', 'Prayer of Healing', 'Sunburst', 'Sanctuary Ward'],
  Bard: ['Song of Inspiration', 'Vicious Mockery', 'Hypnotic Pattern', 'Discordant Chord'],
  Druid: ['Wild Shape: Dire Wolf', 'Entangling Roots', 'Call Lightning', 'Barkskin'],
};

export const LORE_SNIPPETS: string[] = [
  'Wields an ancient heirloom recovered from a sunken forgotten citadel in the sunken marshes.',
  'Sworn to an unbroken oath after surviving the catastrophic siege of the Obsidian Gates.',
  'Trained in the secluded mountaintop cloisters where masters learn to whisper to the wind.',
  'Carries mysterious runic scars that glow faint azure whenever danger lingers near.',
  'Known across taverns from the coastal ports to the high peaks for an unmatched quick draw.',
  'Driven by the mysterious prophecy etched into the silver amulet gifted at infancy.',
  'Left their ancestral clan after rejecting a corrupt council, seeking redemption in the frontier.',
  'Speaks the forgotten dialect of elder dragons and hears echoes of prophecies in campfires.'
];

function getRandomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomStat(min = 8, max = 18): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate stats with a class-appropriate primary stat boost
function generateStats(characterClass: CharacterClassKey): CharacterStats {
  const baseStats: CharacterStats = {
    strength: getRandomStat(8, 16),
    agility: getRandomStat(8, 16),
    intellect: getRandomStat(8, 16),
    vitality: getRandomStat(8, 16),
    charisma: getRandomStat(8, 16),
  };

  const primary = CLASSES[characterClass].primaryStat;
  baseStats[primary] = Math.min(20, baseStats[primary] + Math.floor(Math.random() * 4) + 3);

  return baseStats;
}

// Helper to generate a unique character name
export function generateUniqueName(existingNames: Set<string>): { name: string; title: string } {
  let attempts = 0;
  const maxAttempts = 200;

  while (attempts < maxAttempts) {
    const first = getRandomElement(FIRST_NAMES);
    const surname = getRandomElement(SURNAMES);
    const title = getRandomElement(TITLES);
    
    // Choose format: First Surname, or First "Surname" title
    const fullName = `${first} ${surname}`;
    if (!existingNames.has(fullName)) {
      return { name: fullName, title };
    }
    attempts++;
  }

  // Fallback if extensive pool is exhausted: append roman numeral or unique moniker
  const first = getRandomElement(FIRST_NAMES);
  const surname = getRandomElement(SURNAMES);
  const title = getRandomElement(TITLES);
  const romanNumerals = ['II', 'III', 'IV', 'V', 'the Elder', 'the Younger', 'Reborn'];
  const uniqueSuffix = getRandomElement(romanNumerals);
  const fallbackName = `${first} ${surname} ${uniqueSuffix}`;
  return { name: fallbackName, title };
}

export function createRandomCharacter(
  existingNames: Set<string>,
  forcedClass?: CharacterClassKey
): Character {
  const classKeys = Object.keys(CLASSES) as CharacterClassKey[];
  const characterClass = forcedClass || getRandomElement(classKeys);
  const { name, title } = generateUniqueName(existingNames);
  const race = getRandomElement(RACES);
  const alignment = getRandomElement(ALIGNMENTS);
  const weapon = getRandomElement(CLASS_WEAPONS[characterClass]);
  const signatureAbility = getRandomElement(CLASS_ABILITIES[characterClass]);
  const loreSnippet = getRandomElement(LORE_SNIPPETS);
  const stats = generateStats(characterClass);

  // Generate random Health, Mana, and Strength tailored to the character
  const healthBase = characterClass === 'Warrior' || characterClass === 'Paladin' ? 120 : characterClass === 'Rogue' ? 95 : 85;
  const health = healthBase + Math.floor(Math.random() * 31); // 85 - 150+

  const manaBase = characterClass === 'Mage' || characterClass === 'Cleric' || characterClass === 'Druid' ? 110 : characterClass === 'Bard' ? 90 : 50;
  const mana = manaBase + Math.floor(Math.random() * 31); // 50 - 140+

  const strength = stats.strength;

  return {
    id: 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
    name,
    title,
    characterClass,
    race,
    alignment,
    health,
    mana,
    strength,
    stats,
    signatureAbility,
    weapon,
    loreSnippet,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}
