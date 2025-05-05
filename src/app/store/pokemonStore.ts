import { PokemonData } from "@/types/pokemon";
import { create } from "zustand";

type PokemonName = {
    name : string;
    url : string;
};

type PokemonStore = {
    pokemons: PokemonData[];
    offset: number;
    allNames: PokemonName[];
    types: string[];
    searchQuery: string;
    selectedType: string | null;
    hasMore: boolean;
    loading: boolean;

    setPokemons: (data: PokemonData[]) => void;
    appendPokemons: (data: PokemonData[]) => void;
    setOffsets: (offset: number) => void;
    setAllNames: (names: PokemonName[]) => void;
    setTypes: (types: string[]) => void;
    setSearchQuery: (query: string) => void;
    setSelectedType: (type: string | null) => void;
    setHasMore: (value: boolean) => void;
    setLoading: (value: boolean) => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
    pokemons: [],
    offset: 0,
    allNames: [],
    types: [],
    searchQuery: '',
    selectedType: null,
    hasMore: true,
    loading: false,

    setPokemons: (data) => set({ pokemons: data }),
    appendPokemons: (data) => set((state) => ({ pokemons: [...state.pokemons, ...data] })),
    setOffsets: (offset) => set({ offset }),
    setAllNames: (names) => set({ allNames: names }),
    setTypes: (types) => set({ types }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedType: (type) => set({ selectedType: type }),
    setHasMore: (value) => set({ hasMore: value }),
    setLoading: (value) => set({ loading: value }),

}));