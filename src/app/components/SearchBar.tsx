'use client';

import { useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";

import '../styles/searchBar.style.scss';
import { fetchPokemonDataByUrl } from "@/lib/fetchPokemonDataByUrl";
import { findByKoreanName } from "@/lib/findByKoreanName";

export default function SearchBar() {
    const { 
        searchQuery, 
        setSearchQuery,
        allNames,
        setPokemons,
        setHasMore,
        setOffsets
    } = usePokemonStore();

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);

        try {
            let match = allNames.find(
                (poke) => poke.name.toLowerCase() === searchQuery.toLowerCase()
            );

            if (!match) {
                match = await findByKoreanName(searchQuery, allNames);
            }

            if (!match) {
                alert("해당 포켓몬을 찾을 수 없습니다.");
                return;
            }
        
            const result = await fetchPokemonDataByUrl(match.url);
            setPokemons([result]);
            setHasMore(false);
            setOffsets(0);
            setSearchQuery("");
        } catch (error) {
          console.error("❌ 포켓몬 fetch 실패:", error);
          alert("포켓몬 데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        window.location.reload();
    }
    

    return (
        <div className="poke_search_box">
            <input
                className='poke_search_main'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="포켓몬 이름을 입력해주세요."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    handleSearch();
                    }
                }}
            />
            <div className="btn_box">
                {/* <button onClick={handleSearch} disabled={loading} className="srch_btn">
                    {loading ? '검색 중...' : '검색'}
                </button> */}
                <button className="srch_back" onClick={handleReset}>
                    {loading ? '검색 중...' : '전체 보기'}
                </button>
            </div>
        </div>
    )
}