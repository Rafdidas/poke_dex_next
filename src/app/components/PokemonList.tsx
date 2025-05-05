'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "@/lib/fetchPokemonData";
import { PokemonData } from "@/types/pokemon";
import { useEffect, useState } from "react";

import Image from "next/image";

import PokemonBox from "./PokemonBox";

import '../styles/pokeList.style.scss';
import moreBtn from '@/assets/masterball.png';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState<PokemonData[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        setLoading(true);
        const newData = await fetchPokemonData(16, offset);
        setPokemons((prev) => [...prev, ...newData]);
        setOffset((prev) => prev + 16);
        if (newData.length === 0) {
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadMore();
    }, []);


    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemons', 0],
        queryFn: () => fetchPokemonData(16, 0),
    });

    if (isLoading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">ERROR</p>;

    if (!Array.isArray(data)) return <p className="error">데이터 없음</p>;

    return (
        <>
            <ul className="poke_list">
                {pokemons.map((pokemon) => (
                    <li key={pokemon.pokeId}>
                        <PokemonBox {...pokemon} />
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button className="load_more" onClick={loadMore} disabled={loading}>
                    <Image src={moreBtn} alt="more"/>
                    <span>{loading ? '불러오는 중...' : '더보기'}</span>
                </button>
            )}
        </>
        
    );
}

