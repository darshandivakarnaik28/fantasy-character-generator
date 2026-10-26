import React from 'react';
import { Character, CharacterClassKey } from '../types/character';
import { CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { Trash2, BookMarked } from 'lucide-react';

interface CharacterHistoryProps {
  history: Character[];
  currentId: string | null;
  onSelectCharacter: (char: Character) => void;
  onClearHistory: () => void;
}

export const CharacterHistory: React.FC<CharacterHistoryProps> = ({
  history,
  currentId,
  onSelectCharacter,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border-2 border-amber-900/60 bg-[#140e09]/90 p-5 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-900/40">
        <div className="flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 font-fantasy">
            Grimoire of Summoned Champions ({history.length})
          </h3>
        </div>
        {history.length > 1 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-amber-500/70 hover:text-amber-300 transition-colors font-fantasy cursor-pointer"
            title="Purge Grimoire"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Ledger</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {history.map((char) => {
          const isSelected = char.id === currentId;
          const classMeta = CLASSES[char.characterClass as CharacterClassKey];

          return (
            <button
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-900/40 text-amber-100 shadow-md ring-1 ring-amber-500/50'
                  : 'border-amber-950/80 bg-[#0d0905]/80 hover:border-amber-800 hover:bg-[#1f150e] text-amber-200/80'
              }`}
            >
              <div className={`p-2 rounded-lg bg-[#080503] border border-amber-700/50 shrink-0`}>
                <ClassIcon 
                  characterClass={char.characterClass} 
                  className={`w-4 h-4 text-amber-400`} 
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold truncate text-amber-100 font-ancient-name tracking-wide">
                  {char.name}
                </div>
                <div className="text-xs text-amber-400/70 flex items-center gap-1.5 truncate font-fantasy">
                  <span className="text-amber-400">{char.characterClass}</span>
                  <span>•</span>
                  <span>{char.race}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
