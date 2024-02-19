<!-- LoadingSpinner.vue -->
<template>
    <q-loading :show="isLoading">
      <div class="loading-spinner">
        <q-spinner-gears color="primary" size="50px" />
      </div>
    </q-loading>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
