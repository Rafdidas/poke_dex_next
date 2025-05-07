import { PokemonDetail, SpeciesDetail, TypeDetail, PokemonTypeRaw } from "@/types/pokeapi";
import { EvolutionChain, PokemonData } from "@/types/pokemon";

export async function fetchPokemonDetailById(id: number): Promise<PokemonData> {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData: PokemonDetail = await pokemonRes.json();

    const speciesRes = await fetch(pokemonData.species.url);
    const speciesData: SpeciesDetail = await speciesRes.json();

    const types = await Promise.all(
        pokemonData.types.map(async (typeInfo: PokemonTypeRaw) => {
            const typeRes = await fetch(typeInfo.type.url);
            const typeData: TypeDetail = await typeRes.json();

            const korean = typeData.names.find((n) => n.language.name === "ko")?.name;
            const english = typeData.names.find((n) => n.language.name === "en")?.name;

            return {
                name: typeInfo.type.name,
                koreanType: korean ?? typeInfo.type.name,
                engType: english?.toLowerCase() ?? typeInfo.type.name,
                url: typeInfo.type.url,
            };
        })
    );

    const abilities = pokemonData.abilities.map((ability) => ({
        name: ability.ability.name,
        is_hidden: ability.is_hidden,
    }));

    const stats = pokemonData.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
    }));

    const height = pokemonData.height / 10; // m 단위
    const weight = pokemonData.weight / 10; // kg 단위

    const koreanName = speciesData.names.find((n) => n.language.name === "ko")?.name ?? pokemonData.name;
    const flavorText = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "ko" && entry.version.name === "x"
    )?.flavor_text ?? "";
    const generas = speciesData.genera.find((g) => g.language.name === 'ko')?.genus ?? "";

    const genderGroups = speciesData.egg_groups.map((group) => group.name);

    // 진화 정보
    const evolution: PokemonData["evolution"] = [];
    try {
        const evoChainRes = await fetch(speciesData.evolution_chain.url);
        const evoChainData: EvolutionChain = await evoChainRes.json();

        let current = evoChainData.chain;

        while (current) {
            const evoName = current.species.name;

            const idMatch = current.species.url.match(/\/(\d+)\/$/);
            const evoId = idMatch ? parseInt(idMatch[1], 10) : null;

            //const korean = current.species.name;

            if (evoId) {
                const evoSpeciesRes = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${evoId}`
                );
                const evoSpeciesData: SpeciesDetail = await evoSpeciesRes.json();
                const koName = 
                    evoSpeciesData.names.find((n) => n.language.name === "ko")?.name ?? evoName;

                evolution.push({
                    name: koName,
                    id: evoId,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`,
                });
            }

            if (current.evolution_to?.length > 0) {
                current = current.evolution_to[0];
            } else {
                break;
            }
        }
    } catch (error) {
        console.warn("진화 정보 로드 실패:", error);
    }

    return {
        pokeId: id,
        name: koreanName,
        flavorTexts: flavorText,
        generas,
        species: pokemonData.species.url,
        poke_img:
        pokemonData.sprites.versions?.["generation-v"]?.["black-white"]
            ?.animated?.front_default ??
        pokemonData.sprites.other?.["official-artwork"]?.front_default ??
        "",
        types,
        height,
        weight,
        abilities,
        stats,
        genderRate: speciesData.gender_rate,
        eggGroups: genderGroups,
        evolution,
    };

}