import { EvolutionChain } from "@/types/pokemon";

export async function fetchPokemonEvolutionChain(url: string): Promise<EvolutionChain> {
    const res = await fetch(url);
    if (!res.ok) throw new Error("진화 경로를 불러오는 데 실패했습니다.");

    const data: EvolutionChain = await res.json();
    return data;
}