import { Character, CharacterClassKey } from '../types/character';

// Templates crafted specifically to be strictly 1 or 2 sentences
type StoryTemplate = (c: Character) => string;

const CLASS_STORY_TEMPLATES: Record<CharacterClassKey, StoryTemplate[]> = {
  Warrior: [
    (c) =>
      `Born under the iron banners of a war-torn frontier, ${c.name} earned renown defending their clan's bastion against an overwhelming onslaught. Now sworn to shield the innocent, this stalwart ${c.race} ${c.characterClass} wanders the realm seeking battles of honor.`,
    (c) =>
      `After surviving the cataclysmic siege of their ancestral fortress, ${c.name} forged their armor from fallen shields to become an unbreakable bulwark for the realm.`,
    (c) =>
      `Trained since youth in the brutal sparring pits of the Iron Ridge, ${c.name} shattered an invading warlord's vanguard with unyielding resolve. Today, they march fearlessly into combat wielding their ${c.weapon} to preserve the peace.`,
    (c) =>
      `Once an elite guard in the high citadel, ${c.name} chose the path of an honorable wanderer when corrupt nobles betrayed the legion's creed. Their legendary valor now inspires all who stand against tyranny.`,
  ],
  Mage: [
    (c) =>
      `From the moment ${c.name} accidentally summoned astral starfire as a young apprentice, the High Sages recognized an unprecedented conduit of arcane power. After departing the grand academy to study forbidden planar rifts, this arcane prodigy now deciphers secrets that bend reality.`,
    (c) =>
      `Guided by cosmic whispers echoing from the Astral Sea, ${c.name} channels volatile arcane energies to reshape the mortal realm with every spell.`,
    (c) =>
      `Inheriting a glowing celestial grimoire from an ancient wizard's vault, ${c.name} unlocked runic masteries thought lost for a thousand years. Now this fearless ${c.race} ${c.characterClass} journeys to prevent a catastrophic cosmic tear.`,
    (c) =>
      `When a dark rift threatened to swallow their home sanctuary, ${c.name} unleashed a radiant torrent of sorcery that sealed the breach forever. They now travel uncharted lands unraveling primeval mysteries with their ${c.weapon}.`,
  ],
  Rogue: [
    (c) =>
      `Raised in the shadow-veiled alleys of the thieves' haven, ${c.name} mastered the art of vanishing into moonlight before the night watch could blink. After executing a daring heist against a corrupt syndicate, they roam the kingdom as an untouchable phantom.`,
    (c) =>
      `Operating in the twilight between high-stakes contracts and righteous vengeance, ${c.name} leaves only silent whispers and empty vaults in their wake.`,
    (c) =>
      `Orphaned during the midnight purge of the underworld guilds, ${c.name} sharpened their instincts and learned that shadows are the truest armor. Today, no fortress wall or locked vault can keep this cunning ${c.race} ${c.characterClass} from their mark.`,
    (c) =>
      `With fingers swifter than a viper strike and eyes attuned to hidden mechanisms, ${c.name} carved a legendary reputation across the criminal underworld. They now strike from the gloom, using their ${c.weapon} to balance the scales of fortune.`,
  ],
  Paladin: [
    (c) =>
      `Kneeling before the sacred Sun Altar at dawn, ${c.name} took the solemn Oath of Radiant Light to shield the realm from the encroaching abyss. Armed with burning faith and their ${c.weapon}, they ride into the darkest depths to bring hope to the oppressed.`,
    (c) =>
      `Empowered by a divine epiphany during the battle for the Golden Spire, ${c.name} singlehandedly turned back a tide of shadow horrors with righteous fury.`,
    (c) =>
      `Raised among ascetic monks in the high sun cloisters, ${c.name} was chosen by the dawn deities to be an emissary of divine retribution. They journey across broken kingdoms smiting darkness wherever it dares to rise.`,
  ],
  Ranger: [
    (c) =>
      `Raised alongside a pack of spectral dire wolves in the untamed boreal forest, ${c.name} can track a predator by the rustle of a single pine needle. With deadly aim and unyielding patience, this ${c.race} ${c.characterClass} patrols the borderlands to preserve the sacred balance of nature.`,
    (c) =>
      `Having survived alone in the cursed thornwoods for seven brutal winters, ${c.name} emerged as an unmatched scout who commands the wild fury of the wilderness.`,
    (c) =>
      `When royal lumberers began torching ancient dryad groves, ${c.name} took up their ${c.weapon} to defend the elder spirits. They now roam the frontiers as an elusive sentinel feared by poachers and tyrants alike.`,
  ],
  Cleric: [
    (c) =>
      `Chosen as a holy vessel during a miraculous solar eclipse, ${c.name} channels restorative prayer and celestial fury in equal measure. They wander the war-torn provinces comforting the afflicted and purging unholy corruption from the earth.`,
    (c) =>
      `Touched by divine grace in their darkest hour of despair, ${c.name} consecrated their life to mending the broken and defying the grip of death itself.`,
    (c) =>
      `Bearing sacred relics recovered from a sunken cathedral, ${c.name} acts as the living voice of celestial deities who have watched over the realm for ages. Their presence alone dispels cursed miasmas and rekindles hope in weary souls.`,
  ],
  Bard: [
    (c) =>
      `From grand royal banquets to rowdy dockside taverns, ${c.name} weaves melodies so enchanting they have ended wars and moved stone gargoyles to tears. Seeking inspiration for an immortal epic, this charming virtuoso journeys to the farthest corners of the world.`,
    (c) =>
      `Blessed with a silver tongue and rhythms inspired by fae muses, ${c.name} can charm an entire royal court or outwit an ancient dragon with a single verse.`,
    (c) =>
      `After uncovering a long-lost ballad containing ancient dragon verses, ${c.name} took up their ${c.weapon} to sing secrets back into the world. Every tavern and battlefield they grace becomes the setting for a new heroic legend.`,
  ],
  Druid: [
    (c) =>
      `Deep within the primeval groves of elder bark, ${c.name} drank from the Well of the First Seeds and heard the primordial heartbeat of the earth. Now attuned to storms and beasts, this wild ${c.race} ${c.characterClass} strikes down any who desecrate the sacred wilds.`,
    (c) =>
      `Communing directly with the spirits of tempest, stone, and flora, ${c.name} protects the ancient world from the reckless expansion of mortal kingdoms.`,
    (c) =>
      `When an alchemical blight poisoned their ancestral river, ${c.name} invoked primal spirits to cleanse the earth and renew life. They now wander the world as a fierce protector of nature's untamed equilibrium.`,
  ],
};

// Validates that a string is strictly 1 or 2 sentences
export function validateSentenceCount(text: string): boolean {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.length >= 1 && sentences.length <= 2;
}

export function generateCharacterBackstory(character: Character, seedIndex: number = 0): string {
  const templates = CLASS_STORY_TEMPLATES[character.characterClass] || CLASS_STORY_TEMPLATES.Warrior;
  
  // Pick template using character name length + seedIndex for determinism and variety
  const safeIdx = Math.abs(character.name.length + seedIndex * 7) % templates.length;
  const fallbackFn: StoryTemplate = (c) => `${c.name} is a legendary ${c.race} ${c.characterClass} who walks the realm.`;
  const templateFn = templates[safeIdx] ?? templates[0] ?? fallbackFn;
  const rawStory = templateFn(character);

  // Extra safety check: ensure strictly 1 or 2 sentences
  const sentences = rawStory.match(/[^.!?]+[.!?]+/g) || [];
  const firstSentence = sentences[0];
  const secondSentence = sentences[1];

  if (firstSentence && secondSentence) {
    return `${firstSentence.trim()} ${secondSentence.trim()}`;
  }
  if (firstSentence) {
    return firstSentence.trim();
  }
  return `${character.name} is a renowned ${character.race} ${character.characterClass} whose heroic deeds are sung across the frontier.`;
}
