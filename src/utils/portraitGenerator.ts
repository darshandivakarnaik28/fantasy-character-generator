import { Character, CharacterClassKey } from '../types/character';

// Generates a high-quality, vibrant cartoon / video-game style SVG portrait
export function generateCartoonPortraitSvg(character: Character, variant: number = 0): string {
  const { characterClass, race } = character;
  
  // Theme palettes by class
  const classPalettes: Record<CharacterClassKey, {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    dark: string;
  }> = {
    Warrior: {
      primary: '#dc2626',
      secondary: '#f97316',
      accent: '#fbbf24',
      glow: '#ef4444',
      dark: '#450a0a',
    },
    Mage: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#38bdf8',
      glow: '#a855f7',
      dark: '#1e1b4b',
    },
    Rogue: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      glow: '#059669',
      dark: '#022c22',
    },
    Paladin: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fef08a',
      glow: '#f59e0b',
      dark: '#451a03',
    },
    Ranger: {
      primary: '#65a30d',
      secondary: '#84cc16',
      accent: '#a3e635',
      glow: '#4ade80',
      dark: '#14532d',
    },
    Cleric: {
      primary: '#06b6d4',
      secondary: '#38bdf8',
      accent: '#e0f2fe',
      glow: '#0ea5e9',
      dark: '#083344',
    },
    Bard: {
      primary: '#ec4899',
      secondary: '#d946ef',
      accent: '#fbcfe8',
      glow: '#e879f9',
      dark: '#500724',
    },
    Druid: {
      primary: '#0d9488',
      secondary: '#14b8a6',
      accent: '#5eead4',
      glow: '#2dd4bf',
      dark: '#134e4a',
    },
  };

  const palette = classPalettes[characterClass] || classPalettes.Warrior;

  // Skin tone based on Race
  let skinBase = '#fcd34d';
  let skinShadow = '#f59e0b';
  let isTiefling = false;
  let isDragonborn = false;
  let isOrc = false;
  let isElf = false;
  let isDwarf = false;

  if (race.includes('Elf')) {
    isElf = true;
    skinBase = variant % 2 === 0 ? '#ffedd5' : '#fed7aa';
    skinShadow = '#fdba74';
  } else if (race.includes('Tiefling')) {
    isTiefling = true;
    skinBase = variant % 2 === 0 ? '#f43f5e' : '#be123c';
    skinShadow = '#881337';
  } else if (race.includes('Dragonborn')) {
    isDragonborn = true;
    skinBase = variant % 2 === 0 ? '#ea580c' : '#c2410c';
    skinShadow = '#7c2d12';
  } else if (race.includes('Half-Orc')) {
    isOrc = true;
    skinBase = '#84cc16';
    skinShadow = '#4d7c0f';
  } else if (race.includes('Dwarf')) {
    isDwarf = true;
    skinBase = '#ffedd5';
    skinShadow = '#f97316';
  } else {
    // Human / Halfling / Gnome
    const skins = [
      { base: '#fed7aa', shadow: '#fb923c' },
      { base: '#fde047', shadow: '#ca8a04' },
      { base: '#d97706', shadow: '#92400e' },
      { base: '#ffedd5', shadow: '#f97316' },
    ];
    const s = skins[variant % skins.length];
    skinBase = s.base;
    skinShadow = s.shadow;
  }

  // Hair / Mane colors
  const hairColors = [
    { base: '#f59e0b', highlight: '#fde68a', shadow: '#b45309' }, // Golden Blonde
    { base: '#78350f', highlight: '#b45309', shadow: '#451a03' }, // Chestnut Brown
    { base: '#1e293b', highlight: '#475569', shadow: '#0f172a' }, // Raven Black
    { base: '#e2e8f0', highlight: '#ffffff', shadow: '#94a3b8' }, // Mystic Silver/White
    { base: '#dc2626', highlight: '#f87171', shadow: '#7f1d1d' }, // Crimson Fire
  ];
  const hair = hairColors[(variant + character.name.length) % hairColors.length];

  // Variations in expressions, eyes, war paint, and particle styles
  const expressionIndex = variant % 4;

  // Background visual elements
  const bgParticles = () => {
    switch (expressionIndex) {
      case 0:
        // Sunburst action rays (anime / cartoon high energy)
        return `
          <g opacity="0.3">
            <polygon points="150,150 0,0 40,0" fill="${palette.accent}" />
            <polygon points="150,150 90,0 140,0" fill="${palette.accent}" />
            <polygon points="150,150 200,0 260,0" fill="${palette.accent}" />
            <polygon points="150,150 300,40 300,90" fill="${palette.accent}" />
            <polygon points="150,150 300,160 300,210" fill="${palette.accent}" />
            <polygon points="150,150 240,300 180,300" fill="${palette.accent}" />
            <polygon points="150,150 120,300 60,300" fill="${palette.accent}" />
            <polygon points="150,150 0,260 0,200" fill="${palette.accent}" />
            <polygon points="150,150 0,140 0,80" fill="${palette.accent}" />
          </g>
        `;
      case 1:
        // Arcane magical rings and runic geometry
        return `
          <g opacity="0.35" stroke="${palette.accent}" stroke-width="2" fill="none">
            <circle cx="150" cy="150" r="110" stroke-dasharray="6,8" />
            <circle cx="150" cy="150" r="90" />
            <polygon points="150,45 240,200 60,200" stroke-width="1.5" />
            <polygon points="150,255 240,100 60,100" stroke-width="1.5" />
            <circle cx="150" cy="150" r="40" stroke-dasharray="4,4" />
          </g>
        `;
      case 2:
        // Floating power motes / floating combat embers
        return `
          <g opacity="0.5">
            <circle cx="60" cy="70" r="5" fill="${palette.accent}" />
            <circle cx="240" cy="80" r="7" fill="${palette.accent}" />
            <circle cx="260" cy="220" r="4" fill="${palette.glow}" />
            <circle cx="40" cy="200" r="6" fill="${palette.glow}" />
            <circle cx="90" cy="250" r="8" fill="${palette.accent}" />
            <circle cx="210" cy="260" r="5" fill="${palette.secondary}" />
            <polygon points="230,40 236,54 250,60 236,66 230,80 224,66 210,60 224,54" fill="#ffffff" />
            <polygon points="70,120 74,130 85,134 74,138 70,148 66,138 55,134 66,130" fill="#ffffff" />
          </g>
        `;
      default:
        // Shield hexagon matrix
        return `
          <g opacity="0.25" stroke="${palette.accent}" stroke-width="2" fill="none">
            <polygon points="70,50 90,40 110,50 110,70 90,80 70,70" />
            <polygon points="190,50 210,40 230,50 230,70 210,80 190,70" />
            <polygon points="40,140 60,130 80,140 80,160 60,170 40,160" />
            <polygon points="220,140 240,130 260,140 260,160 240,170 220,160" />
          </g>
        `;
    }
  };

  // Back equipment / class aura behind head
  const classBackdropAura = () => {
    switch (characterClass) {
      case 'Warrior':
        return `
          <!-- Crossed swords behind back -->
          <g stroke="#1e293b" stroke-width="4">
            <line x1="60" y1="50" x2="240" y2="230" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
            <line x1="240" y1="50" x2="60" y2="230" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
            <circle cx="60" cy="50" r="8" fill="${palette.accent}" stroke="#0f172a" stroke-width="2" />
            <circle cx="240" cy="50" r="8" fill="${palette.accent}" stroke="#0f172a" stroke-width="2" />
          </g>
        `;
      case 'Mage':
        return `
          <!-- Mystic arcane halo -->
          <circle cx="150" cy="140" r="95" fill="none" stroke="${palette.glow}" stroke-width="6" opacity="0.6" filter="url(#glow)"/>
          <circle cx="150" cy="140" r="82" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
        `;
      case 'Paladin':
        return `
          <!-- Radiant golden aura & wings hint -->
          <path d="M 60 160 Q 30 100 80 70 Q 110 110 120 150 Z" fill="${palette.accent}" opacity="0.4" />
          <path d="M 240 160 Q 270 100 220 70 Q 190 110 180 150 Z" fill="${palette.accent}" opacity="0.4" />
          <circle cx="150" cy="90" r="50" fill="none" stroke="#fef08a" stroke-width="4" opacity="0.8"/>
        `;
      case 'Rogue':
        return `
          <!-- Shadow poison vapors -->
          <path d="M 50 180 Q 70 120 100 140 Q 60 160 50 180 Z" fill="#059669" opacity="0.5" filter="url(#glow)"/>
          <path d="M 250 180 Q 230 120 200 140 Q 240 160 250 180 Z" fill="#059669" opacity="0.5" filter="url(#glow)"/>
        `;
      case 'Ranger':
        return `
          <!-- Bow tip and leafy branch -->
          <path d="M 80 50 Q 50 120 70 200" stroke="#b45309" stroke-width="7" fill="none" stroke-linecap="round"/>
          <line x1="80" y1="50" x2="70" y2="200" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3"/>
          <path d="M 220 70 Q 250 90 230 120" stroke="#4ade80" stroke-width="4" fill="none" stroke-linecap="round"/>
        `;
      case 'Bard':
        return `
          <!-- Musical note bursts -->
          <g fill="${palette.accent}" opacity="0.7">
            <text x="45" y="100" font-size="28" font-family="sans-serif" font-weight="bold">♪</text>
            <text x="240" y="90" font-size="34" font-family="sans-serif" font-weight="bold">♫</text>
            <text x="250" y="160" font-size="24" font-family="sans-serif" font-weight="bold">♬</text>
          </g>
        `;
      default:
        return '';
    }
  };

  // Armor & Shoulders based on class
  const classTorsoAndArmor = () => {
    switch (characterClass) {
      case 'Warrior':
        return `
          <!-- Spiked Steel Pauldrons & Plate Armor -->
          <g>
            <!-- Body base -->
            <path d="M 70 290 L 75 220 L 110 205 L 150 215 L 190 205 L 225 220 L 230 290 Z" fill="#334155" stroke="#0f172a" stroke-width="4" />
            <!-- Plate chestpiece with crimson emblem -->
            <path d="M 95 225 L 150 240 L 205 225 L 200 290 L 100 290 Z" fill="#475569" stroke="#0f172a" stroke-width="3" />
            <polygon points="150,242 165,265 150,285 135,265" fill="${palette.primary}" stroke="#fbbf24" stroke-width="2" />
            <!-- Left Pauldron (Spiked) -->
            <path d="M 40 220 Q 60 185 100 195 L 105 235 L 60 250 Z" fill="#64748b" stroke="#0f172a" stroke-width="4" />
            <polygon points="65,190 75,170 85,195" fill="#f87171" stroke="#0f172a" stroke-width="2" />
            <!-- Right Pauldron (Spiked) -->
            <path d="M 260 220 Q 240 185 200 195 L 195 235 L 240 250 Z" fill="#64748b" stroke="#0f172a" stroke-width="4" />
            <polygon points="235,190 225,170 215,195" fill="#f87171" stroke="#0f172a" stroke-width="2" />
            <!-- Gorget/Collar -->
            <path d="M 120 205 Q 150 220 180 205 L 175 190 L 125 190 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="3" />
          </g>
        `;
      case 'Mage':
        return `
          <!-- Arcane Robes with Gem Brooch -->
          <g>
            <path d="M 70 290 L 80 210 L 150 210 L 220 210 L 230 290 Z" fill="${palette.dark}" stroke="#0f172a" stroke-width="4" />
            <!-- Robe Lapels -->
            <path d="M 100 210 L 150 280 L 90 290 Z" fill="${palette.primary}" stroke="#0f172a" stroke-width="3" />
            <path d="M 200 210 L 150 280 L 210 290 Z" fill="${palette.primary}" stroke="#0f172a" stroke-width="3" />
            <!-- Gold Runic Hem -->
            <path d="M 100 210 L 150 280 L 200 210" fill="none" stroke="#fbbf24" stroke-width="4" />
            <!-- Big Glowing Arcane Brooch -->
            <circle cx="150" cy="215" r="12" fill="${palette.accent}" stroke="#0f172a" stroke-width="3" />
            <circle cx="150" cy="215" r="7" fill="#ffffff" />
          </g>
        `;
      case 'Rogue':
        return `
          <!-- Leather Brigandine with Dagger Sheaths -->
          <g>
            <path d="M 75 290 L 85 210 L 150 215 L 215 210 L 225 290 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4" />
            <!-- Leather crossed straps -->
            <line x1="85" y1="215" x2="215" y2="285" stroke="#78350f" stroke-width="8" />
            <line x1="215" y1="215" x2="85" y2="285" stroke="#78350f" stroke-width="8" />
            <!-- Dagger handle in strap -->
            <polygon points="120,230 130,220 140,230 130,240" fill="#94a3b8" stroke="#0f172a" stroke-width="2" />
            <!-- High cowl collar -->
            <path d="M 110 205 Q 150 225 190 205 L 180 180 L 120 180 Z" fill="#047857" stroke="#0f172a" stroke-width="3" />
          </g>
        `;
      case 'Paladin':
        return `
          <!-- Gilded Knight Plate -->
          <g>
            <path d="M 70 290 L 80 210 L 150 215 L 220 210 L 230 290 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="4" />
            <!-- Golden Chest Crest -->
            <path d="M 100 220 L 150 250 L 200 220 L 190 290 L 110 290 Z" fill="#fbbf24" stroke="#0f172a" stroke-width="3" />
            <circle cx="150" cy="245" r="10" fill="#ffffff" stroke="#b45309" stroke-width="2" />
            <!-- Heavy Gilded Shoulders -->
            <path d="M 50 225 Q 70 190 105 200 L 110 240 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="4" />
            <path d="M 250 225 Q 230 190 195 200 L 190 240 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="4" />
          </g>
        `;
      default:
        return `
          <!-- Adventurer Leather & Tunic -->
          <g>
            <path d="M 75 290 L 85 210 L 150 215 L 215 210 L 225 290 Z" fill="${palette.dark}" stroke="#0f172a" stroke-width="4" />
            <path d="M 115 210 L 150 260 L 185 210 Z" fill="${palette.primary}" stroke="#0f172a" stroke-width="3" />
            <circle cx="150" cy="235" r="6" fill="#fbbf24" stroke="#0f172a" stroke-width="2" />
          </g>
        `;
    }
  };

  // Neck and Head Base
  const headAndFace = () => {
    return `
      <!-- Neck -->
      <path d="M 130 180 L 130 215 L 170 215 L 170 180 Z" fill="${skinShadow}" stroke="#0f172a" stroke-width="3" />
      
      <!-- Head shape -->
      <path d="M 105 130 Q 105 195 150 195 Q 195 195 195 130 Q 195 85 150 85 Q 105 85 105 130 Z" 
            fill="${skinBase}" stroke="#0f172a" stroke-width="4" />

      <!-- Cheek blush cartoon dots -->
      <circle cx="118" cy="155" r="6" fill="${skinShadow}" opacity="0.6" />
      <circle cx="182" cy="155" r="6" fill="${skinShadow}" opacity="0.6" />
    `;
  };

  // Race-specific ear / horns / tusks
  const raceFeatures = () => {
    let extra = '';

    if (isElf) {
      extra += `
        <!-- Long Pointed Elven Ears -->
        <g stroke="#0f172a" stroke-width="3">
          <path d="M 106 130 Q 75 110 65 95 Q 90 120 106 145 Z" fill="${skinBase}" />
          <path d="M 194 130 Q 225 110 235 95 Q 210 120 194 145 Z" fill="${skinBase}" />
          <!-- Earring -->
          <circle cx="68" cy="100" r="3" fill="#fbbf24" />
        </g>
      `;
    } else if (isTiefling) {
      extra += `
        <!-- Dramatic Curved Tiefling Horns -->
        <g stroke="#0f172a" stroke-width="4">
          <path d="M 115 95 Q 90 40 60 45 Q 85 75 125 102 Z" fill="#450a0a" />
          <path d="M 185 95 Q 210 40 240 45 Q 215 75 175 102 Z" fill="#450a0a" />
          <!-- Gold Horn Rings -->
          <line x1="85" y1="58" x2="95" y2="65" stroke="#fbbf24" stroke-width="3" />
          <line x1="215" y1="58" x2="205" y2="65" stroke="#fbbf24" stroke-width="3" />
        </g>
      `;
    } else if (isDragonborn) {
      extra += `
        <!-- Draconic Horn Crest and Scales -->
        <g stroke="#0f172a" stroke-width="3">
          <polygon points="150,55 140,85 160,85" fill="#c2410c" />
          <polygon points="125,65 115,92 135,92" fill="#c2410c" />
          <polygon points="175,65 165,92 185,92" fill="#c2410c" />
          <!-- Brow Ridge Scales -->
          <path d="M 118 115 L 140 120 L 160 120 L 182 115" stroke="#7c2d12" stroke-width="4" fill="none" />
        </g>
      `;
    } else if (isOrc) {
      extra += `
        <!-- Half-Orc Tusks -->
        <g stroke="#0f172a" stroke-width="2">
          <polygon points="134,168 138,154 142,168" fill="#ffffff" />
          <polygon points="158,168 162,154 166,168" fill="#ffffff" />
          <!-- Heavy Brow Ridge -->
          <path d="M 115 120 Q 150 126 185 120" stroke="#365314" stroke-width="5" fill="none" />
        </g>
      `;
    } else {
      // Human / Dwarf / Gnome ears
      extra += `
        <ellipse cx="103" cy="140" rx="6" ry="10" fill="${skinBase}" stroke="#0f172a" stroke-width="3" />
        <ellipse cx="197" cy="140" rx="6" ry="10" fill="${skinBase}" stroke="#0f172a" stroke-width="3" />
      `;
    }

    if (isDwarf) {
      extra += `
        <!-- Dwarf Grand Braided Beard -->
        <g stroke="#0f172a" stroke-width="3">
          <path d="M 115 155 Q 110 230 150 240 Q 190 230 185 155 Q 150 175 115 155 Z" fill="${hair.base}" />
          <!-- Beard Braids & Gold Clips -->
          <circle cx="140" cy="225" r="4" fill="#fbbf24" />
          <circle cx="160" cy="225" r="4" fill="#fbbf24" />
        </g>
      `;
    }

    return extra;
  };

  // Eyes, Brows & Mouth (Cartoon Video Game style expressions)
  const facialFeatures = () => {
    switch (expressionIndex) {
      case 0:
        // Confident Heroic Smile
        return `
          <!-- Brows -->
          <path d="M 120 122 Q 133 118 142 124" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none" />
          <path d="M 180 122 Q 167 118 158 124" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none" />
          
          <!-- Eyes (Big Cartoon with sparkle) -->
          <ellipse cx="132" cy="135" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />
          <ellipse cx="168" cy="135" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />
          <circle cx="133" cy="136" r="5" fill="${palette.glow}" />
          <circle cx="167" cy="136" r="5" fill="${palette.glow}" />
          <circle cx="131" cy="133" r="2" fill="#ffffff" />
          <circle cx="165" cy="133" r="2" fill="#ffffff" />
          
          <!-- Nose -->
          <path d="M 148 142 Q 152 147 146 150" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round" />

          <!-- Smile -->
          <path d="M 134 165 Q 150 178 166 165" stroke="#0f172a" stroke-width="3.5" fill="#ffffff" />
          <!-- Smile tooth glint -->
          <polygon points="163,165 166,163 169,165 166,167" fill="#ffffff" />
        `;
      case 1:
        // Fierce Battle Focus / Glowing Eyes
        return `
          <!-- Intense Brows -->
          <path d="M 118 126 L 142 121" stroke="#0f172a" stroke-width="4.5" stroke-linecap="round" />
          <path d="M 182 126 L 158 121" stroke="#0f172a" stroke-width="4.5" stroke-linecap="round" />
          
          <!-- Glowing Eyes -->
          <ellipse cx="132" cy="134" rx="7" ry="6" fill="${palette.accent}" stroke="#0f172a" stroke-width="2" filter="url(#glow)" />
          <ellipse cx="168" cy="134" rx="7" ry="6" fill="${palette.accent}" stroke="#0f172a" stroke-width="2" filter="url(#glow)" />
          <ellipse cx="132" cy="134" rx="3" ry="5" fill="#ffffff" />
          <ellipse cx="168" cy="134" rx="3" ry="5" fill="#ffffff" />
          
          <!-- Nose -->
          <polygon points="150,140 146,148 154,148" fill="${skinShadow}" stroke="#0f172a" stroke-width="2" />

          <!-- Battle Grin / Smirk -->
          <path d="M 136 168 L 164 164" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" />
          
          <!-- Cheek Scar -->
          <line x1="120" y1="145" x2="128" y2="155" stroke="#dc2626" stroke-width="2.5" />
          <line x1="121" y1="150" x2="127" y2="150" stroke="#dc2626" stroke-width="1.5" />
        `;
      case 2:
        // Cunning Roguish Wink
        return `
          <!-- Brows -->
          <path d="M 120 120 Q 130 115 142 120" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none" />
          <path d="M 180 124 Q 170 120 158 124" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none" />
          
          <!-- Open Eye -->
          <ellipse cx="132" cy="134" rx="8" ry="9" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />
          <circle cx="133" cy="135" r="5" fill="${palette.glow}" />
          <circle cx="131" cy="132" r="2" fill="#ffffff" />

          <!-- Winking Eye (Arch) -->
          <path d="M 160 137 Q 168 131 176 137" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" />
          
          <!-- Nose -->
          <circle cx="150" cy="146" r="3" fill="${skinShadow}" />

          <!-- Smirking side mouth -->
          <path d="M 140 168 Q 155 168 166 160" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
        `;
      default:
        // Mystic / Arcane Calm Expression
        return `
          <!-- Serene Brows -->
          <path d="M 120 122 Q 132 119 144 121" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <path d="M 180 122 Q 168 119 156 121" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" fill="none" />
          
          <!-- Expressive Eyes -->
          <ellipse cx="132" cy="134" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />
          <ellipse cx="168" cy="134" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" />
          <circle cx="132" cy="135" r="5" fill="#3b82f6" />
          <circle cx="168" cy="135" r="5" fill="#3b82f6" />
          <circle cx="130" cy="132" r="2" fill="#ffffff" />
          <circle cx="166" cy="132" r="2" fill="#ffffff" />
          
          <!-- Forehead Mystic Rune Mark -->
          <polygon points="150,96 153,103 160,105 153,107 150,114 147,107 140,105 147,103" fill="${palette.accent}" />

          <!-- Calm Mouth -->
          <line x1="140" y1="166" x2="160" y2="166" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
        `;
    }
  };

  // Hair or Helm on Top
  const hairOrHelmet = () => {
    if (characterClass === 'Warrior' && variant % 2 === 1) {
      // Horned Iron Helm
      return `
        <g stroke="#0f172a" stroke-width="4">
          <path d="M 100 125 Q 100 70 150 70 Q 200 70 200 125 L 180 115 Q 150 110 120 115 Z" fill="#64748b" />
          <!-- Helm Horns -->
          <path d="M 102 95 Q 75 75 70 50 Q 85 70 108 85 Z" fill="#e2e8f0" />
          <path d="M 198 95 Q 225 75 230 50 Q 215 70 192 85 Z" fill="#e2e8f0" />
          <!-- Brow plate & Rivets -->
          <rect x="110" y="105" width="80" height="12" fill="#94a3b8" rx="3" />
          <circle cx="120" cy="111" r="2" fill="#fbbf24" />
          <circle cx="150" cy="111" r="2" fill="#fbbf24" />
          <circle cx="180" cy="111" r="2" fill="#fbbf24" />
        </g>
      `;
    }

    if (characterClass === 'Mage') {
      if (variant % 2 === 0) {
        // Pointed Wizard Hat
        return `
          <g stroke="#0f172a" stroke-width="4">
            <!-- Hat Cone -->
            <path d="M 90 95 Q 120 40 180 20 Q 160 50 170 95 Z" fill="${palette.dark}" />
            <!-- Hat Brim -->
            <ellipse cx="150" cy="95" rx="65" ry="16" fill="${palette.primary}" />
            <!-- Gold Buckle & Band -->
            <path d="M 110 93 Q 150 97 190 93" stroke="#fbbf24" stroke-width="8" fill="none" />
            <rect x="142" y="87" width="16" height="12" fill="#fde047" stroke="#0f172a" stroke-width="2" rx="2" />
          </g>
        `;
      } else {
        // Arcane Hood
        return `
          <g stroke="#0f172a" stroke-width="4">
            <path d="M 92 140 Q 90 65 150 65 Q 210 65 208 140 Q 185 85 150 85 Q 115 85 92 140 Z" fill="${palette.primary}" />
            <circle cx="150" cy="78" r="5" fill="#fde047" stroke="#0f172a" stroke-width="2" />
          </g>
        `;
      }
    }

    if (characterClass === 'Rogue') {
      // Rogue Cowl or Mask
      return `
        <g stroke="#0f172a" stroke-width="3">
          <!-- Dark hair bangs -->
          <path d="M 98 120 Q 115 80 150 80 Q 185 80 202 120 Q 170 95 150 105 Q 130 95 98 120 Z" fill="${hair.base}" />
          <!-- Rogue Mask across lower face -->
          <path d="M 115 148 Q 150 160 185 148 L 180 185 Q 150 195 120 185 Z" fill="#0f172a" stroke="#047857" stroke-width="2" />
        </g>
      `;
    }

    // Default Spiky / Cartoon Fantasy Hair
    const hairStyle = variant % 3;
    if (hairStyle === 0) {
      // Spiky Anime/Action hair
      return `
        <g stroke="#0f172a" stroke-width="4">
          <path d="M 95 125 L 80 90 L 105 85 L 100 55 L 130 65 L 150 35 L 170 65 L 200 55 L 195 85 L 220 90 L 205 125 
                   Q 175 90 150 100 Q 125 90 95 125 Z" 
                fill="${hair.base}" />
          <!-- Hair Highlights -->
          <path d="M 135 68 L 150 48 L 165 68 Z" fill="${hair.highlight}" stroke="none" />
        </g>
      `;
    } else if (hairStyle === 1) {
      // Flowing Swept Hair with Circlet
      return `
        <g stroke="#0f172a" stroke-width="3.5">
          <path d="M 95 140 Q 80 80 140 70 Q 210 70 205 140 Q 190 95 150 95 Q 110 95 95 140 Z" fill="${hair.base}" />
          <!-- Crown/Circlet -->
          <path d="M 108 108 Q 150 115 192 108" stroke="#fbbf24" stroke-width="5" fill="none" />
          <polygon points="150,102 154,110 146,110" fill="#ef4444" stroke="#0f172a" stroke-width="1.5" />
        </g>
      `;
    } else {
      // Warrior / Ranger Headband with wild hair
      return `
        <g stroke="#0f172a" stroke-width="3.5">
          <path d="M 90 120 Q 80 75 130 65 Q 170 55 210 85 Q 215 120 205 135 Q 180 95 150 95 Q 120 95 90 120 Z" fill="${hair.base}" />
          <!-- Heroic Headband -->
          <path d="M 102 112 Q 150 118 198 112" stroke="${palette.primary}" stroke-width="6" fill="none" />
          <!-- Headband knot ribbon blowing in wind -->
          <path d="M 198 112 Q 220 115 225 125" stroke="${palette.primary}" stroke-width="4" fill="none" />
        </g>
      `;
    }
  };

  // Video Game Portrait Ornate Outer Frame
  const ornateFrame = () => {
    return `
      <!-- Beveled Outer Card Border -->
      <rect x="4" y="4" width="292" height="292" rx="20" fill="none" stroke="#0f172a" stroke-width="8" />
      <rect x="8" y="8" width="284" height="284" rx="16" fill="none" stroke="#fbbf24" stroke-width="3" />
      <rect x="12" y="12" width="276" height="276" rx="12" fill="none" stroke="#78350f" stroke-width="1.5" />
      
      <!-- Ornate Corner Brackets -->
      <g fill="#fbbf24" stroke="#0f172a" stroke-width="1.5">
        <!-- Top Left -->
        <polygon points="8,8 28,8 28,14 14,14 14,28 8,28" />
        <circle cx="20" cy="20" r="3" fill="#ffffff" />
        <!-- Top Right -->
        <polygon points="292,8 272,8 272,14 286,14 286,28 292,28" />
        <circle cx="280" cy="20" r="3" fill="#ffffff" />
        <!-- Bottom Left -->
        <polygon points="8,292 28,292 28,286 14,286 14,272 8,272" />
        <circle cx="20" cy="280" r="3" fill="#ffffff" />
        <!-- Bottom Right -->
        <polygon points="292,292 272,292 272,286 286,286 286,272 292,272" />
        <circle cx="280" cy="280" r="3" fill="#ffffff" />
      </g>

      <!-- Bottom Crest Gem with Class Initials -->
      <g>
        <polygon points="150,270 168,283 150,296 132,283" fill="${palette.primary}" stroke="#fbbf24" stroke-width="2.5" />
        <polygon points="150,274 163,283 150,292 137,283" fill="${palette.accent}" opacity="0.6" />
        <text x="150" y="287" text-anchor="middle" font-family="'Cinzel', serif" font-weight="900" font-size="11" fill="#ffffff">
          ${characterClass[0]}
        </text>
      </g>
    `;
  };

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <!-- Background Radial Gradient -->
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${palette.secondary}" stop-opacity="0.9" />
          <stop offset="70%" stop-color="${palette.dark}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#090a0f" stop-opacity="1" />
        </radialGradient>

        <!-- Glow filter -->
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Base Background & Card Canvas -->
      <rect width="300" height="300" rx="20" fill="url(#bgGrad)" />

      <!-- Video Game Action / Background Particles -->
      ${bgParticles()}

      <!-- Class Background Aura & Gear Behind Head -->
      ${classBackdropAura()}

      <!-- Character Body, Shoulders & Class Armor -->
      ${classTorsoAndArmor()}

      <!-- Neck & Head Base -->
      ${headAndFace()}

      <!-- Race-Specific Ears, Horns, Tusks, Beards -->
      ${raceFeatures()}

      <!-- Facial Features, Eyes, Brows, Expressions -->
      ${facialFeatures()}

      <!-- Hair or Helmet on Top -->
      ${hairOrHelmet()}

      <!-- Video Game Outer Ornate Frame -->
      ${ornateFrame()}
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}
