<script lang="ts" setup>
const mapStore = useMapStore();
const runtimeConfig = useRuntimeConfig();

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
      time: "2000-07-15T12:00:00.000Z",
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
      time: "2100-07-15T12:00:00.000Z",
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

const mapId = "tas";
mapStore.setLegendItems(mapId, legend);
</script>

<template>
  <section class="section xray">
    <div class="content is-size-5">
      <h3 class="title is-3">Consecutive Wet Days</h3>
      <XrayIntroblurb resolution="~12" unit="km" cmip="5" />
      <p class="mb-6">
        Consecutive wet days are the number of the most consecutive days with at
        least 1㎜ precipitation. The map below shows the 30-year mean of
        consecutive wet days for three eras. The historical era
        (1980&ndash;2009) uses historical modeled data provided by the Daymet
        model. The mid-century (2040&ndash;2069) and late-century
        (2070&ndash;2099) eras use modeled projections from the NCAR CCSM4 model
        under the RCP 8.5 emissions scenario.
      </p>

      <MapBlock :mapId="mapId" crs="EPSG:3572" class="mb-6">
        <template v-slot:layers>
          <h4 class="title is-4 mb-3">
            July Mean Near-surface Air Temperature
          </h4>
          <MapLayer :mapId="mapId" :layer="layers[0]" default>
            <template v-slot:title>{{ layers[0].title }}</template>
          </MapLayer>
          <MapLayer :mapId="mapId" :layer="layers[1]">
            <template v-slot:title>{{ layers[1].title }}</template>
          </MapLayer>
          <hr />
          <h4 class="title is-4 mb-3">
            July Maximum Near-surface Air Temperature
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

<style scoped></style>
