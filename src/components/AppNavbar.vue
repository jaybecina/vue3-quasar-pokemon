<template>
  <q-header elevated class="bg-primary text-white nav-container">
    <q-avatar size="80px" class="logo-container">
      <img :src="pokemonLogoSrc" alt="Pokemon Logo" />
    </q-avatar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AppNavbar',
  props: {
    logoSrc: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup (props, { emit }) {
    const handleToggleLeftDrawer = () => {
      emit('toggleLeftDrawer')
    }

    const pokemonLogoSrc = './src/assets/poke-logo.png'

    return {
      handleToggleLeftDrawer,
      pokemonLogoSrc
    }
  }
})
</script>
<style lang="scss">
.logo-container {
  margin-left: 50px;
}

@media screen and (max-width: 768px) {
    .nav-container {
      display: flex !important;
      justify-content: center !important;

      .logo-container {
        margin-left: 0;
      }
    }
}
</style>
