import { fetchPokemonDataByUrl } from "./fetchPokemonDataByUrl";

export async function fetchPokemonDataById(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return await fetchPokemonDataByUrl(url);
}