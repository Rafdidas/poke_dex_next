'use client';

import { fetchPokemonData } from "@/lib/fetchPokemonData";
import { useEffect } from "react";

import Image from "next/image";

import PokemonBox from "./PokemonBox";

import '../styles/pokeList.style.scss';
import moreBtn from '@/assets/masterball.png';
import { usePokemonStore } from "../store/pokemonStore";
import { fetchAllPokemonNames } from "@/lib/fetchAllPokemonNames";

export default function PokemonList() {
    const {
        pokemons,
        offset,
        loading,
        hasMore,
        searchQuery,
        appendPokemons,
        setOffsets,
        setLoading,
        setHasMore,
    } = usePokemonStore();

    const loadMore = async () => {
        setLoading(true);
        const newData = await fetchPokemonData(16, offset);
        appendPokemons(newData);
        setOffsets(offset + 16);
        if (newData.length < 16) {
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (pokemons.length === 0) loadMore();
    }, []);

    const {
        allNames,
        setAllNames,
    } = usePokemonStore();

    useEffect(() => {
        const loadNames = async () => {
            if (allNames.length === 0) {
                try {
                    const names = await fetchAllPokemonNames();
                    setAllNames(names);
                } catch (error) {
                    console.error('전체 포켓몬 이름 로딩 실패:', error);
                }
            }
        };
        loadNames();
    },[]);

    const filteredPokemons = searchQuery 
        ? pokemons.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : pokemons;

    if (loading) return <p className="loading">Loading...</p>;
    if (!pokemons) return <p className="error">ERROR</p>;


    return (
        <>
            <ul className="poke_list">
                {filteredPokemons.map((pokemon) => (
                    <li key={pokemon.pokeId}>
                        <PokemonBox {...pokemon} />
                    </li>
                ))}
            </ul>

            {hasMore && !searchQuery && (
                <button className="load_more" onClick={loadMore} disabled={loading}>
                    <Image src={moreBtn} alt="more"/>
                    <span>{loading ? '불러오는 중...' : '더보기'}</span>
                </button>
            )}
        </>
        
    );
}

