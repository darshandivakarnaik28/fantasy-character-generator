import React, { useState, useEffect, useRef } from 'react';
import { Character, CharacterClassKey } from './types/character';
import { createRandomCharacter } from './data/fantasyData';
import { CharacterCard } from './components/CharacterCard';
import { CharacterHistory } from './components/CharacterHistory';
import { MyDeck } from './components/MyDeck';
import { generateCartoonPortraitSvg } from './utils/portraitGenerator';
import { generateCharacterBackstory } from './utils/backstoryGenerator';
import { 
  Sparkles, 
  Dices, 
  Shield, 
  SlidersHorizontal, 
  Download, 
  Check,
  RefreshCw,
  Image as ImageIcon,
  Flame,
  FlaskConical,
  BookOpen,
  Layers
} from 'lucide-react';

const DECK_STORAGE_KEY = 'fantasy_alchemist_my_deck';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [history, setHistory] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [isRolling, setIsRolling] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Portrait state
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [portraitVariant, setPortraitVariant] = useState<number>(0);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState<boolean>(false);

  // Backstory state
  const [backstory, setBackstory] = useState<string | null>(null);
  const [backstorySeed, setBackstorySeed] = useState<number>(0);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState<boolean>(false);

  // My Deck state
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isSavedToDeck, setIsSavedToDeck] = useState<boolean>(false);

  // Maintain a set of all generated names to guarantee uniqueness across rolls
  const usedNamesRef = useRef<Set<string>>(new Set());

  // Save deck to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Storage unavailable or disabled
    }
  }, [deck]);

  // Helper to generate portrait for a character
  const generatePortraitForCharacter = (char: Character, variant: number) => {
    setIsGeneratingPortrait(true);
    setTimeout(() => {
      const svgUrl = generateCartoonPortraitSvg(char, variant);
      setPortraitUrl(svgUrl);
      setIsGeneratingPortrait(false);
    }, 150);
  };

  // Helper to generate backstory for a character (strictly 1 or 2 sentences)
  const generateBackstoryForCharacter = (char: Character, seed: number) => {
    setIsGeneratingBackstory(true);
    setTimeout(() => {
      const newStory = generateCharacterBackstory(char, seed);
      setBackstory(newStory);
      setIsGeneratingBackstory(false);
    }, 150);
  };

  // Handler for "Generate Backstory" button
  const handleGenerateBackstory = () => {
    if (!character) return;
    const nextSeed = backstorySeed + 1;
    setBackstorySeed(nextSeed);
    generateBackstoryForCharacter(character, nextSeed);
  };

  // Handler for "Generate Portrait" button
  const handleGeneratePortrait = () => {
    if (!character) return;
    generatePortraitForCharacter(character, portraitVariant);
  };

  // Handler for "Regenerate Portrait" button (changes the portrait)
  const handleRegeneratePortrait = () => {
    if (!character) return;
    const nextVariant = portraitVariant + 1;
    setPortraitVariant(nextVariant);
    generatePortraitForCharacter(character, nextVariant);
  };

  // Handler for "Generate Character" button
  const handleGenerateCharacter = () => {
    setIsRolling(true);

    setTimeout(() => {
      const forcedClass = selectedClassFilter !== 'all' ? (selectedClassFilter as CharacterClassKey) : undefined;
      const newChar = createRandomCharacter(usedNamesRef.current, forcedClass);
      
      // Record name to prevent duplicates
      usedNamesRef.current.add(newChar.name);

      // Generate corresponding origin backstory for the new character (1-2 sentences)
      const newStory = generateCharacterBackstory(newChar, 0);
      newChar.backstory = newStory;

      // Update corresponding portrait for the new character
      setPortraitVariant(0);
      const newPortrait = generateCartoonPortraitSvg(newChar, 0);
      newChar.portraitUrl = newPortrait;
      setPortraitUrl(newPortrait);

      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev]);

      // Update backstory state
      setBackstory(newStory);
      setBackstorySeed(0);
      setIsSavedToDeck(false);

      setIsRolling(false);
    }, 150);
  };

  // Handler for "Save to Deck" button
  const handleSaveToDeck = () => {
    if (!character) return;

    const currentCardToSave: Character = {
      ...character,
      portraitUrl: portraitUrl || character.portraitUrl || generateCartoonPortraitSvg(character, 0),
      backstory: backstory || character.backstory || character.loreSnippet,
      health: character.health,
      mana: character.mana,
      strength: character.strength,
    };

    setDeck((prevDeck) => {
      // Check if already in deck (by id)
      const existsIndex = prevDeck.findIndex((c) => c.id === currentCardToSave.id);
      if (existsIndex >= 0) {
        const updated = [...prevDeck];
        updated[existsIndex] = currentCardToSave;
        return updated;
      }
      return [currentCardToSave, ...prevDeck];
    });

    setIsSavedToDeck(true);
    setTimeout(() => setIsSavedToDeck(false), 2500);
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  // Initialize first character, portrait, and backstory on mount
  useEffect(() => {
    if (!character) {
      const initial = createRandomCharacter(usedNamesRef.current);
      usedNamesRef.current.add(initial.name);
      
      const initialStory = generateCharacterBackstory(initial, 0);
      initial.backstory = initialStory;

      const initialPortrait = generateCartoonPortraitSvg(initial, 0);
      initial.portraitUrl = initialPortrait;

      setCharacter(initial);
      setHistory([initial]);

      setPortraitUrl(initialPortrait);
      setBackstory(initialStory);
    }
  }, []);

  const handleSelectCharacter = (selectedChar: Character) => {
    setCharacter(selectedChar);
    setPortraitVariant(0);
    const pic = selectedChar.portraitUrl || generateCartoonPortraitSvg(selectedChar, 0);
    setPortraitUrl(pic);
    
    const story = selectedChar.backstory || generateCharacterBackstory(selectedChar, 0);
    setBackstory(story);
    setBackstorySeed(0);
    setIsSavedToDeck(deck.some((c) => c.id === selectedChar.id));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleClearHistory = () => {
    if (character) {
      setHistory([character]);
    } else {
      setHistory([]);
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      deck,
      characters: history,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'fantasy_player_cards_deck.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyAllNames = () => {
    const text = history.map((c) => `${c.name} - ${c.characterClass} [HP:${c.health} MP:${c.mana} STR:${c.strength}]`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen alchemist-workbench text-amber-100 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 relative selection:bg-amber-600/40 selection:text-amber-100 overflow-x-hidden">
      
      {/* Alchemical Workbench Ambient Accents */}
      <div className="fixed top-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-0 right-0 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-900/10 pointer-events-none -z-0" />

      {/* Main Workbench Surface Container */}
      <div className="w-full max-w-3xl flex flex-col space-y-6 relative z-10">
        
        {/* Header: Ancient Alchemical Workbench Banner */}
        <header className="text-center pt-3 pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/40 bg-[#160f09]/90 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3 shadow-md backdrop-blur-xs font-fantasy">
            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
            <span>Alchemist's Transmutation Workbench</span>
            <Flame className="w-3.5 h-3.5 text-amber-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-fantasy tracking-wider text-amber-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            Fantasy Character Creator
          </h1>
          
          <p className="mt-2 text-sm sm:text-base text-amber-200/70 max-w-lg mx-auto font-serif italic">
            Forge fantasy player cards with distinct Health, Mana, and Strength potencies, then bind them to your deck.
          </p>
        </header>

        {/* Workbench Control Panel / Apparatus */}
        <div className="rounded-3xl border-2 border-amber-900/60 bg-[#140e09]/90 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.85)] backdrop-blur-md relative overflow-hidden">
          
          {/* Brass Riveted Accent Corners */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-600/80 border border-amber-950" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-600/80 border border-amber-950" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-600/80 border border-amber-950" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-600/80 border border-amber-950" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Discipline/Class Preference Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-amber-500 shrink-0" />
              <label htmlFor="class-select" className="text-xs font-bold uppercase tracking-wider text-amber-300/80 shrink-0 font-fantasy">
                Class:
              </label>
              <select
                id="class-select"
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="w-full sm:w-44 bg-[#0a0704] border border-amber-800/80 rounded-xl px-3 py-2 text-xs font-fantasy font-medium text-amber-100 focus:outline-none focus:border-amber-500 cursor-pointer shadow-inner"
              >
                <option value="all">Any Class (Random)</option>
                <option value="Warrior">Warrior</option>
                <option value="Mage">Mage</option>
                <option value="Rogue">Rogue</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Cleric">Cleric</option>
                <option value="Bard">Bard</option>
                <option value="Druid">Druid</option>
              </select>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {/* REQUIRED: The button labeled "Generate Character" */}
              <button
                onClick={handleGenerateCharacter}
                disabled={isRolling}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold font-fantasy tracking-wider text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.25)] border border-amber-400/50 cursor-pointer ${
                  isRolling 
                    ? 'bg-amber-700 text-amber-200 opacity-80 cursor-wait' 
                    : 'bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 hover:from-amber-400 hover:to-amber-700 text-stone-950 font-extrabold hover:text-black active:scale-95'
                }`}
                aria-label="Generate Character"
              >
                <Dices className={`w-4 h-4 text-stone-950 ${isRolling ? 'animate-spin' : ''}`} />
                <span>Generate Character</span>
              </button>

              {/* Quick Workbench Action Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-end">
                {/* REQUIRED: The button labeled "Save to Deck" */}
                <button
                  onClick={handleSaveToDeck}
                  disabled={!character}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold font-fantasy bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/70 text-amber-200 hover:text-white transition-colors cursor-pointer shadow-sm"
                  aria-label="Save to Deck"
                  title="Save current character to My Deck"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Save to Deck</span>
                </button>

                {/* REQUIRED: The button labeled "Generate Backstory" */}
                <button
                  onClick={handleGenerateBackstory}
                  disabled={isGeneratingBackstory || !character}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-fantasy bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/60 text-amber-200 hover:text-white transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                  aria-label="Generate Backstory"
                  title="Generate a unique origin story for current character"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Backstory</span>
                </button>

                {/* REQUIRED: The button labeled "Generate Portrait" */}
                <button
                  onClick={handleGeneratePortrait}
                  disabled={isGeneratingPortrait || !character}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-fantasy bg-[#1f150e] hover:bg-[#2e1f14] border border-amber-700/60 text-amber-300 hover:text-amber-100 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                  aria-label="Generate Portrait"
                  title="Generate portrait for current character"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Portrait</span>
                </button>

                {/* REQUIRED: The button labeled "Regenerate Portrait" */}
                <button
                  onClick={handleRegeneratePortrait}
                  disabled={isGeneratingPortrait || !character}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-fantasy bg-[#160f09] hover:bg-[#25180f] border border-amber-800/60 text-amber-200/90 hover:text-white transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                  aria-label="Regenerate Portrait"
                  title="Change portrait style for current character"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                  <span>Regenerate Portrait</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Player Card Display Altar */}
        <main className="w-full">
          {character ? (
            <div className={`transition-opacity duration-200 ${isRolling ? 'opacity-50' : 'opacity-100'}`}>
              <CharacterCard
                character={character}
                portraitUrl={portraitUrl}
                isGeneratingPortrait={isGeneratingPortrait}
                onGeneratePortrait={handleGeneratePortrait}
                onRegeneratePortrait={handleRegeneratePortrait}
                variantIndex={portraitVariant}
                backstory={backstory}
                isGeneratingBackstory={isGeneratingBackstory}
                onGenerateBackstory={handleGenerateBackstory}
                onSaveToDeck={handleSaveToDeck}
                isSavedToDeck={isSavedToDeck}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(character.id)}
              />
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-amber-900/60 p-12 text-center bg-[#120c08]/80">
              <Shield className="w-12 h-12 text-amber-700 mx-auto mb-3" />
              <h3 className="text-xl font-bold font-fantasy text-amber-300">
                The Workbench Awaits Transmutation
              </h3>
              <p className="text-sm text-amber-400/60 mt-1 mb-5 font-serif">
                Ignite the forge by clicking "Generate Character" above.
              </p>
              <button
                onClick={handleGenerateCharacter}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-fantasy text-sm transition-all cursor-pointer shadow-md"
              >
                Generate Character
              </button>
            </div>
          )}
        </main>

        {/* REQUIRED FEATURE: "My Deck" List */}
        <MyDeck
          deck={deck}
          activeId={character?.id || null}
          onSelectCard={handleSelectCharacter}
          onRemoveFromDeck={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
        />

        {/* Character Grimoire / History */}
        {history.length > 0 && (
          <section className="space-y-3">
            <CharacterHistory
              history={history}
              currentId={character?.id || null}
              onSelectCharacter={handleSelectCharacter}
              onClearHistory={handleClearHistory}
            />

            {/* Quick Workbench Utility & Ledger Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-amber-500/80 font-fantasy">
              <div className="flex items-center gap-1.5">
                <span>Alchemical champions inscribed:</span>
                <span className="font-bold text-amber-300">{usedNamesRef.current.size}</span>
                <span className="mx-1">•</span>
                <span>Deck:</span>
                <span className="font-bold text-amber-300">{deck.length} cards</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyAllNames}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{copiedAll ? 'Scroll Transcribed' : 'Transcribe Roster'}</span>
                </button>
                <span>•</span>
                <button
                  onClick={handleExportJSON}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Export Deck & Roster JSON</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Workbench Footer */}
        <footer className="text-center pt-4 pb-6 text-xs text-amber-600/60 border-t border-amber-900/40 font-serif">
          <p>Ancient Alchemist's Workbench • Formulated for fantasy worldbuilding & table-top roleplay</p>
        </footer>
      </div>
    </div>
  );
}
