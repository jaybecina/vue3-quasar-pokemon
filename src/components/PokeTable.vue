<template>
  <div class="table-container">
    <loading-spinner v-if="loading" />
    <q-table
      :rows="pokemonList"
      :columns="columns"
      row-key="name"
      :virtual-scroll="true"
      :loading="loading"
      :rows-per-page-options="[10, 20, 30]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <img :src="getSpriteUrl(props.row.sprites)" alt="Pokemon Image" class="pokemon-image">
          </q-td>
          <q-td key="name" :props="props">
            <span class="name">{{ props.row.name }}</span>
          </q-td>
          <q-td key="url" :props="props">
            {{ props.row.url }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn @click="navigateToDetailsPage(props.row)" label="Details" color="primary" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { QTableColumn } from 'quasar'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { usePokemonStore } from 'src/stores/pokemon-store'
import LoadingSpinner from 'src/components/LoadingSpinner.vue'

interface PokemonSprites {
  front_shiny: string;
}

interface Pokemon {
  name: string;
  url: string;
  sprites: PokemonSprites;
  actions?: (row: Pokemon) => void;
}

export default defineComponent({
  name: 'PokeTable',
  components: {
    LoadingSpinner
  },
  setup () {
    const pokemonList = ref<Pokemon[]>([])
    const loading = ref(true)
    const router = useRouter()
    const pokemonStore = usePokemonStore()

    const columns: QTableColumn<Pokemon>[] = [
      {
        name: 'image',
        label: 'Image',
        align: 'center',
        field: 'sprites',
        format: (val) => `<img :src="${val.front_shiny}" alt="Pokemon Image" class="pokemon-image">`
      },
      { name: 'name', label: 'Name', align: 'center', field: 'name', sortable: true },
      { name: 'url', label: 'URL', align: 'center', field: 'url', sortable: true },
      {
        name: 'actions',
        label: 'Actions',
        align: 'center',
        field: 'actions',
        format: () => '<q-btn @click="navigateToDetailsPage(row)" label="Details" color="primary" />'
      }
    ]

    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = response.data.results

        const pokemonDataPromises = data.map(async (pokemon: Pokemon) => {
          const spriteResponse = await axios.get(pokemon.url)
          return {
            name: pokemon.name,
            url: pokemon.url,
            sprites: spriteResponse.data.sprites
          }
        })
        pokemonList.value = await Promise.all(pokemonDataPromises)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        loading.value = false
      }
    }

    const getSpriteUrl = (sprites: PokemonSprites) => {
      return sprites.front_shiny || ''
    }

    const navigateToDetailsPage = (pokemon: Pokemon) => {
      console.log(pokemon)
      pokemonStore.setSelectedPokemon(pokemon)
      // await router.push({ name: 'PokemonDetailsPage', params: { name: pokemon.name } })
      router.push(`pokemon-details/${pokemon.name}`)
    }

    console.log('pokemonStore: ', pokemonStore.selectedPokemon)

    onMounted(() => {
      fetchData()
    })

    return {
      pokemonList,
      columns,
      loading,
      getSpriteUrl,
      navigateToDetailsPage
    }
  }
})
</script>
<style lang="scss">
.table-container {
  overflow-x: auto;
}

.q-table {
  width: 100%;

  th, td {
    white-space: nowrap;
  }
}

.pokemon-image {
  max-width: 100px;
  max-height: 100px;
  margin-left: 10px;
}

.name {
  font-size: 14px;
  font-weight: bold;
  line-height: 0;
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  .pokemon-image {
    max-width: 50px;  // Adjust the size for smaller screens
    max-height: 50px;
    margin-left: 5px;
  }

  .name {
    font-size: 12px;  // Adjust the font size for smaller screens
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
  }
}
</style>
