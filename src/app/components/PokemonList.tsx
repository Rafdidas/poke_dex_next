'use client';

import { fetchPokemonData } from "@/lib/fetchPokemonData";
import { useEffect } from "react";

import PokemonBox from "./PokemonBox";

import '../styles/pokeList.style.scss';

import { usePokemonStore } from "../store/pokemonStore";
import { fetchAllPokemonNames } from "@/lib/fetchAllPokemonNames";
import Loading from "./Loading";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function PokemonList() {
    const {
        pokemons,
        searchResult,
        offset,
        loading,
        hasMore,
        //searchQuery,
        selectedType,
        appendPokemons,
        setOffsets,
        setLoading,
        setHasMore,
        allNames,
        setAllNames,
    } = usePokemonStore();
    
    const loadMore = async () => {
        if (loading || !hasMore || searchResult.length > 0) return;

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

    const baseList = searchResult.length > 0 ? searchResult : pokemons;
    const filteredPokemons = baseList.filter((pokemon) => 
        selectedType === "" ||
        pokemon.types.some((t) => t.koreanType === selectedType)
    );
    const sentinelRef = useInfiniteScroll(loadMore, hasMore && searchResult.length === 0);
    
    useEffect(() => {
        if (
            selectedType !== "" &&
            filteredPokemons.length < 16 &&
            hasMore &&
            !loading &&
            searchResult.length === 0
        ) {
            loadMore();
        }
    }, [selectedType, filteredPokemons.length, hasMore, loading]);
    
    if (loading && pokemons.length === 0) return <Loading />;
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
            <div ref={sentinelRef} style={{ height: 60 }} />
        </>
        
    );
}

