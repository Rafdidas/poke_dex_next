export type PokemonBasic = {
  name: string;
  url: string;
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
  sprites: {
    versions: {
      ['generation-v']: {
        ['black-white']: {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  types: PokemonTypeRaw[];
};

export type SpeciesDetail = {
  id: number;
  names: TypeName[];
  genera: {
    language: { name: string };
    genus: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
};
