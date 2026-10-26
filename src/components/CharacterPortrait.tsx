import React from 'react';
import { Character } from '../types/character';
import { Sparkles, RefreshCw, Flame } from 'lucide-react';

interface CharacterPortraitProps {
  character: Character;
  portraitUrl: string | null;
  isGenerating: boolean;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  variantIndex: number;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  portraitUrl,
  isGenerating,
  onGeneratePortrait,
  onRegeneratePortrait,
  variantIndex,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Alchemist Scrying Mirror / Portrait Frame */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-600/60 bg-[#0a0705] shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-center group ring-1 ring-amber-400/20">
        
        {/* Brass Riveted Corners */}
        <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 border border-amber-950 z-20 shadow-xs" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 border border-amber-950 z-20 shadow-xs" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 border border-amber-950 z-20 shadow-xs" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 border border-amber-950 z-20 shadow-xs" />

        {portraitUrl ? (
          <div className="relative w-full h-full">
            <img
              src={portraitUrl}
              alt={`Portrait of ${character.name} the ${character.characterClass}`}
              data-testid="character-portrait"
              className={`w-full h-full object-cover transition-all duration-300 ${
                isGenerating ? 'scale-95 blur-xs opacity-50' : 'scale-100 group-hover:scale-105'
              }`}
            />
            {/* Alchemical Formula Badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#18110b]/90 border border-amber-600/60 text-[10px] font-bold font-fantasy text-amber-300 uppercase tracking-wider backdrop-blur-xs shadow-md">
              Sigil #{variantIndex + 1}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full border border-amber-700/50 bg-[#140e0a] flex items-center justify-center text-amber-500 mb-2 shadow-inner">
              <Flame className="w-6 h-6 animate-pulse text-amber-500" />
            </div>
            <span className="text-xs font-semibold font-fantasy text-amber-200">Awaiting Infusion</span>
            <span className="text-[10px] text-amber-400/60 mt-0.5">Click generate below</span>
          </div>
        )}

        {/* Alchemical Transmutation Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-[#0c0805]/85 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 z-20">
            <RefreshCw className="w-7 h-7 text-amber-400 animate-spin" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 font-fantasy">
              Transmuting...
            </span>
          </div>
        )}
      </div>

      {/* REQUIRED FUNCTIONAL BUTTONS: "Generate Portrait" & "Regenerate Portrait" */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
        <button
          onClick={onGeneratePortrait}
          disabled={isGenerating}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-fantasy tracking-wider bg-gradient-to-b from-amber-600/30 to-amber-950/60 hover:from-amber-600/50 hover:to-amber-900/80 text-amber-200 border border-amber-500/50 hover:border-amber-400 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          aria-label="Generate Portrait"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Generate Portrait</span>
        </button>

        <button
          onClick={onRegeneratePortrait}
          disabled={isGenerating}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-fantasy tracking-wider bg-[#1d140e] hover:bg-[#281b13] text-amber-100 hover:text-white border border-amber-700/50 hover:border-amber-500 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          aria-label="Regenerate Portrait"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 shrink-0 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate Portrait</span>
        </button>
      </div>
    </div>
  );
};
