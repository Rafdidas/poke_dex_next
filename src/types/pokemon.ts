export type PokemonType = {
  name: string;
  koreanType: string;
  engType: string;
  url: string;
};

export type PokemonData = {
  name: string;
  species: string;
  flavorTexts: string;
  generas: string;
  pokeId: number;
  poke_img: string;
  types: PokemonType[];
};