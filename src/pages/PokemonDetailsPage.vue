<template>
    <div class="pokemon-details-container">
      <div class="redirect-container">
        <q-btn to="/" color="primary" label="Back to Home Page" class="router-link" />
      </div>
      <q-container>
        <loading-spinner v-if="isLoading" />
        <div v-if="!isLoading" class="grid-container">
            <div class="avatar-column">
                <q-avatar size="400px">
                <img :src="pokemonDetails?.sprite.front_shiny" alt="Shiny Sprite" class="avatar">
                </q-avatar>
            </div>
            <div class="info-column">
                <h1 class="name">{{ pokemonDetails?.name }}</h1>
                <span class="label">Abilities: </span>
                <ul class="abilities-list">
                    <li v-for="ability in pokemonDetails?.abilities" :key="ability.ability.name" class="ability-item">
                    <span class="info-text">{{ ability.ability.name }}</span>
                    </li>
                </ul>
                <span class="label">Weight: </span>
                <span class="info-text">{{ pokemonDetails?.weight }}</span>
            </div>
        </div>
      </q-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { usePokemonStore } from 'src/stores/pokemon-store'
import LoadingSpinner from 'src/components/LoadingSpinner.vue'

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
  name: 'PokemonDetailsPage',
  components: {
    LoadingSpinner
  },
  setup () {
    const isLoading = ref(true)
    const pokemonDetails = ref<PokemonDetail | null>(null)
    const pokemonStore = usePokemonStore()

    const fetchData = async () => {
      try {
        const pokemonUrl = pokemonStore.selectedPokemon?.url

        if (!pokemonUrl) {
          console.error('Pokemon not found.')
          return
        }

        const response = await axios.get(pokemonUrl)
        console.log('pokemonUrl: ' + pokemonUrl)
        console.log('response: ' + response)
        // Extract relevant details from the response
        pokemonDetails.value = {
          name: response.data.name,
          abilities: response.data.abilities,
          sprite: response.data.sprites,
          weight: response.data.weight,
          species: response.data.species
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error)
      }
      isLoading.value = false
    }

    onMounted(() => {
      setTimeout(() => {
        fetchData()
      }, 100)
    })

    return {
      isLoading,
      pokemonDetails
    }
  }
})
</script>
<style lang="scss">
.redirect-container {
    margin: 20px 0;
}

.pokemon-details-container {
  max-width: 800px;
  margin: 100px auto;

  @media screen and (max-width: 768px) {
    margin: 20px auto;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    text-align: center;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .avatar-column {
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 100%;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }

  .info-column {
    padding: 20px;

    .abilities-list {
        list-style: none;
        padding: 0;

        .ability-item {
        margin-bottom: 5px; // Adjust as needed
        }
    }

    .label {
        font-size: 20px;
        font-weight: normal;
        line-height: 0;
        text-transform: capitalize;
        margin-bottom: 20px;
    }

    .name {
        font-size: 40px;
        font-weight: bold;
        line-height: 1.6;
        text-transform: uppercase;
    }

    .info-text {
        font-size: 20px;
        font-weight: bold;
        line-height: 0;
        text-transform: capitalize;
        margin-bottom: 20px;
    }

    .router-link {
      display: block;
      margin-top: 20px;
      text-align: center;
      color: #007aff;
    }
  }
}
</style>
