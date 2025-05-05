export async function fetchAllPokemonNames() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
    if (!res.ok) throw new Error('포켓몬 이름 목록을 불러오지 못했습니다.');

    const data = await res.json();
    return data.results as { name: string; url: string }[];
}