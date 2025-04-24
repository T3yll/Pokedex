// Interface pour les types de Pokémon
export interface Type {
    name: string;
    image: string;
  }
  
  // Interface pour les talents de Pokémon
  export interface Talent {
    name: string;
    tc: boolean; // talent caché
  }
  
  // Interface pour les résistances
  export interface Resistance {
    name: string;
    multiplier: number;
  }
  
  // Interface pour les évolutions précédentes
  export interface PreviousEvolution {
    pokedex_id: number;
    name: string;
    condition?: string;
  }
  
  // Interface pour les évolutions suivantes
  export interface NextEvolution {
    pokedex_id?: number;
    name: string;
    condition?: string;
  }
  
  // Interface pour les méga-évolutions
  export interface MegaEvolution {
    name: string;
  }
  
  // Interface pour les évolutions
  export interface Evolution {
    pre: PreviousEvolution[] | null;
    next: NextEvolution[] | null;
    mega: MegaEvolution[] | null;
  }
  
  // Interface pour les statistiques
  export interface Stats {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  }
  
  // Interface pour les noms dans différentes langues
  export interface Names {
    fr: string;
    en: string;
    jp?: string;
  }
  
  // Interface pour les sprites
  export interface Sprites {
    regular: string;
    shiny?: string;
    gmax?: string | null;
  }
  
  // Interface principale pour un Pokémon
  export interface Pokemon {
    pokedex_id: number;
    generation: number;
    category: string;
    name: Names;
    sprites: Sprites;
    types: Type[];
    talents: Talent[];
    stats: Stats;
    resistances?: Resistance[];
    evolution: Evolution;
    height: string;
    weight: string;
    egg_groups?: string[];
    sexe?: {
      male: number;
      female: number;
    };
    catch_rate?: number;
    level_100?: number;
    formes?: any | null;
  }