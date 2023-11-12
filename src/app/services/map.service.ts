import { Injectable, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapPin } from '../models/map-pin.interface';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from './firebase.service';
import { log } from 'console';
import { Subject, Subscriber, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnDestroy {

  myMarkerLat: number = 0;
  myMarkerLang: number = 0;
  map: any;
  markersLayer = L.layerGroup();
  myMarkerLayer = L.layerGroup();
  private myMarkerIcon = {
    icon: L.icon({
      iconSize: [24,36],
      iconAnchor: [12,36],
      iconUrl: 'marker-icon.png',
   })
  };
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


    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.myMarkerLat = e.latlng.lat;
      this.myMarkerLang = e.latlng.lng;
    })

    this.firebaseService.refreshMarkers.pipe(takeUntil(this.unsubscriber)).subscribe(res => {
      console.log('refresh');
      console.log(res);


    })
}

 addMyMarker(): void {
  if(this._addingMarkerLocked) {
    return;
  }
  L.marker([ this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(this.myMarkerLayer);
  this._addingMarkerLocked = true;
  const mapPin = {
    lat: this.myMarkerLat,
    lang: this.myMarkerLang
  }
  this.firebaseService.setData(mapPin);
  console.log('ADDED TO DATABASE AND REFRESHED FOR OTHERS');

 }

 updateMyMarker(markerData: MapPin): void {
  this.myMarkerLayer.clearLayers();
  L.marker([ this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(this.myMarkerLayer);
  this.firebaseService.updateMyMarker(markerData);
  console.log('marker updated');

 }

 refteshMarkers(markersList?: MapPin[]): void {
  if(!this.map) {
    return;
  }

  this.markersLayer.clearLayers();

  if(!markersList) {
    return;
  }
  markersList.forEach(markerData => {
    L.marker([ markerData.lat, markerData.lang], this.myMarkerIcon).addTo(this.markersLayer);
  })
  console.log('SOMEBODY ADDED MARKER, REFRESHED WITH NEW MARKERS');
 }
}
