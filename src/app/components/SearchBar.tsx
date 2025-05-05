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
            setPokemons([result]);
            setHasMore(false);
        } catch (err) {
            alert('데이터를 불러오는 데 실패했습니다.');
            console.error(err);
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