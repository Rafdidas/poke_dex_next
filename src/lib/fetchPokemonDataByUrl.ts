import { PokemonDetail, PokemonTypeRaw, SpeciesDetail, TypeDetail } from "@/types/pokeapi";
import { PokemonData } from "@/types/pokemon";

export async function fetchPokemonDataByUrl(url: string): Promise<PokemonData> {
    const pokemonDetailsRes = await fetch(url);
    const pokemonDetails: PokemonDetail = await pokemonDetailsRes.json();

    const speciesDetailRes = await fetch(pokemonDetails.species.url);
    const speciesDetails: SpeciesDetail = await speciesDetailRes.json();

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
    const koreanName = speciesDetails.names.find((n) => n.language.name === 'ko')?.name;
    const generas = speciesDetails.genera.find((g) => g.language.name === 'ko')?.genus;
    const flavorTexts = speciesDetails.flavor_text_entries.find(
        (entry) => entry.language.name === 'ko' && entry.version.name === 'x'
    )?.flavor_text;
    
    const poke_img =
        pokemonDetails.sprites.versions?.['generation-v']?.['black-white']?.animated
            ?.front_default ||
        pokemonDetails.sprites.other?.['official-artwork']?.front_default ||
        "";

    return {
        name: koreanName ?? pokemonDetails.name,
        species: url,
        flavorTexts: flavorTexts ?? '',
        generas: generas ?? '',
        pokeId,
        poke_img,
        types,
    } satisfies PokemonData;
}