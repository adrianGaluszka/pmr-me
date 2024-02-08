import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import * as L from 'leaflet';
import { MapPin, MarkerDetails } from '../models/map-pin.interface';
import { CustomMapPopupComponent } from '../components/map/additional-components/custom-map-popup/custom-map-popup.component';
import { WebsocketStateService } from './websocket-state.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  myMarkerLat: number = 0;
  myMarkerLang: number = 0;
  myMarkerId: string = '';
  map: any;
  markersLayer = L.layerGroup();
  myMarkerLayer = L.layerGroup();
  preMyMarkerLayer = L.layerGroup();

  private preMyMarkerIcon = {
    icon: L.icon({
      iconSize: [15, 15],
      iconAnchor: [7.5, 7.5],
      iconUrl: './assets/icons/circle-red.svg',
    }),
  };
  private myMarkerIcon = {
    icon: L.icon({
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      iconUrl: './assets/icons/walkie-talkie-solid-my.svg',
    }),
  };
  private markerIcon = {
    icon: L.icon({
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      iconUrl: './assets/icons/walkie-talkie-solid.svg',
    }),
  };
  private disconnectedMarcerIcon = {
    icon: L.icon({
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      iconUrl: './assets/icons/walkie-talkie-solid-gray.svg',
    }),
  };
  private _addingMarkerLocked: boolean = false;

  get addingMarkerLocked(): boolean {
    return this._addingMarkerLocked;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private websocketState: WebsocketStateService
  ) {}

  initMap() {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map = L.map('map', {
      center: [51.9189046, 19.1343786],
      zoom: 6,
    });

    this.websocketState.$mapPinsValueChanges.subscribe((res) =>
      this.refreshMarkers(res)
    );

    tiles.addTo(this.map);
    this.markersLayer.addTo(this.map);
    this.myMarkerLayer.addTo(this.map);
    this.preMyMarkerLayer.addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.myMarkerLat = e.latlng.lat;
      this.myMarkerLang = e.latlng.lng;

      this.preMyMarkerLayer.clearLayers();

      L.marker(
        [this.myMarkerLat, this.myMarkerLang],
        this.preMyMarkerIcon
      ).addTo(this.preMyMarkerLayer);
    });
  }

  addMyMarker(markerDetails: MapPin): void {
    if (this._addingMarkerLocked) {
      return;
    }
    this.preMyMarkerLayer.clearLayers();
    L.marker([this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(
      this.myMarkerLayer
    );
    this._addingMarkerLocked = true;
    this.myMarkerId = this.websocketState.websocketId;
    const mapPin = {
      id: this.myMarkerId, // IN FUTURE myMatkerId OR user.id
      ...markerDetails,
    };
    console.log(mapPin);

    this.websocketState.emitValue('setMapPin', mapPin);
  }

  updateMyMarker(markerData: MapPin): void {
    this.myMarkerLayer.clearLayers();
    this.preMyMarkerLayer.clearLayers();
    L.marker([this.myMarkerLat, this.myMarkerLang], this.myMarkerIcon).addTo(
      this.myMarkerLayer
    );
    const marker = {
      id: this.myMarkerId,
      ...markerData,
    };
    console.log(marker);
    this.websocketState.emitValue('updateMapPin', marker);
  }

  refreshMarkers(markersList?: MapPin[]): void {
    if (!this.map) {
      return;
    }

    this.markersLayer.clearLayers();

    if (!markersList) {
      return;
    }

    markersList.forEach((markerData) => {
      const isMyMarker = markerData.id === this.myMarkerId;
      L.marker(
        [markerData.lat, markerData.lang],
        markerData.disconnected
          ? this.disconnectedMarcerIcon
          : isMyMarker
          ? this.myMarkerIcon
          : this.markerIcon
      )
        .bindPopup(this.createCustomPopup(markerData))
        .addTo(isMyMarker ? this.myMarkerLayer : this.markersLayer);
    });
  }

  generateMarkerLabel(markerDetails: MarkerDetails): string {
    return `<b>Nazwa</b><p>${markerDetails?.name}</p><b>Czestotliwosc</b><p>${markerDetails?.freq}</p><b>Radio</b><p>${markerDetails?.radio}</p>`;
  }

  private createCustomPopup(mapPin: MapPin) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      CustomMapPopupComponent
    );
    const component = factory.create(this.injector);

    // //Set the component inputs manually
    component.instance.mapPin = mapPin;
    // component.instance.someinput2 = "example";

    // //Subscribe to the components outputs manually (if any)
    // component.instance.someoutput.subscribe(() => console.log("output handler fired"));

    //Manually invoke change detection, automatic wont work, but this is Ok if the component doesn't change
    component.changeDetectorRef.detectChanges();

    return component.location.nativeElement;
  }
}
