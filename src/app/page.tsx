'use client'

import { useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import { usePokemonStore } from "./store/pokemonStore";
import { fetchAllPokemonNames } from "@/lib/fetchAllPokemonNames";

export default function Home() {

  const { allNames, setAllNames } = usePokemonStore();

  useEffect(() => {
    const loadAllNames = async () => {
      if (allNames.length === 0) {
        const result = await fetchAllPokemonNames();
        setAllNames(result);
      }
    };
    loadAllNames();
  },[]);

  return (
    <main>
      <SearchBar />
      <PokemonList />
    </main>
  );
}