import { PokemonDetail, SpeciesDetail, TypeDetail, PokemonTypeRaw } from "@/types/pokeapi";
import { PokemonData } from "@/types/pokemon";

export async function fetchPokemonDataByUrl(url: string): Promise<PokemonData> {
  const pokemonDetailsRes = await fetch(url);
  const pokemonDetails: PokemonDetail = await pokemonDetailsRes.json();

  const speciesDetailRes = await fetch(pokemonDetails.species.url);
  const speciesDetails: SpeciesDetail = await speciesDetailRes.json();

  // 진화 데이터 파싱 + 이미지 fetch
  // const evolutionChainRes = await fetch(speciesDetails.evolution_chain.url);
  // const evolutionChainData = await evolutionChainRes.json();
  // const basicEvolutions = parseEvolutionChain(evolutionChainData);

  // const evolution = await Promise.all(
  //   basicEvolutions.map(async (evo) => {
  //     const evoRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.id}`);
  //     const evoData = await evoRes.json();
  //     return {
  //       id: evo.id,
  //       name: evo.name,
  //       image: evoData.sprites.other["official-artwork"].front_default,
  //     };
  //   })
  // );

  const types = await Promise.all(
    pokemonDetails.types.map(async (typeInfo: PokemonTypeRaw) => {
      const typeRes = await fetch(typeInfo.type.url);
      const typeDetails: TypeDetail = await typeRes.json();

      const koreanType = typeDetails.names.find((t) => t.language.name === 'ko');
      const engType = typeDetails.names.find((t) => t.language.name === 'en');

      return {
        name: typeInfo.type.name,
        koreanType: koreanType?.name ?? typeInfo.type.name,
        engType: engType?.name.toLowerCase() ?? typeInfo.type.name,
        url: typeInfo.type.url,
      };
    })
  );

  const pokeId = speciesDetails.id;
  const koreanName = speciesDetails.names.find((n) => n.language.name === "ko")?.name ?? pokemonDetails.name;
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
    species: url,
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
}
