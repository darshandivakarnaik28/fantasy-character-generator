import React, { useState } from 'react';
import { Character } from '../types/character';
import { CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { CharacterPortrait } from './CharacterPortrait';
import { 
  Heart, 
  Sparkles, 
  Sword, 
  Shield, 
  Zap, 
  Brain, 
  Smile, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck,
  Flame,
  Scroll,
  BookOpen,
  Layers
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  portraitUrl: string | null;
  isGeneratingPortrait: boolean;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  variantIndex: number;
  backstory: string | null;
  isGeneratingBackstory: boolean;
  onGenerateBackstory: () => void;
  onSaveToDeck: () => void;
  isSavedToDeck: boolean;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  portraitUrl,
  isGeneratingPortrait,
  onGeneratePortrait,
  onRegeneratePortrait,
  variantIndex,
  backstory,
  isGeneratingBackstory,
  onGenerateBackstory,
  onSaveToDeck,
  isSavedToDeck,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const [copied, setCopied] = useState(false);
  const classInfo = CLASSES[character.characterClass];

  const handleCopy = () => {
    const summary = `=== FANTASY PLAYER CARD ===\nName: ${character.name} ${character.title}\nClass: ${character.characterClass}\nRace: ${character.race}\nStats: Health ${character.health} HP | Mana ${character.mana} MP | Strength ${character.strength} STR\nBackstory: "${backstory || character.backstory || character.loreSnippet}"\nWeapon: ${character.weapon}\nAbility: ${character.signatureAbility}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const secondaryStats = [
    { label: 'AGI', full: 'Agility', val: character.stats.agility, icon: Zap },
    { label: 'INT', full: 'Intellect', val: character.stats.intellect, icon: Brain },
    { label: 'VIT', full: 'Vitality', val: character.stats.vitality, icon: Shield },
    { label: 'CHA', full: 'Charisma', val: character.stats.charisma, icon: Smile },
  ];

  return (
    <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#b8863b] via-[#65431f] to-[#3a200e] shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
      
      {/* Outer Fantasy Card Frame with Gilded Filigree Edges */}
      <div className="relative rounded-[22px] border-2 border-amber-500/70 bg-[#160f09] overflow-hidden">
        
        {/* Ancient Parchment & Ambient Candlelight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#130d08] to-[#080503] pointer-events-none" />

        {/* Ornate Card Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none border-t-2 border-l-2 border-amber-400 rounded-tl-xl m-1.5 z-20" />
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-amber-400 rounded-tr-xl m-1.5 z-20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none border-b-2 border-l-2 border-amber-400 rounded-bl-xl m-1.5 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none border-b-2 border-r-2 border-amber-400 rounded-br-xl m-1.5 z-20" />

        {/* Card Header: Classification & Toolbar */}
        <div className="relative z-10 flex items-center justify-between border-b-2 border-amber-800/60 px-6 py-3.5 bg-[#0e0905]/90">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-amber-300 font-fantasy">
            <span className="text-amber-500">✦</span>
            <span>PLAYER CARD</span>
            <span className="text-amber-700">•</span>
            <span className="text-amber-200/90">{character.race}</span>
            <span className="text-amber-700 hidden sm:inline">•</span>
            <span className="text-amber-400/60 hidden sm:inline text-[11px] font-mono">{character.alignment}</span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(character.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isFavorite 
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300' 
                    : 'border-amber-900/60 bg-[#1a120b] text-amber-400/70 hover:text-amber-200 hover:border-amber-700 hover:bg-[#251a10]'
                }`}
                title={isFavorite ? 'Remove from Grimoire' : 'Inscribe in Grimoire'}
                aria-label="Save character"
              >
                {isFavorite ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-800/60 bg-[#1c130c] hover:bg-[#2b1c11] text-xs font-fantasy font-medium text-amber-200 hover:text-white transition-colors cursor-pointer shadow-sm"
              title="Copy player card data"
              aria-label="Copy character sheet"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Inscribed</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Card</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card Body: Name, Class & Portrait */}
        <div className="relative z-10 px-6 pt-6 pb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Character Portrait with Generate & Regenerate Portrait buttons */}
            <div className="shrink-0 w-full sm:w-auto flex justify-center">
              <CharacterPortrait
                character={character}
                portraitUrl={portraitUrl}
                isGenerating={isGeneratingPortrait}
                onGeneratePortrait={onGeneratePortrait}
                onRegeneratePortrait={onRegeneratePortrait}
                variantIndex={variantIndex}
              />
            </div>

            {/* Character Name & Class Information */}
            <div className="flex-1 w-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-bold font-fantasy flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{character.title}</span>
                  </div>
                  
                  {/* Character Name - Stylized Fantasy Font & Prominent */}
                  <h2 className="text-4xl sm:text-5xl font-black font-ancient-name tracking-wider text-amber-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)] leading-tight">
                    {character.name}
                  </h2>
                </div>

                {/* Character Class - High visibility card badge */}
                <div className="flex items-center gap-3 shrink-0 bg-[#0d0905] p-2.5 rounded-2xl border-2 border-amber-600/60 shadow-inner">
                  <div className="p-3 rounded-xl border border-amber-500/50 bg-gradient-to-br from-amber-700/40 to-[#120c08] shadow-md">
                    <ClassIcon 
                      characterClass={character.characterClass} 
                      className="w-7 h-7 text-amber-300" 
                    />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 font-fantasy">Class</div>
                    <div className="text-xl font-bold font-fantasy tracking-wider text-amber-200">
                      {character.characterClass}
                    </div>
                  </div>
                </div>
              </div>

              {/* Class Tagline */}
              <p className="mt-3.5 text-sm text-amber-200/80 italic font-serif leading-relaxed border-l-2 border-amber-600/50 pl-3">
                "{classInfo.tagline}"
              </p>

              {/* Armament & Ability Line */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="px-3 py-1.5 rounded-lg bg-[#0c0805] border border-amber-900/60 text-amber-200/90 font-fantasy flex items-center gap-2">
                  <Sword className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Armament: <strong className="text-amber-100 font-bold">{character.weapon}</strong></span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#0c0805] border border-amber-900/60 text-amber-200/90 font-fantasy flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">Ability: <strong className="text-amber-100 font-bold">{character.signatureAbility}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CORE STATS BAR: Health, Mana, and Strength (Prominently displayed) */}
        <div className="relative z-10 border-t-2 border-amber-800/60 bg-[#0c0804] px-6 py-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center justify-between font-fantasy">
            <span className="flex items-center gap-1.5">
              <span>✦</span>
              <span>Combat Potencies & Attributes</span>
            </span>
            <span className="text-[11px] font-normal text-amber-400/60 font-serif">Alchemically generated stats</span>
          </div>

          {/* Primary Trio: HEALTH, MANA, STRENGTH */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* HEALTH STAT */}
            <div className="rounded-2xl border-2 border-red-600/50 bg-gradient-to-br from-red-950/40 to-[#140808] p-3.5 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-600/60 text-red-400">
                  <Heart className="w-5 h-5 fill-red-500/20" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-red-300 font-fantasy">Health</div>
                  <div className="text-2xl font-black font-fantasy text-red-100">{character.health} <span className="text-xs text-red-400 font-normal">HP</span></div>
                </div>
              </div>
              <div className="w-16 h-2 bg-red-950 rounded-full border border-red-800/60 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{ width: `${Math.min(100, (character.health / 160) * 100)}%` }} />
              </div>
            </div>

            {/* MANA STAT */}
            <div className="rounded-2xl border-2 border-blue-600/50 bg-gradient-to-br from-blue-950/40 to-[#080d14] p-3.5 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-600/60 text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300 font-fantasy">Mana</div>
                  <div className="text-2xl font-black font-fantasy text-blue-100">{character.mana} <span className="text-xs text-blue-400 font-normal">MP</span></div>
                </div>
              </div>
              <div className="w-16 h-2 bg-blue-950 rounded-full border border-blue-800/60 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: `${Math.min(100, (character.mana / 150) * 100)}%` }} />
              </div>
            </div>

            {/* STRENGTH STAT */}
            <div className="rounded-2xl border-2 border-amber-600/50 bg-gradient-to-br from-amber-950/40 to-[#141008] p-3.5 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-600/60 text-amber-400">
                  <Sword className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300 font-fantasy">Strength</div>
                  <div className="text-2xl font-black font-fantasy text-amber-100">{character.strength} <span className="text-xs text-amber-400 font-normal">STR</span></div>
                </div>
              </div>
              <div className="w-16 h-2 bg-amber-950 rounded-full border border-amber-800/60 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" style={{ width: `${Math.min(100, (character.strength / 25) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Secondary stats overview */}
          <div className="grid grid-cols-4 gap-2 mt-2.5">
            {secondaryStats.map((st) => (
              <div key={st.label} className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#140e08] border border-amber-900/40 text-[11px]">
                <span className="text-amber-400/80 font-fantasy">{st.label}</span>
                <span className="font-mono font-bold text-amber-200">{st.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BACKSTORY SECTION: Dedicated 1-2 sentence origin story with Generate Backstory button */}
        <div className="relative z-10 border-t-2 border-amber-800/60 bg-[#120d08] px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-fantasy">
                Character Origin & Backstory
              </h3>
            </div>

            {/* REQUIRED BUTTON: "Generate Backstory" */}
            <button
              onClick={onGenerateBackstory}
              disabled={isGeneratingBackstory}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-fantasy tracking-wider bg-gradient-to-r from-amber-600/30 to-amber-950/60 hover:from-amber-600/50 hover:to-amber-900/80 text-amber-200 hover:text-white border border-amber-500/50 hover:border-amber-400 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              aria-label="Generate Backstory"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Generate Backstory</span>
            </button>
          </div>

          {/* Displayed Backstory (1-2 sentences) */}
          <div className="rounded-2xl border border-amber-800/50 bg-[#080503]/80 p-4 shadow-inner">
            <p className="text-sm sm:text-base text-amber-100/90 font-serif leading-relaxed italic">
              "{backstory || character.backstory || character.loreSnippet}"
            </p>
          </div>
        </div>

        {/* CARD FOOTER & REQUIRED "Save to Deck" ACTION BUTTON */}
        <div className="relative z-10 border-t-2 border-amber-800/60 bg-[#0d0805] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-amber-400/70 font-fantasy flex items-center gap-1.5">
            <Scroll className="w-4 h-4 text-amber-500" />
            <span>Alchemically bound to player codex</span>
          </div>

          {/* REQUIRED BUTTON: "Save to Deck" */}
          <button
            onClick={onSaveToDeck}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold font-fantasy tracking-wider text-sm transition-all duration-200 shadow-lg border cursor-pointer active:scale-95 ${
              isSavedToDeck
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400/60 shadow-emerald-900/30'
                : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-neutral-950 font-extrabold border-amber-400/80 shadow-amber-900/40'
            }`}
            aria-label="Save to Deck"
          >
            {isSavedToDeck ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Saved to Deck!</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 text-neutral-950" />
                <span>Save to Deck</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
