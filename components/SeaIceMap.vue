<script lang="ts" setup>
import { ref, watch } from "vue";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();
const mapId = "tas";

const activeLayer = ref<MapLayer | null>(null);

const currentCRS = ref("EPSG:3572");

const toggleCRS = () => {
  currentCRS.value =
    currentCRS.value === "EPSG:3572" ? "EPSG:3338" : "EPSG:3572";
};

watch(currentCRS, (newCrs) => {
  activeLayer.value = mapStore.activeLayers[mapId] || null;
  mapStore.destroy(mapId);
  mapStore.create(mapId, newCrs);
  if (activeLayer.value !== null) {
    setTimeout(() => {
      mapStore.toggleLayer({
        mapId,
        layer: activeLayer.value as MapLayer,
      });
    }, 500);
  }
});

const layers: MapLayer[] = [
  {
    id: "tas_cmip6_2000",
    title: "2000, GFDL-ESM4",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tas",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 0,
      time: "2000-07-15T12:00:00.000Z",
    },
    coastline: true,
  },
  {
    id: "tas_cmip6_2100",
    title: "2100, GFDL-ESM4, SSP5-8.5",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tas",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 4,
      time: "2100-07-15T12:00:00.000Z",
    },
    coastline: true,
  },
  {
    id: "tasmax_cmip6_2000",
    title: "2000, GFDL-ESM4",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmax",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 0,
      time: "2000-01-15T12:00:00.000Z",
    },
    coastline: true,
  },
  {
    id: "tasmax_cmip6_2100",
    title: "2100, GFDL-ESM4, SSP5-8.5",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmax",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 4,
      time: "2100-01-15T12:00:00.000Z",
    },
    coastline: true,
  },
  {
    id: "tasmin_cmip6_2000",
    title: "2000, GFDL-ESM4",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmin",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 0,
      time: "2000-01-15T12:00:00.000Z",
    },
    coastline: true,
  },
  {
    id: "tasmin_cmip6_2100",
    title: "2100, GFDL-ESM4, SSP5-8.5",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmin",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 4,
      time: "2100-01-15T12:00:00.000Z",
    },
    coastline: true,
  },
];

const legend: Record<string, LegendItem[]> = {
  tas: [
    { color: "#6468ac", label: "&lt;-20°C" },
    { color: "#7394c1", label: "&ge;-20°C, &lt;-15°C" },
    { color: "#94bcd5", label: "&ge;-15°C, &lt;-10°C" },
    { color: "#badae5", label: "&ge;-10°C, &lt;-5°C" },
    { color: "#e0ecf1", label: "&ge;-5°C, &lt;0°C" },
    { color: "#f4e0a9", label: "&ge;0°C, &lt;5°C" },
    { color: "#f4bc88", label: "&ge;5°C, &lt;10°C" },
    { color: "#ef9073", label: "&ge;10°C, &lt;15°C" },
    { color: "#dc6961", label: "&ge;15°C, &lt;20°C" },
    { color: "#ba505e", label: "&ge;20°C" },
  ],
};

onMounted(() => {
  mapStore.setLegendItems(mapId, legend);
});
</script>

<template>
  <section class="section xray">
    <div class="content is-size-5">
      <h3 class="title is-3">Sea Ice</h3>

      <div class="field">
        <label class="label">Map Projection</label>
        <div class="control">
          <label class="switch">
            <input type="checkbox" @change="toggleCRS" />
            <span class="slider round"></span>
          </label>
          <span v-if="currentCRS === 'EPSG:3572'">Circumpolar Map</span>
          <span v-else>Alaska-centered Map</span>
        </div>
      </div>

      <MapBlock :mapId="mapId" crs="EPSG:3572" class="mb-6">
        <template v-slot:layers>
          <h3>Temperature Variables</h3>
          <h4 class="title is-4 mb-3">
            January Maximum Near-surface Air Temperature
          </h4>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[3]">
            <template v-slot:title>{{ layers[3].title }}</template>
          </MapLayer>
          <hr />
          <h4 class="title is-4 mb-3">
            January Minimum Near-surface Air Temperature
          </h4>
          <MapLayer :mapId="mapId" :layer="layers[4]">
            <template v-slot:title>{{ layers[4].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[5]">
            <template v-slot:title>{{ layers[5].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>
    </div>
  </section>
</template>

<style scoped>
/* 🟢 Style for the switch toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(14px);
}
</style>
