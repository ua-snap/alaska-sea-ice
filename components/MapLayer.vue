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
  year?: number;
}>();

const active = computed(
  () => mapStore.activeLayers[props.mapId]?.id === props.layer.id,
);

const isYearValid = computed(() => {
  if (!props.layer.validTimeRange || props.year === undefined) return true;

  const [start, end] = props.layer.validTimeRange.split(",").map(Number);

  return props.year >= start && props.year <= end;
});

onMounted(() => {
  if (props.default === true && isYearValid.value) {
    toggleLayer();
  }
});

async function toggleLayer() {
  if (!isYearValid.value) return;
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
</script>

<template>
  <div
    @click="isYearValid ? toggleLayer() : null"
    class="layer tile is-ancestor is-parent"
    :class="{ active: active, disabled: !isYearValid }"
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

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
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
