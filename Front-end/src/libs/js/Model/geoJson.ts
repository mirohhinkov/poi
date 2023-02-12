export interface GeoJson {
  name: string;
  type: 'FeatureCollection';
  features: Feature[];
}

export interface Feature {
  type: 'Feature';
  geometry: {
    type:
      | 'Point'
      | 'LineString'
      | 'Polygon'
      | 'MultiPoint'
      | 'MultiLineString'
      | 'MultiPolygon'
      | 'GeometryCollection';
    coordinates:
      | [number, number]
      | [number, number][]
      | [number, number][][]
      | [number, number][][][];
  };
  properties: null | object;
}
