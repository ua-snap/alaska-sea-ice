import { defineStore } from "pinia";
import { useNuxtApp, useRuntimeConfig } from "#app"; // Ensure Nuxt composables are imported
import {
  tileLayer,
  latLng,
  latLngBounds,
  type TileLayer,
  type MapOptions,
} from "leaflet";

export const useMapStore = defineStore("map", () => {
  const nuxtApp = useNuxtApp();
  const { $L } = nuxtApp;
  const config = useRuntimeConfig();

  // Leaflet map objects, keys equal to ID of Leaflet map
  const maps: { [index: string]: any } = {};

  // Active layers for each map
  const activeLayers: Ref<Record<string, MapLayer>> = ref({});

  function getBaseMapAndLayers(crs: string): MapOptions {
    let proj: any;
    let resolutions: number[];
    let center: L.LatLng;
    let zoom: number;
    let baseLayer: TileLayer | null;
    let southWest: L.LatLng;
    let northEast: L.LatLng;
    let viscosity = 0.0;

    if (crs === "EPSG:3572") {
      resolutions = [12000, 6000, 3000, 1500];
      zoom = 0;
      center = latLng(90, 0);
      proj = new $L.Proj.CRS(
        "EPSG:3572",
        "+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
        {
          origin: [-4889334.802954878, -4889334.802954878],
          resolutions,
        },
      );

      baseLayer = null;
      southWest = latLng(20, -15);
      northEast = latLng(20, 165);
      viscosity = 1.0;
    } else {
      resolutions = [4096, 2048, 1024, 512, 256, 128, 64];
      zoom = 1;
      center = latLng(64.7, -155);
      proj = new $L.Proj.CRS(
        "EPSG:3338",
        "+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
        {
          origin: [-4648005.934316417, 444809.882955059],
          resolutions,
        },
      );

      baseLayer = tileLayer.wms(config.public.geoserverUrl, {
        transparent: true,
        crs: proj,
        format: "image/png",
        version: "1.3.0",
        layers: "atlas_mapproxy:alaska_osm_retina",
      });

      southWest = latLng(50.5, 155);
      northEast = latLng(64, -131);
    }

    const bounds = latLngBounds(southWest, northEast);

    let layerConfig: MapOptions = {
      zoom,
      zoomSnap: 0.1,
      minZoom: 0,
      maxZoom: resolutions.length - 1,
      center,
      scrollWheelZoom: false,
      crs: proj,
      zoomControl: false,
      doubleClickZoom: false,
      attributionControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: viscosity,
    };

    if (baseLayer) {
      layerConfig.layers = [baseLayer];
    }

    return layerConfig;
  }

  function create(mapId: string, crs: string) {
    maps[mapId] = $L.map(mapId, getBaseMapAndLayers(crs));
    new $L.Control.Zoom({ position: "topright" }).addTo(maps[mapId]);
  }

  function destroy(mapId: string) {
    if (maps[mapId]) {
      maps[mapId].remove();
    }
  }

  return {
    create,
    destroy,
    activeLayers,
  };
});
