import { defineStore } from 'pinia'

interface Pokemon {
    name: string;
    url: string;
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    selectedPokemon: null as Pokemon | null
  }),
  actions: {
    setSelectedPokemon (pokemon: Pokemon) {
      this.selectedPokemon = pokemon
    }
  }
})
