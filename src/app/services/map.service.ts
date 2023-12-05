import { Injectable, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapPin, MarkerDetails } from '../models/map-pin.interface';
import { FirebaseService } from './firebase.service';
import { Subject, takeUntil } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnDestroy {

  myMarkerLat: number = 0;
  myMarkerLang: number = 0;
  map: any;
  markersLayer = L.layerGroup();
  myMarkerLayer = L.layerGroup();
  preMyMarkerLayer = L.layerGroup();

  private preMyMarkerIcon = {
    icon: L.icon({
      iconSize: [15,15],
      iconAnchor: [7.5,7.5],
      iconUrl: './assets/icons/circle-red.svg',

   })
  };
  private myMarkerIcon = {
    icon: L.icon({
      iconSize: [24,36],
      iconAnchor: [12,36],
      iconUrl: './assets/icons/walkie-talkie-solid-my.svg',
   })
  };
  private markerIcon = {
    icon: L.icon({
      iconSize: [24,36],
      iconAnchor: [12,36],
      iconUrl: './assets/icons/walkie-talkie-solid.svg'
   })
  }
  private _addingMarkerLocked: boolean = false;

  private unsubscriber = new Subject();

  get addingMarkerLocked(): boolean {
    return this._addingMarkerLocked;
  }

  constructor(private readonly firebaseService: FirebaseService) { }

  ngOnDestroy(): void {
      this.unsubscriber.next('');
      this.unsubscriber.complete();
  }

  initMap() {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.map = L.map('map', {
      center: [ 51.9189046, 19.1343786 ],
      zoom: 6
    });

    tiles.addTo(this.map);
    this.markersLayer.addTo(this.map);
    this.myMarkerLayer.addTo(this.map);
    this.preMyMarkerLayer.addTo(this.map);

    // this.firebaseService.initValueChangesListener();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.myMarkerLat = e.latlng.lat;
      this.myMarkerLang = e.latlng.lng;


      this.preMyMarkerLayer.clearLayers();

      L.marker([ this.myMarkerLat, this.myMarkerLang], this.preMyMarkerIcon).addTo(this.preMyMarkerLayer);
    })

    // this.firebaseService.refreshMarkers$.pipe(takeUntil(this.unsubscriber)).subscribe(res => {
    //   console.log('refresh');
    //   console.log(res);
    //   const arr = []
    //   res.map(item =>{ console.log(item)}
    //   );
    //   this.refreshMarkers(res);

    // })
}

 addMyMarker(markerDetails?: MarkerDetails): void {
  if(this._addingMarkerLocked) {
    return;
  }
  const myMarkerDetails = `<b>Nazwa</b><p>${markerDetails?.name}</p><b>Czestotliwosc</b><p>${markerDetails?.freq}</p><b>Radio</b><p>${markerDetails?.radioDetails}</p>`
  this.preMyMarkerLayer.clearLayers();
  L.marker([ this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(this.myMarkerLayer);
  this._addingMarkerLocked = true;
  const mapPin = {
    lat: this.myMarkerLat,
    lang: this.myMarkerLang,
    id: uuid.v4(),
    label: myMarkerDetails
  }
  this.firebaseService.myMarkerId = mapPin.id;
  this.firebaseService.setData(mapPin);
  console.log('ADDED TO DATABASE AND REFRESHED FOR OTHERS');

 }

 updateMyMarker(markerData: MapPin): void {
  this.myMarkerLayer.clearLayers();
  this.preMyMarkerLayer.clearLayers();
  L.marker([ this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(this.myMarkerLayer);
  this.firebaseService.updateMyMarker(markerData);
  console.log('marker updated');

 }

 refreshMarkers(markersList?: MapPin[]): void {
  if(!this.map) {
    return;
  }

  this.markersLayer.clearLayers();

  if(!markersList) {
    return;
  }
  markersList.forEach(markerData => {
    console.log(markerData);

    console.log(markerData.id);
    console.log(this.firebaseService.myMarkerId);
    const isMyMarker = markerData.id === this.firebaseService.myMarkerId;

    L.marker([ markerData.lat, markerData.lang], isMyMarker ?  this.myMarkerIcon : this.markerIcon).bindPopup(markerData.label as string).addTo(isMyMarker ? this.myMarkerLayer : this.markersLayer);
  })
  console.log('SOMEBODY ADDED MARKER, REFRESHED WITH NEW MARKERS');
 }
}
