<script lang="ts" setup>
import { ref, watch } from "vue";
import { useMapStore } from "@/stores/map";
import MapLayer from "./MapLayer.vue";

const mapStore = useMapStore();
const mapId = "tas";

const activeLayer = ref<MapLayer | null>(null);

watch(
  () => mapStore.currentCRS,
  (newCrs) => {
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
  },
);

const layers: MapLayer[] = [
  {
    id: "siconc_cmip6",
    title: "January 1950, MIROC6",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_siconc",
    legend: "siconc",
    default: true,
    rasdamanConfiguration: {
      dim_model: 7,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
  {
    id: "ardac_beaufort_daily_slie",
    title: "January 1997",
    source: "rasdaman",
    wmsLayerName: "ardac_beaufort_daily_slie",
    style: "ardac_daily_slie",
    legend: "landfast_sea_ice",
    rasdamanConfiguration: { time: "1997-01-01T00:00:00.000Z" },
    coastline: true,
    validTimeRange: "1997,2022",
  },
  {
    id: "ardac_chukchi_daily_slie",
    title: "January 1997",
    source: "rasdaman",
    wmsLayerName: "ardac_chukchi_daily_slie",
    style: "ardac_daily_slie",
    legend: "landfast_sea_ice",
    rasdamanConfiguration: { time: "1997-01-01T00:00:00.000Z" },
    coastline: true,
    validTimeRange: "1997,2022",
  },
  {
    id: "tasmax_cmip6",
    title: "January 1950, GFDL-ESM4",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmax",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
  {
    id: "tasmin_cmip6",
    title: "January 1950, GFDL-ESM4",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_tasmin",
    legend: "tas",
    rasdamanConfiguration: {
      dim_model: 3,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
  {
    id: "sfcWind_cmip6",
    title: "January 1950, EC-Earth3-Veg",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_sfcWind",
    legend: "sfcWind",
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
  {
    id: "uas_cmip6",
    title: "January 1950, EC-Earth3-Veg",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_uas",
    legend: "uas",
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
  {
    id: "vas_cmip6",
    title: "January 1950, EC-Earth3-Veg",
    source: "rasdaman",
    wmsLayerName: "cmip6_monthly",
    style: "ardac_vas",
    legend: "vas",
    rasdamanConfiguration: {
      dim_model: 2,
      dim_scenario: 0,
      time: "1950-01-15T12:00:00.000Z",
    },
    coastline: true,
    validTimeRange: "1950,2100",
  },
];

const legend: Record<string, LegendItem[]> = {
  landfast_sea_ice: [
    { color: "#ffffff", label: "Absent" },
    { color: "#ccccff", label: "Present" },
    { color: "#cce6cc", label: "Land" },
  ],
  siconc: [
    { color: "#045a8d", label: "0&#37; &ndash; 70&#37;" },
    { color: "#2b8cbe", label: "70&#37; &ndash; 80&#37;" },
    { color: "#74a9cf", label: "80&#37; &ndash; 90&#37;" },
    { color: "#bdc9e1", label: "90&#37; &ndash; 100&#37;" },
  ],
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
  sfcWind: [
    { color: "#5c5c5c", label: "&ge;0 m/s, &lt;1.5 m/s" },
    { color: "#878787", label: "&ge;1.5 m/s, &lt;3 m/s" },
    { color: "#ababab", label: "&ge;3 m/s, &lt;4.5 m/s" },
    { color: "#d1d1d1", label: "&ge;4.5 m/s, &lt;6 m/s" },
    { color: "#efefef", label: "&ge;6 m/s" },
  ],
  uas: [
    { color: "#cf5c9a", label: "&lt;-3 m/s" },
    { color: "#e096bd", label: "&ge;-3 m/s, &lt;-2 m/s" },
    { color: "#ecc2da", label: "&ge;-2 m/s, &lt;-1 m/s" },
    { color: "#f3dfea", label: "&ge;-1 m/s, &lt;0 m/s" },
    { color: "#e3eed5", label: "&ge;0 m/s, &lt;1 m/s" },
    { color: "#c4dfa1", label: "&ge;1 m/s, &lt;2 m/s" },
    { color: "#9cc674", label: "&ge;2 m/s, &lt;3 m/s" },
    { color: "#7aa95f", label: "&ge;3 m/s" },
  ],
  vas: [
    { color: "#cf5c9a", label: "&lt;-3 m/s" },
    { color: "#e096bd", label: "&ge;-3 m/s, &lt;-2 m/s" },
    { color: "#ecc2da", label: "&ge;-2 m/s, &lt;-1 m/s" },
    { color: "#f3dfea", label: "&ge;-1 m/s, &lt;0 m/s" },
    { color: "#e3eed5", label: "&ge;0 m/s, &lt;1 m/s" },
    { color: "#c4dfa1", label: "&ge;1 m/s, &lt;2 m/s" },
    { color: "#9cc674", label: "&ge;2 m/s, &lt;3 m/s" },
    { color: "#7aa95f", label: "&ge;3 m/s" },
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
            <input
              type="checkbox"
              @change="mapStore.toggleCRS"
              :checked="mapStore.currentCRS === 'EPSG:3572'"
              :disabled="mapStore.forcedCRS"
            />
            <span class="slider round"></span>
          </label>

          <span v-if="mapStore.currentCRS === 'EPSG:3572' && mapStore.forcedCRS"
            >Circumpolar Map - Map Cannot Change</span
          >
          <span
            v-else-if="
              mapStore.currentCRS === 'EPSG:3338' && mapStore.forcedCRS
            "
            >Alaska-centered Map - Map Cannot Change</span
          >
          <span v-else-if="mapStore.currentCRS === 'EPSG:3572'"
            >Circumpolar Map</span
          >
          <span v-else="mapStore.currentCRS === 'EPSG:3338'"
            >Alaska-centered Map</span
          >
        </div>
      </div>

      <MapBlock :mapId="mapId" crs="EPSG:3572" class="mb-6">
        <template v-slot:layers>
          <h4 class="title is-4 mb-3">Sea Ice Concentration</h4>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
          <h3>Landfast Sea Ice</h3>
          <h4 class="title is-4 mb-3">Beaufort Sea Landfast Sea Ice</h4>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
          </MapLayer>
          <hr />
          <h4 class="title is-4 mb-3">Chukchi Sea Landfast Sea Ice</h4>
          <MapLayer :mapId="mapId" :layer="layers[2]">
            <template v-slot:title>{{ layers[2].title }}</template>
          </MapLayer>
          <h3>Temperature Variables</h3>
          <h4 class="title is-4 mb-3">Maximum Near-surface Air Temperature</h4>
          <MapLayer :mapId="mapId" :layer="layers[3]">
            <template v-slot:title>{{ layers[3].title }}</template>
          </MapLayer>
          <hr />
          <h4 class="title is-4 mb-3">Minimum Near-surface Air Temperature</h4>
          <MapLayer :mapId="mapId" :layer="layers[4]">
            <template v-slot:title>{{ layers[4].title }}</template>
          </MapLayer>
          <h3>Wind Variables</h3>
          <h4>Near-surface Wind Speed</h4>
          <MapLayer :mapId="mapId" :layer="layers[5]">
            <template v-slot:title>{{ layers[5].title }}</template>
          </MapLayer>
          <h4>Near-surface Eastward Wind Speed</h4>
          <MapLayer :mapId="mapId" :layer="layers[6]">
            <template v-slot:title>{{ layers[6].title }}</template>
          </MapLayer>
          <h4>Near-surface Northward Wind Speed</h4>
          <MapLayer :mapId="mapId" :layer="layers[7]">
            <template v-slot:title>{{ layers[7].title }}</template>
          </MapLayer>
        </template>
      </MapBlock>
    </div>
  </section>
</template>

<style scoped>
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
