<template>
    <div>
        <h2>{{ pokemonDetail.name }}</h2>
        <img :src="pokemonDetail.sprite.front_shiny" alt="Pokemon Image" class="pokemon-image">
        <p>Weight: {{ pokemonDetail.weight }}</p>
        <p>Species: {{ pokemonDetail.species.name }}</p>
        <h3>Abilities:</h3>
        <ul>
            <li v-for="ability in pokemonDetail.abilities" :key="ability.ability.name">
            {{ ability.ability.name }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Ability {
  ability: {
    name: string;
  };
}

interface Sprite {
  front_shiny: string;
}

interface Species {
  name: string;
}

interface PokemonDetail {
  name: string;
  abilities: Ability[];
  sprite: Sprite;
  weight: number;
  species: Species;
}

export default defineComponent({
  name: 'PokemonDetails',
  props: {
    pokemonDetail: {
      type: Object as PropType<PokemonDetail>,
      required: true
    }
  }
})
</script>
