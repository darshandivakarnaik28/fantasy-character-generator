import React from 'react';
import { Character } from '../types/character';
import { CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { 
  Heart, 
  Sparkles, 
  Sword, 
  Trash2, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeId: string | null;
  onSelectCard: (char: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  activeId,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  return (
    <section className="rounded-3xl border-2 border-amber-900/60 bg-[#140e09]/95 p-6 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.9)] relative overflow-hidden">
      
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-900/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-fantasy text-amber-200 tracking-wider flex items-center gap-2">
              <span>My Deck</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
              </span>
            </h3>
            <p className="text-xs text-amber-400/60 font-serif">
              Inscribed fantasy player cards ready for your deck
            </p>
          </div>
        </div>

        {deck.length > 0 && (
          <button
            onClick={onClearDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-900/50 bg-[#1c120a] hover:bg-[#2a1b0e] text-xs font-fantasy text-amber-400 hover:text-red-300 transition-colors cursor-pointer self-start sm:self-auto"
            title="Clear all cards from My Deck"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Deck</span>
          </button>
        )}
      </div>

      {/* Deck Cards Grid */}
      {deck.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-amber-900/40 p-8 text-center bg-[#0d0905]/60">
          <Layers className="w-10 h-10 text-amber-700/60 mx-auto mb-2" />
          <h4 className="text-sm font-bold font-fantasy text-amber-300/80">
            Your Deck is Currently Empty
          </h4>
          <p className="text-xs text-amber-400/60 mt-1 max-w-sm mx-auto font-serif">
            Generate or customize any champion above, then click <strong className="text-amber-300">"Save to Deck"</strong> to bind their player card to your permanent collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {deck.map((card) => {
            const classMeta = CLASSES[card.characterClass];
            const isActive = card.id === activeId;

            return (
              <div
                key={card.id}
                className={`group relative rounded-2xl border-2 transition-all duration-200 overflow-hidden bg-[#18110b] shadow-xl flex flex-col justify-between ${
                  isActive
                    ? 'border-amber-400 ring-2 ring-amber-500/40 shadow-amber-500/10'
                    : 'border-amber-800/60 hover:border-amber-600/80'
                }`}
              >
                {/* Card Corner Ornaments */}
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-amber-600/70 border border-amber-950 z-10" />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600/70 border border-amber-950 z-10" />

                {/* Card Top: Name & Class */}
                <div className="p-4 pb-2 border-b border-amber-900/30 bg-[#100b07]/80 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase font-bold text-amber-500 tracking-wider font-fantasy truncate">
                      {card.title}
                    </div>
                    <h4 className="text-xl font-black font-ancient-name text-amber-100 truncate tracking-wide">
                      {card.name}
                    </h4>
                    <div className="text-xs text-amber-400/80 font-fantasy mt-0.5">
                      <span>{card.race}</span>
                    </div>
                  </div>

                  {/* Class Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b0805] border border-amber-700/50 shrink-0">
                    <ClassIcon characterClass={card.characterClass} className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold font-fantasy text-amber-300">{card.characterClass}</span>
                  </div>
                </div>

                {/* Card Middle: Portrait & Stats */}
                <div className="p-4 flex gap-4 items-center">
                  {/* Portrait */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-600/50 bg-[#090604] shrink-0 shadow-md">
                    {card.portraitUrl ? (
                      <img
                        src={card.portraitUrl}
                        alt={`Portrait of ${card.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-600 text-xs font-fantasy text-center p-1">
                        No Portrait
                      </div>
                    )}
                  </div>

                  {/* Player Card Stats: Health, Mana, Strength */}
                  <div className="flex-1 space-y-2">
                    {/* Health */}
                    <div className="flex items-center justify-between text-xs px-2.5 py-1 rounded-lg bg-[#0f0b07] border border-red-900/50">
                      <div className="flex items-center gap-1.5 text-red-300 font-bold font-fantasy">
                        <Heart className="w-3.5 h-3.5 text-red-500" />
                        <span>Health:</span>
                      </div>
                      <span className="font-mono font-bold text-red-200">{card.health} HP</span>
                    </div>

                    {/* Mana */}
                    <div className="flex items-center justify-between text-xs px-2.5 py-1 rounded-lg bg-[#0f0b07] border border-blue-900/50">
                      <div className="flex items-center gap-1.5 text-blue-300 font-bold font-fantasy">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Mana:</span>
                      </div>
                      <span className="font-mono font-bold text-blue-200">{card.mana} MP</span>
                    </div>

                    {/* Strength */}
                    <div className="flex items-center justify-between text-xs px-2.5 py-1 rounded-lg bg-[#0f0b07] border border-amber-900/50">
                      <div className="flex items-center gap-1.5 text-amber-300 font-bold font-fantasy">
                        <Sword className="w-3.5 h-3.5 text-amber-400" />
                        <span>Strength:</span>
                      </div>
                      <span className="font-mono font-bold text-amber-200">{card.strength} STR</span>
                    </div>
                  </div>
                </div>

                {/* Card Backstory */}
                <div className="px-4 pb-3">
                  <div className="p-3 rounded-xl bg-[#0e0906] border border-amber-900/40 text-xs font-serif italic text-amber-200/90 leading-relaxed max-h-20 overflow-y-auto">
                    "{card.backstory || card.loreSnippet}"
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-4 py-2.5 border-t border-amber-900/40 bg-[#0f0b07] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCard(card)}
                    className="flex items-center gap-1.5 text-xs font-bold font-fantasy text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>View on Altar</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromDeck(card.id)}
                    className="p-1.5 rounded-lg text-amber-600 hover:text-red-400 hover:bg-[#1f150e] transition-colors cursor-pointer"
                    title="Remove card from deck"
                    aria-label="Remove from deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
