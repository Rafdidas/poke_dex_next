import { PokemonBasic, PokemonDetail, PokemonTypeRaw, SpeciesDetail, TypeDetail } from "@/types/pokeapi";
import { PokemonData } from "@/types/pokemon";

export async function fetchPokemonData(limit = 16, offset = 0): Promise<PokemonData[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data: { results: PokemonBasic[] } = await response.json();

    const speciesPromises = data.results.map(async (pokemon: PokemonBasic) => {
        const pokemonDetailsRespnse = await fetch(pokemon.url);
        const pokemonDetails: PokemonDetail = await pokemonDetailsRespnse.json();

        const speciesDetailResponse = await fetch(pokemonDetails.species.url);
        const speciesDetails: SpeciesDetail = await speciesDetailResponse.json();

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
        )


        const pokeId = speciesDetails.id;
        const koreanName = speciesDetails.names.find((n) => n.language.name === 'ko')?.name;
        const generas = speciesDetails.genera.find((g) => g.language.name === 'ko')?.genus;
        const flavorTexts = speciesDetails.flavor_text_entries.find(
            (entry) => entry.language.name === 'ko' && entry.version.name === 'x'
        )?.flavor_text;
        
        const poke_img = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;

        return {
            name: koreanName ?? pokemon.name,
            species: pokemon.url,
            flavorTexts: flavorTexts ?? '',
            generas: generas ?? '',
            pokeId,
            poke_img,
            types,
        } satisfies PokemonData;
    });

    return Promise.all(speciesPromises);
}