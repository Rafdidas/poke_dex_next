'use client';

import { useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";

import '../styles/searchBar.style.scss';
import { fetchPokemonDataByUrl } from "@/lib/fetchPokemonDataByUrl";

export default function SearchBar() {
    const { 
        searchQuery, 
        setSearchQuery,
        allNames,
        setPokemons,
        setHasMore,
    } = usePokemonStore();

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        const match = allNames.find((poke) => 
            poke.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (!match) {
            alert('해당 포켓몬을 찾을 수 없습니다.');
            return;
        }

        try {
        setLoading(true);
        const result = await fetchPokemonDataByUrl(match.url);
        console.log("🎯 불러온 포켓몬:", result);
        setPokemons([result]);
        setHasMore(false);
        } catch (error) {
        console.error("❌ 포켓몬 fetch 실패:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <input
                className='poke_search_main'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="포켓몬 이름을 입력해주세요."
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? '검색 중...' : '검색'}
            </button>
        </div>
    )
}