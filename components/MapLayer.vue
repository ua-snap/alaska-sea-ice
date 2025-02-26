<script setup lang="ts">
import { useMapStore } from "@/stores/map";
import { computed, nextTick } from "vue";
import LayerFields from "./LayerFields.vue";

const mapStore = useMapStore();
const props = defineProps<{
  layer: MapLayer;
  mapId: string;
  default?: boolean;
  forcedCRS?: string;
}>();

const active = computed(
  () => mapStore.activeLayers[props.mapId]?.id === props.layer.id,
);

async function toggleLayer() {
  await nextTick();
  mapStore.toggleLayer({
    layer: props.layer,
    mapId: props.mapId,
  });

  if (props.forcedCRS) {
    mapStore.forcedCRS = true;
    mapStore.setCRS(props.forcedCRS);
  } else {
    mapStore.forcedCRS = false;
  }
}

const submitLayerConfig = (newConfig: {
  month: number | null;
  year: number | null;
}) => {
  if (newConfig.month && newConfig.year) {
    const time = `${newConfig.year}-${newConfig.month < 10 ? "0" + newConfig.month : newConfig.month}-15T12:00:00.000Z`;

    if (newConfig.year > 2014) {
      props.layer.rasdamanConfiguration.dim_scenario = 4;
    } else {
      props.layer.rasdamanConfiguration.dim_scenario = 0;
    }

    props.layer.rasdamanConfiguration.time = time;

    mapStore.toggleLayer({
      layer: props.layer,
      mapId: props.mapId,
    });
  }
};
</script>

<template>
  <div
    @click="toggleLayer"
    class="layer tile is-ancestor is-parent"
    :class="{ active: active }"
  >
    <span class="tile is-child layer-wrapper">
      <div class="layer-title">
        <slot name="title">{{ layer.title }}</slot>
      </div>
      <div class="subtext"><slot name="subtext"></slot></div>
    </span>
    <span class="tile is-child active-pointer">
      <div v-if="active">&#x25b6;</div>
    </span>
  </div>

  <div v-if="active" class="layer-fields-container">
    <LayerFields @submitLayerConfig="submitLayerConfig" />
  </div>
</template>

<style lang="scss" scoped>
.layer {
  line-height: 1.2;
  font-size: 1.25rem;
  cursor: pointer;
  padding-right: 0;

  &.active {
    font-weight: 600;
    background-color: #f2c716;
  }

  .layer-wrapper {
    flex-basis: 80%;
  }

  .subtext {
    display: block;
    margin-top: 0;
    padding-top: 0;
    font-weight: 300;
  }

  .active-pointer {
    display: flex;
    align-items: center;
    font-size: 125%;
  }
}

.layer-fields-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-top: 10px;
}
</style>
