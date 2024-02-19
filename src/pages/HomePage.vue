<template>
  <q-page class="row items-center justify-evenly">
    <q-page-container>
      <poke-table />
    </q-page-container>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PokeTable from 'src/components/PokeTable.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    PokeTable
  }
})
</script>
