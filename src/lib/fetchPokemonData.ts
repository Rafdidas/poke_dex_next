import { PokemonBasic, PokemonDetail, SpeciesDetail, TypeDetail, PokemonTypeRaw } from "@/types/pokeapi";
import { PokemonData } from "@/types/pokemon";

export async function fetchPokemonData(limit = 16, offset = 0): Promise<PokemonData[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data: { results: PokemonBasic[] } = await response.json();

  const speciesPromises = data.results.map(async (pokemon: PokemonBasic) => {
    const pokemonDetailsRes = await fetch(pokemon.url);
    const pokemonDetails: PokemonDetail = await pokemonDetailsRes.json();

    const speciesDetailsRes = await fetch(pokemonDetails.species.url);
    const speciesDetails: SpeciesDetail = await speciesDetailsRes.json();

    const types = await Promise.all(
      pokemonDetails.types.map(async (typeInfo: PokemonTypeRaw) => {
        const typeRes = await fetch(typeInfo.type.url);
        const typeDetails: TypeDetail = await typeRes.json();

        const koreanType = typeDetails.names.find((t) => t.language.name === "ko");
        const engType = typeDetails.names.find((t) => t.language.name === "en");

        return {
          name: typeInfo.type.name,
          koreanType: koreanType?.name ?? typeInfo.type.name,
          engType: engType?.name.toLowerCase() ?? typeInfo.type.name,
          url: typeInfo.type.url,
        };
      })
    );

    const pokeId = speciesDetails.id;
    const koreanName = speciesDetails.names.find((n) => n.language.name === "ko")?.name ?? pokemon.name;
    const generas = speciesDetails.genera.find((g) => g.language.name === 'ko')?.genus ?? '';
    const flavorTexts = speciesDetails.flavor_text_entries.find(
      (entry) => entry.language.name === "ko" && entry.version.name === "x"
    )?.flavor_text ?? "";

    const abilities = pokemonDetails.abilities.map((ability) => ({
      name: ability.ability.name,
      is_hidden: ability.is_hidden,
    }));

    const stats = pokemonDetails.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    }));

    const genderGroups = speciesDetails.egg_groups.map((group) => group.name);

    const poke_img =
      pokemonDetails.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ??
      pokemonDetails.sprites.other?.["official-artwork"]?.front_default ?? "";

    return {
      name: koreanName,
      species: pokemon.url,
      flavorTexts,
      generas,
      pokeId,
      poke_img,
      types,
      height: pokemonDetails.height / 10,
      weight: pokemonDetails.weight / 10,
      abilities,
      stats,
      genderRate: speciesDetails.gender_rate,
      eggGroups: genderGroups,
      evolution: [],
    };
  });

  return Promise.all(speciesPromises);
}
