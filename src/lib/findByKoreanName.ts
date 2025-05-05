import { PokemonBasic, SpeciesDetail } from "@/types/pokeapi";

export async function findByKoreanName(
    keyword: string,
    allNames: PokemonBasic[]
): Promise<PokemonBasic | undefined> {
    for (const poke of allNames) {
        try {
            const detailRes = await fetch(poke.url);
            const detailData = await detailRes.json();
            const speciesRes = await fetch(detailData.species.url);
            const speciesData: SpeciesDetail = await speciesRes.json();

            const korean = speciesData.names.find(
                (n) => n.language.name === 'ko'
            )?.name;

            if (korean && korean === keyword.trim()) {
                return poke;
            }
        } catch (error) {
            console.error("❌ 한글 이름 조회 실패:", poke.name, error);
        }
    }

    return undefined;
}