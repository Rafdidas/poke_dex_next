import { PokemonData } from "@/types/pokemon";
import { create } from "zustand";

type PokemonName = {
    name : string;
    url : string;
    korean : string;
};

type PokemonStore = {
    pokemons: PokemonData[];
    searchResult: PokemonData[];
    offset: number;
    allNames: PokemonName[];
    types: string[];
    searchQuery: string;
    selectedType: string;
    hasMore: boolean;
    loading: boolean;

    setPokemons: (data: PokemonData[]) => void;
    appendPokemons: (data: PokemonData[]) => void;
    setSearchResult: (data: PokemonData[]) => void;
    setOffsets: (offset: number) => void;
    setAllNames: (names: PokemonName[]) => void;
    setTypes: (types: string[]) => void;
    setSearchQuery: (query: string) => void;
    setSelectedType: (type: string) => void;
    setHasMore: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    resetStore: () => void;
    
};

export const usePokemonStore = create<PokemonStore>((set) => ({
    pokemons: [],
    searchResult: [],
    offset: 0,
    allNames: [],
    types: [],
    searchQuery: '',
    selectedType: "",
    hasMore: true,
    loading: false,

    setPokemons: (data) => set({ pokemons: data }),
    appendPokemons: (data) =>
        set((state) => {
            const existingIds = new Set(state.pokemons.map(p => p.pokeId));
            const uniqueNewData = data.filter(p => !existingIds.has(p.pokeId));
            return { pokemons: [...state.pokemons, ...uniqueNewData] };
        }),
    setSearchResult: (data) => set({ searchResult: data }),
    setOffsets: (offset) => set({ offset }),
    setAllNames: (names) => set({ allNames: names }),
    setTypes: (types) => set({ types }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedType: (type) => set({ selectedType: type }),
    setHasMore: (value) => set({ hasMore: value }),
    setLoading: (value) => set({ loading: value }),
    resetStore: () => set(() => ({
        pokemons: [],
        searchResult: [],
        offset: 0,
        hasMore: true,
        searchQuery: '',
    }))

}));