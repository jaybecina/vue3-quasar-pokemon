<template>
  <q-layout view="lHh Lpr lFf">
    <app-navbar :logoSrc="pokemonLogoSrc" @toggleLeftDrawer="toggleLeftDrawer" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppNavbar from 'src/components/AppNavbar.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppNavbar
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const pokemonLogoSrc = '.src/assets/pokemon-logo.png'

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      pokemonLogoSrc
    }
  }
})
</script>
