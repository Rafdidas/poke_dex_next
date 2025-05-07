export type PokemonBasic = {
  name: string;
  url: string;
  korean: string;
};

export type TypeName = {
  language: { name: string };
  name: string;
};

export type TypeDetail = {
  names: TypeName[];
};

export type PokemonTypeRaw = {
  type: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  name: string;
  species: { url: string };
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    versions?: {
      ["generation-v"]?: {
        ["black-white"]?: {
          animated?: {
            front_default?: string;
          };
        };
      };
    };
    other?: {
      ["official-artwork"]?: {
        front_default?: string;
      };
    };
  };
  types: PokemonTypeRaw[];
};

export type SpeciesDetail = {
  id: number;
  names: TypeName[];
  gender_rate: number;
  egg_groups: {
    name: string;
  }[];
  genera: {
    language: { name: string };
    genus: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  evolution_chain: {
    url: string;
  };
};

export type EvolutionChainResponse = {
  chain: EvolutionNode;
};

export type EvolutionNode = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
};