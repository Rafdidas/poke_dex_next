export async function fetchEvolutionChainByUrl(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('진화 체인 데이터를 불러오지 못했습니다.');
    return await res.json();
}