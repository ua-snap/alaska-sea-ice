<template>
  <div class="columns">
    <div class="column is-one-third mt-3 ml-4 layers-container">
      <slot name="layers"></slot>
    </div>
    <div class="column">
      <Map :mapId="mapId" :crs="crs" class="map" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  mapId: string;
  crs?: string;
}>();
</script>

<style lang="scss" scoped>
.layers-container {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
