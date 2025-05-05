import { PokemonBasic } from "@/types/pokeapi";

export async function fetchAllPokemonNames(): Promise<PokemonBasic[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
  if (!res.ok) throw new Error('포켓몬 이름 목록을 불러오지 못했습니다.');
  const data = await res.json();
  
  return data.results
}
// import { PokemonBasic, PokemonDetail, SpeciesDetail } from "@/types/pokeapi";

// export async function fetchAllPokemonNames(): Promise<PokemonBasic[]> {
//     const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1300");
//     if (!res.ok) throw new Error("포켓몬 이름 목록을 불러오지 못했습니다.");
//     const data = await res.json();

//     const enhancedList = await Promise.all(
//         data.results.map(async (poke: { name: string, url: string }) => {
//             try {
//                 const detailRes = await fetch(poke.url);
//                 const detailData: PokemonDetail = await detailRes.json();

//                 const speciesRes = await fetch(detailData.species.url);
//                 const speciesData: SpeciesDetail = await speciesRes.json();

//                 const korean = speciesData.names.find(
//                     (n) => n.language.name === 'ko'
//                 )?.name;

//                 return { name: poke.name, url: poke.url, korean: korean ?? "" };
//             } catch {
//                 return { name: poke.name, url: poke.url, korean: "" };
//             }
//         })
//     );

//     return enhancedList;
// }