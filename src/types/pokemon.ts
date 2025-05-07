export type PokemonType = {
  name: string;
  koreanType: string;
  engType: string;
  url: string;
};

export type EvolutionChain = {
  chain: EvolutionLink;
};

export type EvolutionLink = {
  species: {
    name: string;
    url: string;
  };
  evolution_to: EvolutionLink[];
};

export type EvolutionStage = {
  name: string;
  id: number;
  image: string;
};

export type PokemonData = {
  name: string;
  species: string;
  flavorTexts: string;
  generas: string;
  pokeId: number;
  poke_img: string;
  types: {
    name: string;
    koreanType: string;
    engType: string;
    url: string;
  }[];

  height: number;
  weight: number;
  abilities: {
    name: string;
    is_hidden: boolean;
  }[];
  stats: {
    name: string;
    value: number;
  }[];
  genderRate: number; 
  eggGroups: string[];
  evolution: EvolutionStage[];
};


