export interface MapPin {
  objectId?: string;
  id?: string;
  lat: number;
  lang: number;
  markerDetails: MarkerDetails;
  disconnected?: boolean;
}

export interface MarkerDetails {
  name: string;
  freq: string;
  radio: string;
}
