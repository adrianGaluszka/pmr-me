export interface MapPin {
  objectId?: string;
  id?: string;
  lat: number;
  lang: number;
  markerDetails: MarkerDetails;
}

export interface MarkerDetails {
  name: string;
  freq: string;
  radio: string;
}
