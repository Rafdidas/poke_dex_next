import { EvolutionChain, EvolutionStage, EvolutionLink } from "@/types/pokemon";

export function parseEvolutionChain(chain: EvolutionChain): EvolutionStage[] {
    const result: EvolutionStage[] = [];

    const traverse = (node: EvolutionLink) => {
        const id = extractIdFromUrl(node.species.url);
        result.push({ name: node.species.name, id, image: "" });

        if (node.evolution_to && node.evolution_to.length > 0) {
            node.evolution_to.forEach((evo: EvolutionLink) => traverse(evo));
        }
    };

    traverse(chain.chain);
    return result;
}

function extractIdFromUrl(url: string): number {
    const match = url.match(/pokemon-species\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
}
