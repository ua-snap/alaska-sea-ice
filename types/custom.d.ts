interface Item {
  slug: Slug;
  title: string;
  blurb: string;
  tags: Tag[];
  image?: string;
  imageAlt?: string;
  priority?: number;
}

interface Bio {
  person: Person;
  image: string;
  blurb: string;
}
type BioValue = Bio | undefined;

interface Community {
  id: string;
  name: string;
  alt_name?: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  type: string;
  is_coastal?: number;
  ocean_lat1?: number;
  ocean_lon1?: number;
}

type CommunityValue = Community | undefined;

interface MapLayer {
  id: string;
  title: string;
  subtext?: string;
  source?: "rasdaman" | undefined;
  wmsLayerName: string;
  style: string;
  default?: boolean;
  legend: string;
  rasdamanConfiguration?: any;
  coastline?: boolean;
  bbox?: number[];
}

interface MapLayerInstance {
  mapId: string;
  layer: MapLayer;
}

interface LegendItem {
  color: string;
  label: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

type LatLngValue = LatLng | undefined;

type PlaceType = "community" | "latLng" | undefined;
